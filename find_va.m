w3 = ELVISLogs("./Lab3/Q4/3 Wire Analysis.txt");

% Get signals
sigs = w3.signals;
n0 = length(sigs);

% Crop outliers
s1 = sigs(3:end, :, :);
[n, ~, ns] = size(s1);

% Find gradients and intercepts by linear regression
m = (n * dot(s1(:, 1, :), s1(:, 2, :)) - sum(s1(:, 1, :)) .* sum(s1(:, 2, :))) ./ (n * sum(s1(:, 1, :) .^2) - sum(s1(:, 1, :)).^2);
b  = (sum(s1(:, 2, :)) - m .* sum(s1(:, 1, :))) / n;

% Find V_A
v_a = mean(squeeze(-b./m));
v_max = max(sigs(:, 1, :), [], 'all');

% Plot lines
y_ends = m * v_max + b;
cols = get(gca, 'ColorOrder');
for i = 1:ns
    plot([v_a, v_max], [0, y_ends(1, 1, i)], '--', 'Color', cols(i, :));
    hold on;
end

w3.plot();
xlim([v_a v_max]);
subtitle(sprintf("V_A = %.1f (V)", v_a));


