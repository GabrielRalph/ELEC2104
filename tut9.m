clc;
clear;

beta_f = [40, 120, 250, 100000];

I_B = (8.3) ./ (11.5 + 1.5 * beta_f); %mA
I_1 = I_B .* (1 + beta_f);
I_C = I_1 - I_B;
V_CE = 0.7 + I_B * 10;

arrayfun(@(b_f, i_c, v_ce) fprintf("for beta_f = %.0f, I_C = %.2fmA, V_CE = %.2fV\n", b_f, i_c, v_ce), beta_f, I_C, V_CE);

