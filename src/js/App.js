import React, { useRef } from "react";
import "../css/index.css"
import Main from "../index.js"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
        Encrypt Your Text
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
      // while (str.length < 6) {
      //   str += "0"
      // }
      let x = parseInt(str, 2);
      toChar += numToChar[x] + "`" + str.length;
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
    var binary = "";
    var mors = "";
    var ascii = "";
    var str = "";

    toChar = event.target.value;
    var tmp = "";
    if (toChar[toChar.length - 2] != '`') {
      for (let i = 0; i < toChar.length; i++) {
        let x = GetIndex(toChar[i], numToChar).toString(2);
        while (x.length < 6) {
          x = "0" + x;
        }
        binary += x;
      }
    } else {
      for (let i = 0; i < toChar.length - 2; i++) {
        let x = GetIndex(toChar[i], numToChar).toString(2);
        while (x.length < 6 && i != toChar.length - 3) {
          x = "0" + x;
        }
        while (i == toChar.length - 3 && x.length < parseInt(toChar[toChar.length - 1], 10)) {
          x = '0' + x;
        }
        binary += x;
      }
    }
    var s = binary;
    binary = "";

    for (let i = s.length - 1; i >= 0; i--) {
      binary += s[i];
    }

    for (let i = 0; i < binary.length; i += 2) {
      tmp = binary[i] + binary[i + 1];
      mors += GetIndex(tmp, binar);
      tmp = "";
    }


    for (let i = 1; i < mors.length; i++) {
      if (mors[i] == '2') {
        ascii += GetIndex(tmp, morse);
        tmp = "";
      } else if (mors[i] == '3') {
        ascii += '.';
        tmp = "";
      } else {
        tmp += mors[i];
      }
    }

    for (let i = 0; i < ascii.length; i++) {
      if (ascii[i] != '.') {
        tmp += ascii[i];
      } else {
        str += String.fromCharCode(tmp);
        tmp = "";
      }
    }
    value = str;
    Main.Render();
  }
  function GetIndex(str, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == str) {
        return i;
      }
    }
    return -1;
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
    toast("Copied!");
  }
  const notify = () => toast("Wow so easy!");

  return (
    <button className="copyBtn" onClick={Click}>
      Copy
    </button>
  )
}

function Notif() {
  return (
    <div className="notification">

    </div>
  )
}

function App() {
  textRef = useRef(null);
  return (
    <div>
      <div className="mainPanel">
        <Text />
        <Select />
        <Input reset={reset} />
        <Arrow />
        <Output />
        <Copy />
      </div>
      <ToastContainer position="top-right" autoClose={500} hideProgressBar={true} />
    </div>

  );
}

export default App;


// 0101000000100001100010110100000010000110000001001011
// 0101000000100001100010110100000010000110000001001011