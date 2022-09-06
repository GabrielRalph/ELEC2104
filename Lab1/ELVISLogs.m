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
        
    end
    
    methods
        function obj = ELVISLogs(text)
           obj = obj.parseLogData(text);
           obj.plottitle = obj.type;
           obj.xintercepts = [];
           obj.plotrange = [0, 1];
           obj.plotlegend = ["CH0", "CH1"];
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
        
        function y = intercept(obj, xvalue)
            sigs = obj.signals;
            
            [~,i] = min(abs(sigs(:, 1, 1) - xvalue));
            if i > 1
                x = sigs(i, 1, :);
                y = sigs(i, 2, :);
                plot(x, y, "*");
                text(x, y, sprintf("(%.2f, %.2f)", x, y));
            end
        end
        
        function plot(obj)
            [~, ~, ns] = size(obj.signals);
     
            for i = 1:ns
                if strcmp(obj.logaxis, "x")
                    semilogx(obj.signals(:, 1, i), obj.signals(:, 2, i));
                elseif strcmp(obj.logaxis, "y")
                    semilogy(obj.signals(:, 1, i), obj.signals(:, 2, i));
                else
                    plot(obj.signals(:, 1, i), obj.signals(:, 2, i));
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
      
       
        function obj = parseLogData(obj, text)
            obj.invalid = false;
            
            iswf = regexp(text, 'waveform', 'once');
            isvc = regexp(text, 'Voltage[ \t]*\(\w+\)[ \t]*,[ \t]*Current[ \t]*\(\w+\)', 'once');
            
            if ~isempty(iswf)
               obj = obj.parseWaveformData(text);
            elseif ~isempty(isvc)
                obj = obj.parseVoltageCurrentData(text);
            else 
                obj.invalid = true;
            end
        end
        
        function obj = extractPlotInfo(obj, filename)
            desc = regexp(filename, '(?<name>[^\(/]+)\((?<pfuncs>[^\)]+)\).txt', 'names');
            if isempty(desc)
                desc = regexp(filename, '(?<name>[^\(/]+).txt', 'names');
            else 
                [pfuncs] = regexp(desc(1).pfuncs, '(?<cmd>[lgrxi])\[(?<params>[^\]]+)\]', 'names');
            
                for pi = 1:length(pfuncs)
                    cmd = pfuncs(pi).cmd;
                    params = pfuncs(pi).params;
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
            end 
            
            obj.plottitle = desc(1).name;
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
        
        function logs = open(filename)
            text = fileread(filename);
            logs = ELVISLogs(text);
            
            if ~logs.invalid
                logs = logs.extractPlotInfo(filename);
            end
        end
       
        
        function plotAllLogs(root)
            folders = dir(root);
            for i = 1:length(folders)
                 name = folders(i).name;
                if ~strcmp(name, ".") && ~strcmp(name, "..") && folders(i).isdir
                    ELVISLogs.plotAllLogs(append(root, name, "/"));
                elseif ~isempty(regexp(name, '.txt$', 'once'))
                    elvis = ELVISLogs.open(append(root, name));
                    if ~elvis.invalid
                        elvis.plot();
                        saveas(gca, append(root, elvis.plottitle), "svg");
                        close();
                    end
                end
            end
        end
    end
end

