classdef ELVISLogs
    %ELVISPLOTTER Summary of this class goes here
    %   Detailed explanation goes here
    
    properties
        signals
        xaxis
        yaxis
        
        type
        invalid
        
        plottitle
        plotlegend
        plotrange
        logaxis
        xintercepts
        filename
    end
    
    properties (Constant)
        SignalColors = get(gca, 'ColorOrder');
    end
    
    methods
        function obj = ELVISLogs(filename)
           obj.logaxis = 0;
           obj.signals = zeros(1, 2, 1);
           
           obj.xintercepts = [];
           obj.plotrange = [0, 1];
           obj.plotlegend = ["CH0", "CH1"];
           
           t = split(filename, {'/', '.tx'});
           obj.plottitle = t(end - 1);
           
           % Open file
           obj.filename = filename;
           text = fileread(filename);
           
           % Parse log data
           obj = obj.parseLogData(text);
        end
        
    
      %% Log file parsers
        function obj = parseLogData(obj, text)
            obj.invalid = false;
            
            iswf = regexp(text, 'waveform', 'once');
            isvc = regexp(text, 'Voltage[ \t]*\(\w+\)[ \t]*,[ \t]*Current[ \t]*\(\w+\)', 'once');
            isw3 = regexp(text, 'Base current[ \t]*\((?<Ib_unit>[^)]+)\)[ \t]*:[ \t]*(?<Ib>\d+\.?\d?)\s+Collector Voltage[ \t]*\((?<Vc_unit>\w+)\)[ \t]*,[ \t]*Collector Current[ \t]*\((?<Ic_unit>[^)]+)\)', 'once');
            isvt = regexp(text, 'Y_Unit_Label[ \t]+Measurement[ \t]*\((?<yunit>\w+)\)\s+X_Dimension[ \t]+Supply\+[ \t]*\((?<cunit>\w+)\)', 'once');
            
            if ~isempty(iswf)
               obj = obj.parseWaveformData(text);
            elseif ~isempty(isvc)
                obj = obj.parseVoltageCurrentData(text);
            elseif ~isempty(isw3)
                obj = obj.parse3WireData(text);
            elseif ~isempty(isvt)
                obj = obj.parseVoltageTransferData(text);
            else 
                obj.invalid = true;
            end
        end
        
        
        function obj = parseVoltageCurrentData(obj, text)
            vc_title_regex = 'Voltage[ \t]*\((?<vunit>\w+)\)[ \t]*,[ \t]*Current[ \t]*\((?<cunit>\w+)\)';
            vc_data_regex = '\n(?<volts>-?\d+\.\d+)[ \t]+(?<current>-?\d+\.\d+)';
            
            tinfo = regexp(text, vc_title_regex, 'names');
            tdata = regexp(text, vc_data_regex, 'names');
            
            n = length(tdata);
            data = zeros(length(tdata), 2);
            for i = 1:n
                data(i, :) = [str2double(tdata(i).volts), str2double(tdata(i).current)];
            end
            
            obj.signals = data;
            obj.xaxis = sprintf("Voltage (%s)", tinfo.vunit);
            obj.yaxis = sprintf("Current (%s)", tinfo.cunit);
            obj.type = "voltage/current";
        end
        
        function obj = parse3WireData(obj, text)
            w3_title_regex = 'Base current[ \t]*\((?<Ib_unit>[^)]+)\)[ \t]*:[ \t]*(?<Ib>\d+\.?\d?)\s+Collector Voltage[ \t]*\((?<Vc_unit>\w+)\)[ \t]*,[ \t]*Collector Current[ \t]*\((?<Ic_unit>[^)]+)\)';
            vc_data_regex = '\n(?<Vc>-?\d+\.\d+)[ \t]+(?<Ic>-?\d+\.\d+)';
            
            tinfo = regexp(text, w3_title_regex, 'names');
            if ~isempty(tinfo)
                series = regexp(text, w3_title_regex, 'split');
                series = series(2:end);
                
                s1 = regexp(series{1}, vc_data_regex, 'names');
                n = length(s1);
                sn = length(series);
                
                data = zeros(n, 2, sn);
                for i = 1:sn
                    si = regexp(series{i}, vc_data_regex, 'names');
                    for j = 1:n
                       data(j, :, i) = [str2double(si(j).Vc), str2double(si(j).Ic)];
                    end
                end
                           
                obj.signals = data;
                obj.xaxis = sprintf("Collector Voltage (%s)", tinfo(1).Vc_unit);
                obj.yaxis = sprintf("Collector Current (%s)", tinfo(1).Ic_unit);
                
                cinfo = squeeze(struct2cell(tinfo));
                legend = cellfun(@(unit,value) (sprintf("I_B = %s (%s)", value, unit)),cinfo(1,:)',cinfo(2,:)','UniformOutput',false);
                obj.plotlegend = legend;
            end
                
            
            obj.type = "3wire";
        end
        
        function obj = parseVoltageTransferData(obj, text) 
            vt_title_regex = 'Y_Unit_Label[ \t]+Measurement[ \t]*\((?<yunit>\w+)\)\s+X_Dimension[ \t]+Supply\+[ \t]*\((?<xunit>\w+)\)';
            vt_data_regex = '\n(?<volts>-?\d+\.\d+)[ \t]+(?<current>-?\d+\.\d+E?-?\d+)';
            tinfo = regexp(text, vt_title_regex, 'names');
            
            tdata = regexp(text, vt_data_regex, 'names');
            
            n = length(tdata);
            data = zeros(length(tdata), 2);
            for i = 1:n
                data(i, :) = [str2double(tdata(i).volts), str2double(tdata(i).current)];
            end
            
            obj.signals = data;
            obj.xaxis = sprintf("Voltage (%s)", tinfo.xunit);
            obj.yaxis = sprintf("Voltage (%s)", tinfo.yunit);
        end
        
        function obj = parseWaveformData(obj, text)
            wf_lines_regex = '\n([ \t]*\d+/\d+/\d+\s+\d+:\d+:\d+\.\d+\s-?\d+\.\d+E[-+]\d+)+';
            wf_signals_regex = '[ \t]*(?<time>\d+/\d+/\d+\s+\d+:\d+:\d+)(?<millis>\.\d+)\s(?<value>-?\d+\.\d+E[-+]\d+)';

            lines = regexp(text, wf_lines_regex, 'match');
            n = length(lines);

            sigs0 = regexp(lines{1}, wf_signals_regex, 'names');
            nsigs = length(sigs0);
            dpoint0 = ELVISLogs.getTimeDataPointMS(sigs0(1), 0);
            t0 = dpoint0(1);
            data = zeros(n, 2, nsigs);
            for i = 1:n
                sigs = regexp(lines{i}, wf_signals_regex, 'names');
                for s = 1:nsigs
                    data(i, :, s) = ELVISLogs.getTimeDataPointMS(sigs(s), t0);
                end
            end
            
            dt = data(end, 1, 1) - data(1, 1, 1);
            
            tinc = "ms";
            if dt < 1 
                tinc = "\mu s";
                data(:, 1, :) = data(:, 1, :) * 1000;
            end
            obj.signals = data;
            obj.xaxis = sprintf("time (%s)", tinc);
            obj.yaxis = "voltage (V)";
            obj.type = "waveform";
        end
        
        
       %% Plot methods
        function obj = addPlotCmds(obj, text)
            [plotCmds] = regexp(text, '(?<cmd>[lgrxi])\[(?<params>[^\]]+)\]', 'names');
            
            for pi = 1:length(plotCmds)
                cmd = plotCmds(pi).cmd;
                params = plotCmds(pi).params;
                switch (cmd)
                    case "g"
                        obj.plotlegend = regexp(params, '[, \t]+', 'split');
                    case "l"
                        obj.logaxis = params;
                    case "r"
                        range = str2double(regexp(params, '[, \t]+', 'split'));
                        if range(1) < 0, range(1) = 0;end
                        if range(2) > 1, range(2) = 1;end
                        if range(1) > range(2), range(1) = range(2);end
                        obj.plotrange = range;
                    case "x"
                        obj.xintercepts = str2double(regexp(params, '[, \t]+', 'split'));
                end
            end
            
