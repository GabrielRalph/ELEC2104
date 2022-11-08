%% Question 1
r1 = 10e3;
r2 = 10e3;
c1 = 10e-9;
r3 = 5e3;
c2 = 1e-6;
c3 = 1e-6;
r4 = 10e3;
r5 = 5e3;

A1 = @(s) 1 + r2./((1 + r2 .* s .* c1) .* r1);
A2 = @(s) 1 + s .* c2 * r3 ./ (1 + r3 .* s .* c3);
A3 = @(s) 1 - r4/r5;

T = @(s) A1(s) .* A2(s) .* A3(s);


%% Question 2
Zf1 = @(s, r2, c2) 1 ./ (1/r2 + s .* c2);
Z1 = @(s, r1, c1) 1 ./ (1/r1 + s .* c1);

% T_1 = @(s, r1, r2, c1, c2) 1 - Zf1(s, r2, c2) ./ Z1(s, r1, c1);

plottransf(@(s) -10 * s ./ (s + 400));

%%
syms s r c l
eqn = s^2 + s/(r * c) + 1/(l * c) == 0;
S = solve(eqn);
S
%%
function plottransf(T) 
    s = linspace(1, 100000, 10000);
    y = T(1i * s);
    mag = abs(y);
    ang = angle(y);
    subplot(2, 1, 1);
    semilogx(s, 20 * log10(mag));
    subplot(2, 1, 2);
    ang(ang < 0) = ang(ang < 0) + 2 * pi;
    semilogx(s, ang);
end
