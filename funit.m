function str = funit(value, qty, dp)
    if ~exist("dp", "var")
        dp = 2;
    end
    dp = sprintf("%%.%.0ff", dp);

    num = value;
    unum = 0;
    while (num > 1000) 
        num = num / 1000;
        unum = unum + 1;
    end
    while (num < 1)
        num = num * 1000;
        unum = unum - 1;
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
    
    str = sprintf("%s (%c%s)", num2str(num, dp), unum, qty);
end