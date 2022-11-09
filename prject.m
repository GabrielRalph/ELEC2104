clear;
clc;

logs = ELVISLogs.getAll("Project");
%% req 2 IR
clf;
idxs = [4, 5, 6];
for i = 1:3
    subplot(3, 1, i);

    
    vout = logs(idxs(i)).signals(:, :, 1);
    [maxv, tidx] = max(vout(:, 2));
    tmax = vout(tidx, 1);
    [minv, tidx] = min(vout(:, 2));
    tmin = vout(tidx, 1);

    logs(idxs(i)).plot();
    ELVISLogs.plotPoint(tmax, maxv, round(maxv, 2) + "V");
    ELVISLogs.plotPoint(tmin, minv, round(minv, 2) + "V");
    legend(["V_{in}", "V_{out}"]);
    title(sprintf("IR LED Response %i", i));
end

%% req 2 RED
clf;
idxs = [7, 8, 9];
for i = 1:3
    subplot(3, 1, i);

    
    vout = logs(idxs(i)).signals(:, :, 1);
    [maxv, tidx] = max(vout(:, 2));
    tmax = vout(tidx, 1);
    [minv, tidx] = min(vout(:, 2));
    tmin = vout(tidx, 1);

    logs(idxs(i)).plot();
    ELVISLogs.plotPoint(tmax, maxv, round(maxv, 2) + "V");
    ELVISLogs.plotPoint(tmin, minv, round(minv, 2) + "V");
    legend(["V_{sig}", "V_{out}"]);
    title(sprintf("Red LED Response %i", i));
end
%%
logs(2).plot();

%% Freq Resp
flow = 0.5;
fhigh = 3.5;
gainGoal = 100;

Vpp_in = 0.020; %V
%   freq(Hz),   vpp(V)
data = [
    0.25,   0.2;
    0.5,    1.25;
    0.75,   1.35;
    1,      1.4;
    1.25,   1.45;
    1.5,    1.45;
    1.75,   1.45
    2,      1.4;
    2.25,   1.35;
    2.5,    1.35;
    2.75,   1.3;
    3,      1.25;
    3.25,   1.2;
    3.5,    1.15;
    3.75,   1.1;
    4,      1;
    4.25,   1;
    4.5,    1;
    4.75,   0.95;
    5,      0.9;
    5.25,   0.875;
];
data(:, 2) = data(:, 2)/0.020;

plot(data(:, 1), data(:, 2));
xline(flow);
xline(fhigh);
yline(gainGoal);
text((flow + fhigh)/2, 30, "Selected Frequency Band", "HorizontalAlignment","center");
text((flow + fhigh)/2, gainGoal, "Gain Goal", "HorizontalAlignment","center", "VerticalAlignment","bottom");
ylim([0, 110]);
xlabel("Frequency (Hz)");
ylabel("Gain (Vpp_{in}/Vpp_{out})");
title("Frequency Gain Response");
%% square wave ir led
swir = logs(10);
swir.plot();
title("Square Wave IR LED Response");
subtitle("Input signal 5Vpp + 2.5V offset, 2Hz")




