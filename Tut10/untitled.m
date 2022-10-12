Vgs = [2, 3.3];
Vds = 3.3;
W_L = 20;
Vth = 0.7;
muCox = 250e-6;

gm1 = (muCox * W_L) * (Vgs - Vth);

%%
Vth = 0.4;
Vdd = 12;
r1 = 100e3;
beta = 200e-6 * 20;

a = (1/2) * beta * r1;
b = (1 - beta * r1 * Vth);
c = (1/2) * beta * r1 * Vth^2 - Vdd;

Vgs = ((-b) + sqrt(b.^2 - 4*a*c)) ./ (2*a)
% Vgs = Id * r1