import {Equations} from "./equations.js"
import {SvgPlus} from "../SvgPlus/4.js"

let JAXFUNCS = {
  "\\cfrac": 0,
  "\\frac": 0,
  "\\sqrt": 0,
  "\\int": 0,
  "\\sum": 0,
  "\\Delta": 0,
  "\\approx": 0,
  "e": 0,
}

class Variables {
  constructor(){
    this.variables = {};
    this.equations = [];
  }

  addEquation(eq) {
    let variables = {};
    this.equations.push(eq);
    let eqi = this.equations.length - 1;

    let str = eq.equation;
    str = str.replaceAll(/\\?\w+_{[^}]+}/g, (a) => {
      variables[a] = eq;
      return "";
    });

    let m2 = str.matchAll(/\\?\w+(_[0-9a-zA-Z])?/g);
    for (let m of m2) {
      variables[m[0]] = eq;
    }

    for (let vname in variables) {
      if (!vname.match(/^\d/) && !(vname in JAXFUNCS)) {
        if (!(vname in this.variables)) {
          this.variables[vname] = [];
        }

        this.variables[vname].push(eqi);
      }
    }
  }

  getEquationSet(set) {
    let equations = [];
    for (let i = 0; i < this.equations.length; i++) {
      if (i in set) {
        equations.push(this.equations[i]);
      }
    }
    return equations;
  }
}

function getVariables(equations = Equations) {
  let variables = new Variables();
  for (let eq of equations) {
    variables.addEquation(eq);
  }
  console.log(variables);
  return variables;
}

function typeset(el) {
  if (MathJax) {
    MathJax.typeset([el]);
  }
}

class EquationHelp extends SvgPlus {
  constructor(el){
    super(el)
    this.variables = getVariables();
  }

  onconnect(){
    this.elist = new SvgPlus(this.querySelector(".equations"));
    this.vlist = new SvgPlus(this.querySelector(".variables"));
    this.vtitle = new SvgPlus(this.querySelector(".variables-title"));
    this.etitle = new SvgPlus(this.querySelector(".equations-title"));
    let search = new SvgPlus(this.querySelector("input"));
    search.oninput = () => {
      this.renderVList(search.value);
    }
    this.search = search;

    this.vtitle.onclick = () => {
      this.clearSelected();
    }
    this.render();
  }



  render(){
    this.renderVList();
  }

  clearSelected(){
    this.renderVList();
  }

  get selectedEquations() {
    let {variables, vlist} = this;

    let eqs = {};
    for (let v of vlist.children) {
      if (v.getAttribute("selected") != null) {
        let equations = variables.variables[v.getAttribute("name")];
        for (let eqi of equations) {
          eqs[eqi] = true;
        }
      }
    }

    let equations = variables.getEquationSet(eqs);
    if (equations.length == 0) equations = variables.equations;

    return equations;
  }

  renderVList(filter){
    if (!filter) {
      this.search.value = "";
    }

    let {variables, vlist} = this;

    vlist.innerHTML = "";
    for (let vari in variables.variables) {
      let filtered = vari.indexOf(filter) == -1
      if (!filter || !filtered) {
        let icon = vlist.createChild("div", {content: '$' + vari + '$', name: vari});
        icon.onclick = () => {
          icon.toggleAttribute("selected");
          this.updateEList();
        }
        if (filter && !filtered) {
          icon.toggleAttribute("selected");
        }
      }
    }

    typeset(vlist);
    this.updateEList();
  }

  updateEList() {
    let {selectedEquations, elist} = this;

    elist.innerHTML = "";
    for (let eq of selectedEquations) {
      let icon = elist.createChild("div");
      icon.createChild("P", {content: "$" + eq.equation + "$"});
    }

    typeset(elist);
  }

}

SvgPlus.defineHTMLElement(EquationHelp);
