C1 = 10e-6;
C2 = 470e-9;
fth_low = 1; %Hz
fth_high = 3;%Hz
% gain = 100;

% fth_low 2 pi C1 = 1/(R1)
R1 = 1/(fth_low * 2 * pi * C1);

R2 = 1/(fth_high * 2 * pi * C2);

R3 = 1000;%  R2/(gain - 1);
gain = 1 + R2/1000;

fprintf("R1 = %.fkOhm and R2 = %.fkOhm for a gain of %.f\n", R1/1000, R2/1000, gain);