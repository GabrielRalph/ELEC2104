function str = funit(value, qty, dp)
    if ~exist("dp", "var")
        dp = 2;
    end
    dp = sprintf("%%.%.0ff", dp);

    dir = 1 - 2 * (value < 0);
    num = abs(value);
    unum = 0;
    if num > 1e-20
        while (num > 100) 
            num = num / 1000;
            unum = unum + 1;
        end
        while (num < 0.1)
            num = num * 1000;
            unum = unum - 1;
        end
    end
    
    unitsa = ['k', 'M', 'G', 'T'];
    unitsb = ['m', 'u', 'n', 'p', 'f'];
    if (unum < 0)
        unum = unitsb(-unum);
    elseif (unum > 0) 
        unum = unitsa(unum);
    else
       unum = '';
    end
    
    str = sprintf("%s %c%s", num2str(num * dir, dp), unum, qty);
end