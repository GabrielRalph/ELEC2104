%% Question 1
w2 = ELVISLogs("Q1/2 Wire Analysis.txt");
w2 = w2.addPlotCmds("x[0.331] l[y]");
w2.plot()
w2.save("svg");
%% Question 2
va = {
    ELVISLogs("Q2/Va = 4V.txt");
    ELVISLogs("Q2/Va = 5V.txt");
    ELVISLogs("Q2/Va = 8V.txt");
};
va0 = va{1};
for i = 2:3
    va0.signals = cat(3, va0.signals, va{i}.signals);
end
va0.plot()
legend(["V_A = 4V", "V_A = 5V", "V_A = 8V"]);

%% Question 3
names = ["Q3/LED test 5Hz.txt"; "Q3/LED test 10Hz.txt"; "Q3/LED test 1Hz.txt"];
n = 3;
for i = 1:3
    subplot(3, 1, i);
    V_DS = ELVISLogs(names(i));
    
    
    V_DS.plot();
    legend(["fgen", "V_{DS}"]);
    
    t = split(names(i), {'/', '.'});
    title(t(end - 1));
end
 
 %% Question 4
 Vdd = 5;
 beta = (1/2) * (1e-3);
 V_TO = 0.7;
 i_ref = 0.25e-3;
 V_GS = sqrt(i_ref/beta) + V_TO;
 R_ref = (Vdd - V_GS) / i_ref;
 fprintf("R_ref = %.2fkR\n", R_ref/1000);