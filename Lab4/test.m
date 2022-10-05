clc; clear;
%% Question 1
% yceps = [14, 
logs = ELVISLogs.getAll("Lab4/Q1");

l0 = logs(3);
 l0.plot();
% l0.intercept(14, true)
 l0.save("svg");

%% Question 2
logs = ELVISLogs.getAll("Lab4/Q2");
l0 = logs(1);
l0.signals = cat(3, logs.signals);
l0.plot()
legend([logs.plottitle]);
title("Current vs Voltage");
l0.save("svg");



%% Question 3
logs = ELVISLogs.getAll("Lab4/Q3");
for i = 1:length(logs)
    logs(i).plot();
%     axis([1,1]);
    logs(i).save("svg");
    clf;
end