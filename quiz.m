classdef quiz
    properties (Constant)
        kB = 8.62e-5; % eV/K
        q = 1.602e-19;%
        mu_n = 1350; %  cm^2 / Vs
        mu_p = 500; %   cm^2 / Vs
        ni = 10^10; %   cm^-3
    end

    properties
        name;
    end
    
    methods
        function obj = quiz()
            % question 1
            R1 = 2.7e3;
            R2 = 2.3e3;
            R3 = 1e3;
            
            s1 = 2e-3; %    A
            s2 = 0.6e-3;%   A
            obj.name = "Q1";
            obj.q1(R1, R2, R3, s1, s2);

            % question 2
            B = 1.27e29; %  K^-3 * cm^-6
            Eg = 1.42; %    eV
            
            obj.name = "Q2 a)";
            obj.q2(B, Eg, 300);

            obj.name = "Q2 b)";
            obj.q2(B, Eg, 100);

            obj.name = "Q2 c)";
            obj.q2(B, Eg, 450);  

            %question 3
            obj.name = "Q3";
            maxV = 10^7; % cm / s
            ND = 10^17; % cm^-3
            obj.q3(maxV, ND);
        end



        function q1(obj, R1, R2, R3, s1, s2)
            A = [
            R2, R1, -R3;
            -1, 1,   0;
            -1, 0,  -1
            ];
            S = [0; s1; s2];
            I = A\S;

            fprintf("%s: i_0 = %.2f mA\n", obj.name, I(1)*1e3);
        end

        function q2(obj, B, Eg, T)
            ni = sqrt(B * T^3 * exp(-Eg / (obj.kB * T)));

            fprintf("%s: ni = %.2g cm^-3 for T = %.2f K\n", obj.name, ni, T);
        end

        function q3(obj, maxV, ND)

            %    cm/s     cm^2/Vs
            E = -maxV / obj.mu_n; % V/cm
            n = ND;
            p = obj.ni^2 / n;
            %          C     cm^-3  cm^2/Vs    cm^-3  cm^2/Vs    V/cm
            Jdrift = obj.q * ( n  * obj.mu_n +  p   * obj.mu_p) * E; % A / (cm^2)
            
            fprintf("%s: Jdrift = %s\n", obj.name, funit(abs(Jdrift), "A/cm^2", 0));
        end
    end
end

