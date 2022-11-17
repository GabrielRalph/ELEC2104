export const Equations = [
{
  equation: "V = I R",
  name: "Ohms Law",
  description: "Voltage across resistor",
  image: "./assets/fig_v-ir.svg"
},
{
  equation: "R = \\cfrac{\\rho L}{A}",
  name: "Restivity",
  description: "Resistance given restivity $\\rho$, length of material $L$ and cross sectional area $A$.",
},
{
  equation: "E = \\cfrac{\\Delta V}{\\Delta d}",
  name: "Electric Field",
  description: "The electric from a change in voltage $\\Delta V$ across a distance $\\Delta d$",
},
{
  equation: "R_1 || R_2 = (\\frac{1}{R_1} + \\frac{1}{R_2})^{-1}",
  name: "Resistors in Parallel",
  description: "Total resistance of two resistors in parallel.",
  image: "./assets/fig_r-in-parallel.svg",
  unit: "Ohms"
},
{
  equation: "i(t) = C\\frac{dv(t)}{dt}",
  name: "Current over a capacitor",
  unit: "A",
  image: "./assets/fig_i-over-c.svg"
},
{
  equation: "i(\\omega) = j \\omega C v(\\omega)",
  name: "Current over a capacitor",
  description: "Current over a capacitor in the frequency domain, where voltage $v$ and current $i$ are functions of frequency $\\omega$. $j$ denotes the imaginary number $j = \\sqrt{-1}$.",
  image: "./assets/fig_i-over-c-fd.svg"
},
{
  equation: "G = \\cfrac{1}{R}",
  name: "Conductance"
},
{
  equation: "g_m = \\cfrac{\\Delta I_{out}}{\\Delta V_{in}}",
  name: "Transconductance"
},
{
  equation: "g_m = \\cfrac{i_{out}}{v_{in}}",
  name: "Transconductance",
  description: "Small signal."
},
{
  equation: "n_i^2 = p n",
  name: "Carrier Density Relationship",
  image: "./assets/fig_intrinsic.svg",
  description: "For both intrinsic and extrinsic semiconductor. Where $p$ is the hole density (in $\\text{holes/cm}^3$), $n$ the electron density (in $\\text{electrons/cm}^3$) and $n_i$ the intrinsic carrier density for a given material. For silicon $n_i \\approx 10^{10}$ can be used.",
},
{
  equation: "n \\approx N_D",
  image: "./assets/fig_n-type.svg",
  description: "<b>For n-type semiconductor</b> the electron density $n$ is approximately equal to the donor dopant concentration $N_D$ (in $\\text{atoms/cm}^3$)."
},
{
  equation: "p \\approx N_A",
  image: "./assets/fig_p-type.svg",
  description: "<b>For p-type semiconductor</b> the hole density $p$ is approximately equal to the acceptor dopant concentration $N_A$ (in $\\text{atoms/cm}^3$)."
},
 {
   equation: "p + N_D = n + N_A",
   name: "Net Charge Neutrality"
 },
 {
   equation: "n_i^2 = B T^3 e^{-\\cfrac{E_g}{k_B T}}",
   unit: "cm^{-6}",
   paste_text: "n_i = @(B, T, E_g) sqrt(B * T^3 * exp(E_g / (8.61738e-5 * T))); %\tcm^-3",
   name: "Intrinsic Carrier Density",
   image: "./assets/fig_intrinsic.svg",
   description: "Relationship of the intrinsic carrier density $n_i$ with temperature $T$ ($\\text{K}$ kelvin), semiconductor band gap energy $E_g$ ($\\text{eV}$ electron volts) and the material dependant paramater $B$. Where $B = 1.08 \\times 10^{31}\\text{K}^{-3}\\cdot \\text{cm}^{-6}$ for silicon and the Boltzmann's constant $k_B = 8.62 \\times 10^{-5} \\text{eV/K}$"
 },
 {
   equation: "n = \\cfrac{(N_D - N_A) + \\sqrt{(N_D - N_A)^2 + 4 n_i^2}}{2}",
   paste_text: "n = @(N_D, N_A, ni) (N_D - N_A + sqrt((N_D - NA)^2 + 4 * ni^2)) / 2; %\tcm^-3",
   description: "For n-type semiconductor",
   image: "./assets/fig_n-type.svg",
   name: "Electron Density"
 },
 {
   equation: "p = \\cfrac{(N_A - N_D) + \\sqrt{(N_A - N_D)^2 + 4 n_i^2}}{2}",
   paste_text: "p = @(N_A, N_D, ni) (N_A - N_D + sqrt((N_A - ND)^2 + 4 * ni^2)) / 2; %\tcm^-3",
   name: "Hole Density",
   image: "./assets/fig_p-type.svg",
   description: "For p-type semiconductor"
 },
 {
   equation: "v_n = - \\mu_n E",
   name: "Electron Drift Velocity",
   description: "The electron velocity $v_n$ (in $\\text{cm/s}$) in a semiconductor caused by an applied electric field $E$ where $\\mu_n$ is the electron mobility constant ($\\mu_n = 1350 \\text{ cm}^2/\\text{Vs}$ for silicon). Note the electrons will travel in the oppisite direction of the electron field as such the velocity will be negative with respect to the electric field.",
   image: "./assets/fig_v-n.svg"
 },
 {
   equation: "v_p = \\mu_p E",
   name: "Hole Drift Velocity",
   description: "The hole velocity $v_p$ (in $\\text{cm/s}$) in a semiconductor caused by an applied electric field $E$ where $\\mu_p$ is the hole mobility constant ($\\mu_p = 500 \\text{ cm}^2/\\text{Vs}$ for silicon)",
   image: "./assets/fig_v-p.svg"
 },
 {
   equation: "J = Q V",
   name: "Drift Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "J_{n \\ drift} = q n \\mu_n E",
   name: "Electron Drift Current Density",
   unit: "A/cm^2",
   image: "./assets/fig_v-n.svg"

 },
 {
   equation: "J_{p \\ drift} = q p \\mu_p E",
   name: "Hole Drift Current Density",
   unit: "A/cm^2",
   image: "./assets/fig_v-p.svg"

 },
 {
   equation: "J_{drift} = q (n \\mu_n + p \\mu_p) E",
   name: "Total Drift Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "J_{n \\ diff} = q D_n \\cfrac{\\partial n}{\\partial x}",
   name: "Electron Diffusion Current Density",
   description: "Current density caused by an electron density $n$ gradient $\\cfrac{\\partial n}{\\partial x}$ along the $x$ dimension of a semiconductor, where $D_n$ is the electron diffusivity constant.",
   image: "./assets/fig_diff-n.svg",
   unit: "A/cm^2",
 },
 {
   equation: "J_{p \\ diff} = - q D_p \\cfrac{\\partial p}{\\partial x}",
   name: "Hole Diffusion Current Density",
   description: "Current density caused by a holde density $p$ gradient $\\cfrac{\\partial p}{\\partial x}$ along the $x$ dimension of a semiconductor, where $D_p$ is the hole diffusivity constant.",
   image: "./assets/fig_diff-p.svg",
   unit: "A/cm^2",
 },
 {
   equation: "J_T = q (\\mu_n E n +  D_n \\cfrac{\\partial n}{\\partial x}) + q (\\mu_p E p - D_p \\cfrac{\\partial p}{\\partial x})",
   name: "Total Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "V_T = k_B T",
   description: "For room temperature $V_T \\approx 0.025\\text{eV}$",
   name: "Thermal Voltage",
 },
 {
   equation: "\\cfrac{D_n}{\\mu_n} = V_T = \\cfrac{D_p}{\\mu_p}",
   name: "Einstein Relation",
 },
 {
   equation: "E_i = \\cfrac{E_c + E_v} {2}",
   name: "Intrinsic Fermi Level",
   description: "The fermi level $E_f$ is the energy level where the probability of finding a (free) electron is one-half. For intrinsic semiconductors $E_f = E_i$. Note $E_g$ is the band gap energy $E_g \\approx 1.1\\text{eV}$ for silicon.",
   image: "./assets/fig_bg-intrinsic.svg",
 },
 {
   equation: "N_D \\approx n = n_i e^\\cfrac{E_f - E_i} {k_B T}",
   name: "Electron Density and Fermi Level Relationship",
   description: "For a semiconductors with n-type doping there will be more free electrons and hence the fermi level will be higher than that of the intrinsic fermi level.",
   image: "./assets/fig_bg-n-type.svg",
 },
 {
   equation: "N_A \\approx p = n_i e^\\cfrac{E_i - E_f} {k_B T}",
   name: "Hole Density and Fermi Level Relationship",
   description: "For a semiconductors with p-type doping there will be more holes and hence the fermi level will be lower than that of the intrinsic fermi level.",
   image: "./assets/fig_bg-p-type.svg",
 },
 {
   equation: "V_{bi} = V_T \\ln \\cfrac{N_A N_D}{n_i^2}",
   name: "Built in Potential",
   description: "As a result of the depletion region the PN junction will experience a voltage $V_{bi}$ across the junction.",
   image: "./assets/fig_Vbi.svg",
 },
 {
   equation: "w = \\sqrt{\\cfrac{2 \\epsilon_s}{q}(\\cfrac{1}{N_A} + \\cfrac{1}{N_D})(V_{bi} + V_R)}",
   name: "Depleion Region Width",
   description: "Width of the depletion region given an external bias voltage $V_R$, the permittivity of semiconductor $\\epsilon_s$ and the built in potential voltage $v_{bi}$. If no external bias is applied then $V_R = 0$ and $w = \\sqrt{\\cfrac{2 \\epsilon_s}{q}(\\cfrac{1}{N_A} + \\cfrac{1}{N_D})V_{bi}}$",
   image: "./assets/fig_w.svg",

 },
 {
   equation: "\\cfrac{x_p}{x_n} = \\cfrac{N_D}{N_A}",
   name: "Depleion Region Charge Neutrality",
   description: "For simplicity, assume the depletion region has no free carriers (the free carrier density is orders of magnitude smaller than original). Hence, the space charge region has a uniform charge density and must follow the charge neutrality condition.",
   image: "./assets/fig_pn.svg",
 },
 {
   equation: "\\epsilon_{\\max} = -\\cfrac{q N_A}{\\epsilon_s} x_p = -\\cfrac{q N_D}{\\epsilon_s} x_n = \\cfrac{2V_{bi}}{w}",
   name: "Depleion Region Charge Neutrality",
   description: "The maximum field strength $\\epsilon_{\\max}$ experienced in the depletion region at the pn junction. Where $\\epsilon_s$ is the permittivity of a semiconductor.",
   image: "./assets/fig_pn-field.svg",
 },
 {
   equation: "I_{D} = I_S (e^{\\cfrac{V_D}{V_T}} - 1)",
   name: "Diode I-V Characteristics",
   description: "The total current flowing through a PN junction given an applied forward bias voltage $V_F$. Where $I_S$ is the reverse saturation current.",
   image: "./assets/fig_ID.svg",
 },
 {
   equation: "I_S = A q n_i^2(\\cfrac{D_n}{N_A L_n} + \\cfrac{D_p}{N_D L_p})",
   name: "Reverse Saturation Current",
   description: "Where $L_{n, \ p}$ are the electron and hole diffusion lengths (average length travelled before they recombine with the majority carriers) and $A$ the cross sectional area.",
   image: "./assets/fig_Is.svg",
 },
 {
   name: "Load Line Equation",
   equation: "I_D = \\cfrac{V}{R} - \\cfrac{1}{R}V_D",
   image: "./assets/fig_diode-1.svg",
 },
 {
   name: "Ideal Diode Model",
   equation: " \\begin{array}{l} V_D = 0 \\quad \\text{for} \\quad I_D > 0 \\\\ I_D = 0 \\quad \\text{for} \\quad V_D < 0  \\end{array}",
   image: "./assets/fig_ideal.svg",
 },
 {
   name: "Constant Diode Model",
   equation: "I_D = 0 \\quad \\text{for} \\quad V_D < V_{D,on}",
   image: "./assets/fig_constant.svg",
 }
]

