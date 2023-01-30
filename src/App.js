import React, { useState } from "react";
import heart from "./1.jpg";

function App() {

const [areaText, setAreaText] = useState('')
const [count, setCount] = useState(50);
const [problem, setProblem] = useState(true);  
const [intervalID, setIntervalID] = useState(0);
const [result, setResult] = useState('');
const [copyStop, setCopyStop] = useState(false);
const [bgc, setBgc] = useState({
  background: 'white'
})
const posi = [<span className="heartSpan" key="0"><img src={heart} alt="none" /></span>,
<span className="heartSpan" key="1"><img src={heart} alt="none" /></span>, 
  <span className="heartSpan" key="2"><img src={heart} alt="none" /></span>];
const [life, setLife] = useState(posi);
const [buttonAllow, setButtonAllow] = useState(false)



let str = 'У 1908 році було прокладено першу залізницю, що поєднала Володимир-Волинський із Ковелем на півночі і далі з Києвом, діяли поштово-телеграфна контора, вісім готелів, два кінотеатри, чотири фабрично-заводські підприємства.'


const lifeEnd = () => {
  let lifes = life;
  lifes.pop();
  setLife(lifes);
}

let changeText = (e) => {
  const value = e.target.value
  setAreaText(value);
  arrayFromValue(e.target.value);
  console.log(str.length  + " " + areaText.length)
  if(str.length  === (areaText.length) && str === areaText){
    setResult('Вітаю, вам вдалося!!!');
    setCount(count)
    clearInterval(intervalID);
    setBgc({
      background: "green",
    });
  } else if(count <= 0) {
    setProblem(true); 
    lifeEnd();
  }
  if(copyStop === true) {
    lifeEnd();
    lifeEnd();
    lifeEnd();
    setProblem(true); 
    setCount(count)
    clearInterval(intervalID);
  }
  
}

const percentage = (text) => {
  let b = text.length / (str.length / 100);
  return b;
}

let arrayFromValue = (text) => {
    if(str[text.length - 1] !== text[text.length - 1]) {
      setBgc({
        background: "red",
      });
    } else {
      setBgc({
        background: "white",
      });
    }
  };

  const timer = () => {
    /* if(intervalID){
    timerReset();
    return;
  } */

    const time = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      console.log();
    }, 1000);
    setIntervalID(time);
  };

  const timerReset = () => {
    clearInterval(intervalID);
    setIntervalID(0);
    setCount(50);
    timer();
  };

  let newAttempt = () => {
    if (life.length === 0) {
      console.log("itsOver");
      setButtonAllow(true);
    } else {
      setProblem(false);
      setAreaText("");
      timerReset();
      setResult("");
      setBgc({
        background: "white",
      });
    }
  };

  const oneMoreTime = () => {
    setLife(posi);
    setButtonAllow(false);

  }

  return (
    <div>
      <div className="pseudoHeader">
        <div className="text" onCopy={() => setCopyStop(true)}>
          {str}
        </div>
      </div>
      <div className="centralPart">
        <div className="buttons">
          <div className="forButton">
            <button onClick={oneMoreTime}>Reset</button>
          </div>
          <div className="forButton">
            <button
              className="forButtonTry"
              onClick={newAttempt}
              disabled={buttonAllow}
            >
              Спробувати
            </button>
          </div>
        </div>
        <div>
          <textarea
            value={areaText}
            style={bgc}
            id="textArea"
            disabled={problem}
            onChange={changeText}
            onPaste={() => setCopyStop(true)}
          ></textarea>
        </div>
        <div className="count">
          <p>{count <= 0 ? "" : count}</p>
        </div>
      </div>
      <div>
        <div className="line">
          <div className="progres" style={{ width: percentage(areaText) + "%" }}></div>
        </div>
      </div>
      <div className="hearts">{life}</div>
      <div>
        <p className="mistake">
          {copyStop ? "Дружок, а ти не охринів часом?" : ""}
        </p>
        <p className="result">{result}</p>
        <p className="mistake">
          {buttonAllow
            ? "Упс, на цьому все, ви програли. Reset дасть змогу спробувати ще"
            : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
