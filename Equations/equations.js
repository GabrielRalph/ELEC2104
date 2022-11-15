export const Equations = [
{
  equation: "V = I R",
  name: "Ohms Law",
  description: "Voltage across resistor",
  image: "./assets/fig_v-ir.svg"
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
   name: "Intrinsic Carrier Density",
   image: "./assets/fig_intrinsic.svg",
   description: "Relationship of the intrinsic carrier density $n_i$ with temperature $T$ ($\\text{K}$ kelvin), semiconductor band gap energy $E_g$ ($\\text{eV}$ electron volts) and the material dependant paramater $B$. Where $B = 1.08 \\times 10^{31}\\text{K}^{-3}\\cdot \\text{cm}^{-6}$ for silicon and the Boltzmann's constant $k_B = 8.62 \\times 10^{-5} \\text{eV/K}$"
 },
 {
   equation: "n = \\cfrac{(N_D - N_A) + \\sqrt{(N_D - N_A)^2 + 4 n_i^2}}{2}",
   description: "For n-type semiconductor",
   image: "./assets/fig_n-type.svg",
   name: "Electron Density"
 },
 {
   equation: "p = \\cfrac{(N_A - N_D) + \\sqrt{(N_A - N_D)^2 + 4 n_i^2}}{2}",
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
 },
 {
   equation: "J_{p \\ drift} = q p \\mu_p E",
   name: "Hole Drift Current Density",
   unit: "A/cm^2",
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
   equation: "V_T = \\cfrac{k_B T}{q}",
   name: "Thermal Voltage",
 },
 {
   equation: "\\cfrac{D_n}{\\mu_n} = V_T = \\cfrac{D_p}{\\mu_p}",
   name: "Einstein Relation",
 },
 {
   equation: "E_i = \\cfrac{E_c + E_v} {2}",
   name: "Intrinsic Fermi Level",
   description: "For semiconductors without doping."
 },
 {
   equation: "V_{bi} = V_T \\ln \\cfrac{N_A N_D}{n_i^2}",
   name: "Built in Potential",
   image: "./assets/fig_pn.svg",
 },
 {
   equation: "w = \\sqrt{\\cfrac{2 \\epsilon_s}{q}(\\cfrac{1}{N_A} + \\cfrac{1}{N_D})(V_{bi} + V_R)}",
   name: "Depleion Region Width",
   description: "$V_R$ is external bias, $\\epsilon_s$ permittivity of semiconductor",
   image: "./assets/fig_pn.svg",

 }
]