export const Constants = [
  {
    name: "Boltzmann Constant",
    symbol: "k_B",
    value: "8.61738e-5",
    unit: "\\text{ eV/K}"
  },
  {
    name: "Charge of Electron",
    symbol: "q",
    value: "1.60218e-19",
    unit: "\\text{ C}"
  },
  {
    name: "Electron Volt",
    symbol: "1eV",
    value: "1.60218e-19",
    unit: "\\text{ J}"
  },
  {
    name: "Permittivity in Vacuum",
    symbol: "\\epsilon_0",
    value: "8.85418e-14",
    unit: "\\text{F/cm}",
  },
  {
    name: "Planck constant",
    symbol: "h",
    value: "6.62607e-34",
    unit: "\\text{J}\\cdot \\text{s}",
  },
  {
    name: "Speed of Light",
    symbol: "c",
    value: "2.99792e8",
    unit: "\\text{m/s}",
  },
  {
    name: "Thermal Voltage at 300K",
    symbol: "V_T",
    value: "0.025852",
    unit: "\\text{eV}",
  },
  {
    // name: "Thermal Voltage at 300K",
    symbol: "N_C",
    value: "2.86e19",
    unit: "\\text{cm}^{-3}",
  },
  {
    // name: "Thermal Voltage at 300K",
    symbol: "N_V",
    value: "2.66e19",
    unit: "\\text{cm}^{-3}",
  },
  {
    name: "Permittivity of Silicon",
    symbol: "\\epsilon_s",
    value: "1.05364e-12",
    unit: "\\text{F/cm}",
  },
  {
    name: "Intrinsic Carrier Density",
    symbol: "n_i",
    value: "9.65e9",
    unit: "\\text{cm}^{-3}",
  },
  {
    name: "Electron Mobility",
    symbol: "\\mu_n",
    value: "1450",
    unit: "\\text{cm}^{2}/(\\text{V} \\cdot \\text{s})",
  },
  {
    name: "Hole Mobility",
    symbol: "\\mu_p",
    value: "505",
    unit: "\\text{cm}^{2}/(\\text{V} \\cdot \\text{s})",
  },
  {
    name: "Energy Gap",
    symbol: "E_g",
    value: "1.12",
    unit: "\\text{eV}",
  }
]
