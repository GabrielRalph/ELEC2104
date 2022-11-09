clear;
clc;

logs = ELVISLogs.getAll("Project");
%% req 2 IR
% IR LED 1 - 3
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
    legend(["V_{sig}", "V_{out}"]);
    title(sprintf("IR LED Response %i", i));
end

%% req 2 RED
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
logs(3).plot();