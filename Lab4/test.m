logs0 = ELVISLogs("./Q2/Opto 0V.txt");
logs4 = ELVISLogs("./Q2/Opto 4V.txt");
logs6 = ELVISLogs("./Q2/Opto 6.7V.txt");


scomb = cat(3, logs0.signals, logs4.signals, logs6.signals);

logs0.signals = scomb;
logs0.plotlegend = ["V_{LED} = 0V", "V_{LED} = 3.9V", "V_{LED} = 6.7V"];

ymeans = squeeze(mean(scomb(10:end, 2, :)));
for i = 1:3, yline(ymeans(i)); end
hold on
logs0.plot()

title("IR Receiver Response");
