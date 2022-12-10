import { useState } from "react";
import Btn from "./Btn";
import "./App.css";

function App() {
  const [display, setDisplay] = useState([0]);
  const [nonNum, setNonNum] = useState(false);
  const [hasDot, setHasDot] = useState(false);
  const [gotResult, setGotResult] = useState(false);
  const [arith, setArith] = useState([]);

  function addToArr(clicked) {
    if (!gotResult) {
      display[0] !== 0
        ? setDisplay((prev) => [...prev, clicked])
        : setDisplay([clicked]);
      setArith((prev) => [...prev, clicked]);
      setNonNum(false);
      clicked === "." && setHasDot(true);
    } else {
      clearIt();
      setArith([clicked]);
      setDisplay([clicked]);
    }
  }

  function addDot() {
    if (!hasDot) {
      addToArr(".");
    }
  }

  function multIt() {
    if (arith.length > 0 && arith[arith.length - 1] !== ".") {
      if (!nonNum) {
        setArith((prev) => [...prev, "*"]);
        setDisplay((prev) => [...prev, "x"]);
        setNonNum(true);
        setHasDot(false);
        setGotResult(false);
      } else {
        setArith((prev) => [...prev.slice(0, -1), "*"]);
        setDisplay((prev) => [...prev.slice(0, -1), "x"]);
      }
    }
  }

  function divideIt() {
    if (arith.length > 0 && arith[arith.length - 1] !== ".") {
      if (!nonNum) {
        setArith((prev) => [...prev, "/"]);
        setDisplay((prev) => [...prev, <>&#247;</>]);
        setNonNum(true);
        setHasDot(false);
        setGotResult(false);
      } else {
        setArith((prev) => [...prev.slice(0, -1), "/"]);
        setDisplay((prev) => [...prev.slice(0, -1), <>&#247;</>]);
      }
    }
  }

  function addIt() {
    if (arith.length > 0 && arith[arith.length - 1] !== ".") {
      if (!nonNum) {
        setArith((prev) => [...prev, "+"]);
        setDisplay((prev) => [...prev, "+"]);
        setNonNum(true);
        setHasDot(false);
        setGotResult(false);
      } else {
        setArith((prev) => [...prev.slice(0, -1), "+"]);
        setDisplay((prev) => [...prev.slice(0, -1), "+"]);
      }
    }
  }

  function subIt() {
    if (arith.length > 0 && arith[arith.length - 1] !== ".") {
      if (!nonNum) {
        setArith((prev) => [...prev, "-"]);
        setDisplay((prev) => [...prev, "-"]);
        setNonNum(true);
        setHasDot(false);
        setGotResult(false);
      } else {
        setArith((prev) => [...prev.slice(0, -1), "-"]);
        setDisplay((prev) => [...prev.slice(0, -1), "-"]);
      }
    }
  }

  function fakeEval(arr) {
    let finalArr = [];
    let tempArr = [];
    arr.forEach((item, i) => {
      if (typeof item === "number" || item === ".") {
        tempArr.push(item);
        i === arr.length - 1 && finalArr.push(parseFloat(tempArr.join("")));
      } else {
        finalArr.push(parseFloat(tempArr.join("")));
        finalArr.push(item);
        tempArr = [];
      }
    });

    function work(arr, oper) {
      if (arr.includes(oper)) {
        let ind = arr.indexOf(oper);
        let first = parseFloat(arr[ind - 1]);
        let second = parseFloat(arr[ind + 1]);
        let temp;
        switch (oper) {
          case "*":
            temp = first * second;
            break;
          case "/":
            temp = first / second;
            break;
          case "+":
            temp = first + second;
            break;
          case "-":
            temp = first - second;
            break;
        }
        arr[ind + 1] = temp;
        arr.splice(ind - 1, 2);
        arr.includes(oper) && work(arr, oper);
      }
    }

    work(finalArr, "*");
    work(finalArr, "/");
    work(finalArr, "+");
    work(finalArr, "-");
    return finalArr;
  }

  function result() {
    if (!nonNum && arith[arith.length - 1] !== ".") {
      setDisplay(fakeEval(arith));
      setArith([parseFloat(fakeEval(arith))]);
      setGotResult(true);
      setNonNum(false);
    } else {
      alert("Invalid Entry");
      clearIt();
    }
  }

  function clearIt() {
    setDisplay([0]);
    setArith([]);
    setNonNum(false);
    setHasDot(false);
    setGotResult(false);
  }

  function clearEntry() {
    if (!gotResult) {
      setNonNum(
        typeof arith[arith.length - 2] !== "number" &&
          arith[arith.length - 2] !== "."
      );
      setArith((prev) => [...prev.slice(0, prev.length - 1)]);
      display[0] !== 0 &&
        setDisplay((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return (
    <>
      <h1>React Calculator</h1>
      <div id="container">
        <div id="screen">{<p>{display}</p>}</div>
        <div id="buttons">
          <Btn disp="AC" onClick={clearIt} />
          <Btn disp="CE" onClick={clearEntry} />
          <Btn disp="&#247;" onClick={divideIt} />
          <Btn disp="&#8722;" onClick={subIt} />
          <Btn disp="7" onClick={() => addToArr(7)} />
          <Btn disp="8" onClick={() => addToArr(8)} />
          <Btn disp="9" onClick={() => addToArr(9)} />
          <Btn disp="&#215;" onClick={multIt} />
          <Btn disp="4" onClick={() => addToArr(4)} />
          <Btn disp="5" onClick={() => addToArr(5)} />
          <Btn disp="6" onClick={() => addToArr(6)} />
          <Btn disp="+" onClick={addIt} />
          <Btn disp="1" onClick={() => addToArr(1)} />
          <Btn disp="2" onClick={() => addToArr(2)} />
          <Btn disp="3" onClick={() => addToArr(3)} />
          <Btn disp="0" onClick={() => addToArr(0)} />
          <div></div>
          <div></div>
          <Btn disp="." onClick={addDot} />
          <Btn disp="=" onClick={result} />
        </div>
      </div>
    </>
  );
}

export default App;
