import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useRef } from "react";
import "../css/index.css"
import Main from "../index.js"

const select = "btnSelected";
const unSelect = "btnUnSelect";

var btnsName = [select, unSelect];
var selectNum = 0;

var textRef;

var value = "";
var reset = 1;

const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const morse = ["01", "1000", "1010", "100", "0", "0010", "110", "0000", "00", "0111"] // A-J
const binar = ["00", "01", "10", "11"];
const numToChar = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "?"
]

function Text() {
  return (

    <div className="text">
      <div className="textPos">
        Title
      </div>
    </div>
  )
}

function Select() {
  return (
    <div className="select">
      <SelectButton num={0} name={"Encrypt"} />
      <div className="center"></div>
      <SelectButton num={1} name={"Decrypt"} />
    </div>
  )
}

function SelectButton(arg) {

  function OnClick() {
    if (arg.num == 0) {
      btnsName[0] = select;
      btnsName[1] = unSelect;
      selectNum = 0;
    } else {
      btnsName[0] = unSelect;
      btnsName[1] = select;
      selectNum = 1;
    }
    reset = 1;
    value = ""
    Main.Render();
  }


  return (
    <div className="selectItem">
      <button className={"btn " + btnsName[arg.num]} onClick={OnClick}>
        {arg.name}
      </button>
    </div>
  )
}

function Input(arg) {

  var r = 0;

  function Change(event) {
    if (selectNum == 0) {
      Encrypt(event);
    } else {
      Decrypt(event);
    }
  }

  function Encrypt(event) {
    var str = event.target.value;
    var ascii = "";
    var mors = "1";
    var binary = "";
    var toChar = "";
    for (let i = 0; i < str.length; i++) {
      ascii += str[i].charCodeAt(0) + '.';
    }
    for (let i = 0; i < ascii.length; i++) {
      if (ascii[i] != '.') {
        mors += morse[Number(ascii[i])] + "2";
      } else {
        mors += "3";
      }
    }
    for (let i = 0; i < mors.length; i++) {
      binary += binar[Number(mors[i])];
    }
    str = ""
    for (let i = binary.length - 1; i >= 0; i--) {
      str += binary[i];
      if (str.length == 6) {
        let x = parseInt(str, 2);
        toChar += numToChar[x];
        str = "";
      }
    }
    if (str.length > 0) {
      let x = parseInt(str, 2);
      toChar += numToChar[x];
      str = "";
    }
    value = toChar;
    if (event.target.value == "") {
      value = ""
    }
    Main.Render();
  }

  function Decrypt(event) {
    var toChar = event.target.value;
    var binar = "";
    for (var i = toChar.length - 1; i >= 0; i--) {

    }
  }

  function ReverseString(params) {
    var str = "";
    for (let i = params.length - 1; i >= 0; i--) {
      str += params[i];
    }
  }

  if (arg.reset == 1) {
    reset = 0;
    return (
      <div className="input">
        <textarea className="textArea" onChange={Change} ref={textRef} value="" placeholder={"enter your " + (selectNum == 0 ? "text" : "code")} />
      </div>
    )
  } else {
    return (
      <div className="input">
        <textarea className="textArea" onChange={Change} ref={textRef} placeholder={"enter your " + (selectNum == 0 ? "text" : "code")} />
      </div>
    )
  }

}

function Arrow() {
  return (
    <div >
      <img src={require("../images/arrow.png")} className="arrow" />
    </div>
  )
}

function Output() {
  return (
    <div className="output">
      <textarea className="textArea" disabled={true} value={value} />
    </div>
  )
}

function Copy() {

  function Click() {
    navigator.clipboard.writeText(value);
    alert("copied!");
  }

  return (
    <button className="copyBtn" onClick={Click}>
      Copy
    </button>
  )
}

function App() {
  textRef = useRef(null);
  return (
    <div className="mainPanel">
      <Text />
      <Select />
      <Input reset={reset} />
      <Arrow />
      <Output />
      <Copy />
    </div>
  );
}

export default App;
