import {Equations, Constants} from "./equations.js"
import {SvgPlus} from "../SvgPlus/4.js"
const pasteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height = "1.2em" viewBox="0 0 42.41 57.08"><defs><style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.83px;}.cls-2{fill:none;}</style></defs><rect class="cls-2" x="6.23" y="20.9" width="40.73" height="28.8" rx="5.11" ry="5.11" transform="translate(-8.7 61.89) rotate(-90)"/><path class="cls-2" d="M12.19,47.25H7.17c-3.18,0-5.76-2.58-5.76-5.76V7.17C1.42,3.99,3.99,1.42,7.17,1.42H28.07c3.18,0,5.76,2.58,5.76,5.76v7.76"/><path class="cls-1" d="M28.2,1.42V5.73c0,2.07-1.68,3.76-3.76,3.76H10.8c-2.07,0-3.76-1.68-3.76-3.76V1.42H28.2Z"/><line class="cls-2" x1="17.62" y1="19.95" x2="35.67" y2="19.95"/><line class="cls-2" x1="17.62" y1="24.33" x2="35.67" y2="24.33"/><line class="cls-2" x1="17.62" y1="28.72" x2="35.67" y2="28.72"/></svg>`
let JAXFUNCS = {
  "\\cfrac": 0,
  "\\frac": 0,
  "\\sqrt": 0,
  "\\int": 0,
  "\\sum": 0,
  "\\Delta": 0,
  "\\approx": 0,
  "\\partial": 0,
  "\\ln": 0,
  "\\begin": 0,
  "\\end": 0,
  "\\text": 0,
  "e": 0,
  "x": 0,
  "$": true,
  "$$": true,
  "for": true,
  "array": true,
  "\\": true,
  "\\quad": true
}
let IGNORED_WORDS = {
  "the": true,
  "because": true,
  "caused": true,
  "then": true,
  "there": true,
  "that": true,
  "and": true,
  "equal": true,
}

class Equation {
  constructor(json){
    this.keywords = {};
    for (let key in json) this[key] = json[key];
  }

  addKeyword(word) {
    let {keywords} = this;
    word = word.toLowerCase();
    if (!(word in IGNORED_WORDS)) {
      keywords[word] = true;
    }
  }

  addPhraseKeywords(parse) {
    parse = parse.replace(/<[^>]+>/g, "");
    parse = parse.replace(/\$[^$]+\$/g, "")
    parse = parse.replace(/[{}()]/g, "");
    let words = parse.split(/\s*,?\s+/);
    for (let word of words) {
      if (word.length > 2) {
        this.addKeyword(word);
        while (word.length > 3) {
          word = word.slice(0, word.length - 1);
          this.addKeyword(word);
        }
      }
    }
  }
  addVariableKeyword(variable){
    let lower = variable.toLowerCase();
    lower = lower.replace("\\", "");
    let simple = lower.replace(/[_{}]/g, "");
    if (simple != lower) {
      this.addKeyword(simple);
    }
    this.addKeyword(lower);
  }

  set description(value) {
    this._description = value;
    this.addPhraseKeywords(value);
  }

  set name(value){
    this._name = value;
    this.addPhraseKeywords(value);
  }

  get name(){
    return this._name;
  }

  get description(){return this._description;}

  set equation(value){
    let {keywords} = this;
    let variables = {};
    if (typeof value === "string") {
      let str = value.replaceAll(/\\?\w+_{[^}]+}/g, (a) => {
        variables[a] = true;
        return " ";
      });

      let m2 = str.matchAll(/\\?\w*(_[0-9a-zA-Z])?/g);
      for (let m of m2) {
        variables[m[0]] = true;
      }

      for (let variable in variables) {
        if (variable == "" || variable.match(/^\d+$/) || variable in JAXFUNCS){
          delete variables[variable];
        } else {
          this.addVariableKeyword(variable);
        }
      }
    }
    this._variables = variables;
    this._equation = value;
  }

  get equation() {return this._equation; }

  get variables() {return this._variables; }
}

class Variables {
  constructor(){
    this.eqs_by_var = {};
    this.equations = [];
  }

  get variables(){
    return [...Object.keys(this.eqs_by_var)];
  }

  addEquation(eq) {
    try {
      let equation = new Equation(eq);
      let {eqs_by_var, equations} = this;
      for (let vname in equation.variables) {
        if (!(vname in eqs_by_var)) {
          eqs_by_var[vname] = [];
        }
        eqs_by_var[vname].push(equation);
      }
      equations.push(equation);
    } catch (e) {
      console.log(e);
      console.log('failed to add equation');
    }
  }

  getEquations(variables) {
    let equations = [];
    let i = 0;
    for (let equation of this.equations) {
      for (let variable of variables) {
        if (variable in equation.variables){
          equations.push(equation);
          break;
        }
      }
    }
    return equations;
  }

  searchEquations(search_phrase, equations = this.equations) {
    let seqs = [];
    if (search_phrase) {
      let search_words = search_phrase.toLowerCase().split(/\s*,?\s+/g);
      let eqmatch = {};
      for (let {keywords, equation} of equations) {
        eqmatch[equation] = 0;
        for (let word of search_words) {
          if (word in keywords) {
              eqmatch[equation] += 1;
          }
        }
      }
      equations.sort((a, b) => eqmatch[a.equation] < eqmatch[b.equation] ? 1 : -1);
      for (let eq of equations) {
        if (eqmatch[eq.equation] > 0) {
          seqs.push(eq);
        }
      }
    }
    return seqs;
  }

  getVariables(equations = this.equations) {
    let allvariables = {};
    for (let {variables} of equations) {
      for (let vari in variables) {
        allvariables[vari] = true;
      }
    }

    return Object.keys(allvariables);
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
  if (MathJax && MathJax.typeset instanceof Function) {
    MathJax.typeset([el]);
  }
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";


  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let success = false;
  try {
    success = document.execCommand('copy');
    var msg = success ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
  return success;
}
async function copyTextToClipboard(text) {
  let success = false;
  if (!navigator.clipboard) {
    success = fallbackCopyTextToClipboard(text);
  } else {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch(e) {
      console.log('copy failed');
    }
  }

  return success
}


class EquationHelp extends SvgPlus {
  constructor(el){
    super(el)
    this.eq_dictionary = getVariables();
  }


  onconnect(){
    this.style.position = "relative";
    this.tbox = this.createChild("div", {class: "tools"});
    this.tbox.createChild("span", {content: "Search"});
    this.search = this.tbox.createChild("input");
    this.results = this.tbox.createChild("span", {style: {
      "font-size": "0.6em",
      "line-height": "1em",
      "text-align": "center",
      "white-space": "nowrap",
    }});
    this.etitle = this.createChild("div", {class: "equations-title", content: "Equations"});
    this.vtitle = this.createChild("div", {class: "variables-title", content: "Variables"});
    this.ctitle = this.createChild("div", {class: "constants-title", content: "Constants"});
    this.elist = this.createChild("div", {class: "equations list"});
    this.vlist = this.createChild("div", {class: "variables list"});
    this.clist = this.createChild("div", {class: "constants list"});
    this.info = this.createChild("div", {class: "info", hidden: true});
    this.pasted = this.createChild("div", {class: "pasted"});
    this.pasted.innerHTML += pasteIcon;
    this.pasttext = this.pasted.createChild("pre");
    let {search} = this;
    search.oninput = () => {
      this.search_phrase = search.value;
      this.render_variable_list();
    }

    this.vtitle.onclick = () => {
      this.render_variable_list();
    }
    this.render_variable_list();
    this.render_constants_list();
  }


  get filtered_variables(){
    let {eq_dictionary, search_phrase} = this;

    let equations = eq_dictionary.searchEquations(search_phrase);
    if (equations.length < 1) equations = eq_dictionary.equations;

    let variables = eq_dictionary.getVariables(equations);

    return variables;
  }

  get filtered_equations(){
    let {get_selected_variables, eq_dictionary, search_phrase} = this;
    let variables = null;
    if (get_selected_variables instanceof Function)
      variables = this.get_selected_variables();
    let equations = eq_dictionary.getEquations(variables);

    let seqs = eq_dictionary.searchEquations(search_phrase, equations);
    if (seqs.length > 0) equations = seqs;
    let n = seqs.length
    if (n > 0) {
      equations = seqs;
      this.results.innerHTML = `${n} Results`
    } else {
      if (search_phrase) {
        this.results.innerHTML = "No Results"
      } else {
        this.results.innerHTML = "";
      }
    }
    return equations;
  }


  render_variable_list(){
    let {vlist, filtered_variables} = this;
    vlist.innerHTML = "";

    let selected_variables = {};
    for (let variable of filtered_variables) {
      selected_variables[variable] = false;
      let box = vlist.createChild("div");
      let icon = box.createChild("div", {
        content: '$' + variable + '$',
        name: variable
      });
      box.onclick = () => {
        let selected = !selected_variables[variable];
        icon.toggleAttribute("selected", selected);
        selected_variables[variable] = selected;

        this.render_equation_list();
      }
    }

    this.get_selected_variables = () => {
      let variables = [];
      let selection = false;
      for (let variable of filtered_variables) {
        selection = selection || selected_variables[variable];
      }

      if (selection) {
        for (let variable of filtered_variables) {
          if (selected_variables[variable]) {
            variables.push(variable);
          }
        }
      } else {
        variables = [...filtered_variables];
      }

      return variables;
    }

    typeset(vlist);
    this.render_equation_list();
  }

  render_equation_list(){
    let {elist, filtered_equations, shown_info} = this;
    elist.innerHTML = "";

    let cont_select = false;
    for (let eq of filtered_equations) {
      let box = elist.createChild("div");
      let icon = box.createChild("div", {
        content: "$" + eq.equation + "$"
      });
      if (shown_info && this.shown_info.equation.equation == eq.equation) {
        cont_select = true;
        this.shown_info = icon;
        icon.toggleAttribute("selected", true);
      }
      icon.equation = eq;
      box.onclick = () => {
        if (eq.paste_text) {
          this.paste_text(eq.paste_text);
        }
        this.render_info(icon);
      }
    }
    typeset(elist);
    if (!cont_select) this.render_info(null);
  }

  render_constants_list() {
    let {clist} = this;
    clist.innerHTML = "";
    for (let constant of Constants) {
      let icon = clist.createChild("div");
      let {value, unit, symbol} = constant;

      let unitstr = unit.replace(/(?:\\text)?{([^}]+)}/g,"$1");
      unitstr = unitstr.replace(/\s?\\cdot\s?/g, "·")
      let str = (value + "").replace(/[eE](-?\d+)/g, "\\times 10^{$1}");

      let sym = icon.createChild("div", {content: `$${symbol} = ${str} \\text{ } ${unit}$`});
      icon.onclick = async () => {
        this.paste_text(`${value}; %\t${unitstr}`)
      }
    }
    typeset(clist)
  }

  clearSelected(){
    this.render_variable_list();
  }

  async paste_text(text){
    if (await copyTextToClipboard(text)) {
      this.pasttext.innerHTML = text;
      await this.waveTransition((a) => {
        this.pasted.style.opacity = a;
      }, 250, true);
      await this.waveTransition((a) => {
        this.pasted.style.opacity = a;
      }, 2000, false);
    }
  }


  render_info(icon) {
    let {info, shown_info} = this;
    info.innerHTML = "";

    let eq = null;
    if (icon) {
      eq = icon.equation;
    }
    if (shown_info) {
      shown_info.toggleAttribute("selected", false);
    }
    this.shown_info = icon;

    if (icon) {
      icon.toggleAttribute("selected", true);
    }
    info.toggleAttribute("hidden", false);
    if (eq != null) {
      let template = "";
      let {description, name, image, equation} = eq;
      if (!description) description = "";
      if (!name) name = `$${equation}$`;
      else description = `<div style = "font-size: 1.5em; margin: 0.4em 0;">$${equation}$</div>` + description;
      if (image) {
        template = `
        <div style = "font-size: 2.5em; text-align: center;">${name}</div>
        <div style = "display: flex; gap: 1em;">
          <div>
            <img src = "${image}" style = "height: 17em; max-width: 100%;"/>
          </div>
          <div style = "width: 50%;"">
            ${description}
          </div>
       </div>`
      } else {
        template = `<div style = "font-size: 2.5em;">${name}</div>
        <p> ${description} </p>`;
      }
      info.innerHTML = template;
      typeset(info);
    } else {
      info.toggleAttribute("hidden", true);
    }
  }
}

SvgPlus.defineHTMLElement(EquationHelp);