%             obj.plottitle = desc(1).name;
        end
        
        function range = getRange(obj)
            sigs = obj.signals;
            [n, ~, ~] = size(sigs);
            r = obj.plotrange;
            r = round((n - 1) * r ) + 1;
            t0 = sigs(r(1), 1, 1);
            t1 = sigs(r(2), 1, 1);
            range = [t0, t1];
        end
        
        
%         function x = interceptx(obj, yvalue)
%             sigs = obj.signals;
%             x = 
%             
%         end
        
        function y = intercept(obj, value, isy)
            sigs = obj.signals;
            if exist("isy", "var")
                [uy, xi] = unique(sigs(:, 2, :));
                x = interp1(uy, sigs(xi, 1, :), value);
                for i = 1:length(x)
                    if ~isnan(x(i))
                        plot(x(i), value(i), "*");
                        text(x(i), value(i), sprintf("(%.3g, %.3g)", x(i), value));
                    end
                end 
            else
                y = interp1(sigs(:, 1, :), sigs(:, 2, :), value);
                for i = 1:length(y)
                    if ~isnan(y(i))
                        plot(value, y(i), "*");
                        text(value, y(i), sprintf("(%.3g, %.3g)", value, y(i)));
                    end
                end 
            end
            
        end
        
        function plot(obj)
            [~, ~, ns] = size(obj.signals);
     
            colors = get(gca, 'ColorOrder');
            for i = 1:ns
                switch obj.logaxis
                    case 'x'
                        semilogx(obj.signals(:, 1, i), obj.signals(:, 2, i), 'Color', colors(i, :));
                    case 'y'
                        semilogy(obj.signals(:, 1, i), obj.signals(:, 2, i), 'Color', colors(i, :));
                    otherwise
                        plot(obj.signals(:, 1, i), obj.signals(:, 2, i), 'Color', colors(i, :));
                end
                hold on
            end
            xlim(obj.getRange());
            xlabel(obj.xaxis);
            ylabel(obj.yaxis);
            title(obj.plottitle);
            
            n = length(obj.xintercepts);
            if n > 0
                for i = 1:n
                    obj.intercept(obj.xintercepts(i));
                end
            end
            
            if ns > 1
                legend(obj.plotlegend);
            end
        end
        
        function save(obj, type)
            fname = regexprep(obj.filename, "[.]txt", "");

            saveas(gca, fname, type);
        end
    end
        
    methods (Static)
        function dpoint = getTimeDataPointMS(sig, time0)
            time = datenum(sig.time, "dd/mm/yyyy HH:MM:SS");
            millis = str2double(sig.millis) * 1000;
            time = time * 24 * 60 * 60 * 1000 + millis;
            value = str2double(sig.value);
            dpoint = [time - time0, value];
        end
        
        function all_logs = getAll(root)
            all_logs = [];
            folders = dir(root)
            
            for i = 1:length(folders)
                 name = folders(i).name;
                if ~strcmp(name, ".") && ~strcmp(name, "..") && folders(i).isdir
                    logs = ELVISLogs.getAll(append(root, name, "/"));
                    all_logs = cat(1, all_logs, logs);
                elseif ~isempty(regexp(name, '.txt$', 'once'))
                    logs = ELVISLogs(root + "/" + name);
                    if ~logs.invalid
                        all_logs = cat(1, all_logs, logs);
                    end
                end
            end
        end
    end
end