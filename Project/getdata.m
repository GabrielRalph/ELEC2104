ir = ELVISLogs("ir.txt");
red = ELVISLogs("red.txt");

%%
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

tdelts = [ir_lows(:, 1) - ir_highs(:, 1); red_lows(:, 1) - red_highs(:, 1)];
bpm = 60 * 1000 / mean(tdelts);


 
subplot(2, 1, 1);
ir.plot();
subplot(2, 1, 2);
red.plot();