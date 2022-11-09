clear;
clc;

logs = ELVISLogs.getAll("Project");
%% req 2 IR
clf;
idxs = [1, 2, 3];
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
%     title(sprintf("IR LED Response %i", i));
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


%% calculations of BPM and SpO2
clc;
ir = ELVISLogs("Project/ir.txt");
red = ELVISLogs("Project/red.txt");

ir_t = ir.signals(:, 1, 1);
ir_v = ir.signals(:, 2, 1);
red_t = red.signals(:, 1, 1);
red_v = red.signals(:, 2, 1);

ir_highs = [
    66.5,   1.67;
    687,    1.58;
    1311,   1.60;
];
ir_lows = [
   521.5,   1.08;
   1168,    1.14;
   1820.5,  1.11;
];
red_highs = [
    76.5,   1.99;
    762,    1.94;
    1487.5, 1.82;
];
red_lows = [
    594,    1.37;
    1306,   1.27;
    1996,   1.19;
];

I_IRH = mean(ir_highs(:, 2));
I_IRL = mean(ir_lows(:, 2));
I_RH = mean(red_highs(:, 2));
I_RL = mean(red_lows(:, 2));

R = log(I_RL/I_RH)/log(I_IRL/I_IRH);

SpO2 = 100 * (0.81 - 0.18 * R) / (0.63 + 0.11 * R);
fprintf("SpO2 = %.1f%%\n", SpO2);

times = [ir_lows(:, 1), ir_highs(:, 1), red_lows(:, 1), red_highs(:, 1)];
deltas = times(2:end, :) - times(1:end-1, :);

bpm = 60 * 1000 / mean(deltas, "all");
fprintf("Heart Rate = %.0fBPM\n", bpm);


%% IR sample plot
clf;
ir.plot();
title("Sample Response of IR Light");
hold on;
text(ir_lows(:, 1), ir_lows(:, 2), ir_lows(:, 1) + "ms, " + ir_lows(:, 2) + "V" ,"HorizontalAlignment","center","VerticalAlignment","top");
text(ir_highs(:, 1), ir_highs(:, 2), ir_highs(:, 1) + "ms, " + ir_highs(:, 2) + "V" ,"HorizontalAlignment","center","VerticalAlignment","bottom");
scatter(ir_highs(:, 1), ir_highs(:, 2), 10, "red", "filled");
scatter(ir_lows(:, 1), ir_lows(:, 2), 10, "red", "filled");


%% Red sample plot
clf;
red.plot();
title("Sample Response of Red Light");
hold on;
text(red_lows(:, 1), red_lows(:, 2), red_lows(:, 1) + "ms, " + red_lows(:, 2) + "V" ,"HorizontalAlignment","center","VerticalAlignment","top");
text(red_highs(:, 1), red_highs(:, 2), red_highs(:, 1) + "ms, " + red_highs(:, 2) + "V" ,"HorizontalAlignment","center","VerticalAlignment","bottom");
scatter(red_highs(:, 1), red_highs(:, 2), 10, "red", "filled");
scatter(red_lows(:, 1), red_lows(:, 2), 10, "red", "filled");


