export const Equations = [
{
  equation: "V = I R",
  name: "Ohms Law",
  notes: "Voltage across resistor",
},
{
  equation: "R_1 || R_2 = (\\frac{1}{R_1} + \\frac{1}{R_2})^{-1}",
  name: "Resistors in Paralell",
},
{
  equation: "i(t) = C\\frac{dv(t)}{dt}",
  name: "Current over a capacitor"
},
{
  equation: "i(\\omega) = j \\omega C v(\\omega)",
  name: "Current over time with regards to frequency"
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
  notes: "Small signal."
},
{
  equation: "p n = n_i^2",
  name: "",
  notes: "For both intrinsic and extrinsic semiconductor"
},
{
  equation: "n \\approx N_D",
  notes: "For n-type semiconductor"
},
{
  equation: "p \\approx N_A",
  notes: "For p-type semiconductor"
},
 {
   equation: "p + N_D = n + N_A",
   name: "Net Charge Neutrality"
 },
 {
   equation: "n_i^2 = B T^3 e^{-\\cfrac{E_g}{k T}}",
   unit: "cm^{-6}",
   name: "Intrinsic carrier density"
 },
 {
   equation: "n = \\cfrac{(N_D - N_A) + \\sqrt{(N_D - N_A)^2 + 4 n_i^2}}{2}",
   notes: "For n-type semiconductor",
   name: "Electron Density"
 },
 {
   equation: "p = \\cfrac{(N_A - N_D) + \\sqrt{(N_A - N_D)^2 + 4 n_i^2}}{2}",
   name: "Hole Density",
   notes: "For p-type semiconductor"
 },
 {
   equation: "v_n = - \\mu_n E",
   name: "Electron Drift Velocity",
   notes: "$\\mu_n$ = 1350\\cfrac{m^2}{Vs}",

 },
 {
   equation: "v_p = \\mu_p E",
   name: "Hole Drift Velocity",
   notes: "$\\mu_p = 500\\cfrac{m^2}{Vs}$",
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
   name: "Electron Drift Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "J_{n \\ diff} = q D_n \\cfrac{\\partial n}{\\partial x} \\mu_n E",
   name: "Electron Diffusion Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "J_{p \\ diff} = - q D_p \\cfrac{\\partial p}{\\partial x} \\mu_n E",
   name: "Hole Diffusion Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "J_T = q p \\mu_p E + q D_n \\cfrac{\\partial n}{\\partial x} \\mu_n E + q p \\mu_p E - q D_p \\cfrac{\\partial p}{\\partial x} \\mu_n E",
   name: "Hole Diffusion Current Density",
   unit: "A/cm^2",
 },
 {
   equation: "\\cfrac{D_n}{\\mu_n} = \\cfrac{k T}{q} = \\cfrac{D_p}{\\mu_p}",
   name: "Einstein Relation",
 },
]
