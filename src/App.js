import React, { useState } from "react";
import heart from "./1.jpg";

function App() {

const [areaText, setAreaText] = useState('')
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
const [buttonAllow, setButtonAllow] = useState(false);
const [showMain, setShowMain] = useState(false);
const [styledWindow, setStyledWindow] = useState({
  zIndex: 1,
  opacity: 0.04
});
const [closeWindowStyle, setCloseWindowStyle] = useState({
  zIndex: 3
})
const [challengeTime, setChallengeTime] = useState(40);
const [count, setCount] = useState(challengeTime);
const str = `У 1908 році було прокладено першу залізницю, що поєднала Володимир-Волинський із Ковелем на півночі і далі з Києвом, діяли поштово-телеграфна контора, вісім готелів, два кінотеатри, чотири фабрично-заводські підприємства.`;

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
    setProblem(true); 
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
    const time = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
      console.log();
    }, 1000);
    setIntervalID(time);
  };

  const timerReset = () => {
    clearInterval(intervalID);
    setIntervalID(0);
    setCount(challengeTime);
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

  const closeWindow = () => {
    setShowMain(true);
    console.log(showMain);
    setStyledWindow({
      zIndex: 5,
      opacity: 1
    })
    setCloseWindowStyle({
      zIndex: 0,
      opacity: 0
    })
  }

  const pussyMode = () => {
    setChallengeTime(50);
    setCount(50);
    setAreaText("");
  }

  const hardMode = () => {
    setChallengeTime(30);
    setCount(30);
    setAreaText("");
  }

  return (
    <div>
      <div className="explaining" style={closeWindowStyle}>
        <div className="closeWindow" onClick={closeWindow}>
          <span></span><span></span>
        </div>
        <p>Як пройти випробування клавіатурою!</p>
        <ol>
          <li>Натисність на кнопку "Спробувати"</li>
          <li>Перейдіть у поле для вводу та введіть текст, що розміщений над ним (<b>намагайтесь зробити це якогомога швидше.</b>)</li>
          <li><b>Важливо</b> - після повного набору тексту, включно з крапкою, необхідно <b>натиснути клавішу "Space" або "Enter"</b> для зарахування результату.</li>
          <li>У випадку невдачі спробуйте ще раз, повторно натиснувши на кнопку "Спробувати".</li>
          <li>Зміна кольору вікна для вводу на червоний означає, що ви зробили помилку. Допускається стираня як усього набраного тексту, так і його частини через клавішу 'Backspace'</li>
          <li>Враховуйте, що на виконання завдання видається лише три спроби. Щоб перезапустити завдання та відновити спроби <b>натисніть на кнопку "Reset".</b></li>
        </ol>
        <p>Я розумію, що може бути важко. Саме тому мною було попередньо передбачено режим для пусічок. Натисніть на відповідну кнопку, щоб активувати цей режим. Також можна ускладнити завдання, натиснувши на кнопку "Мені занадто легко". </p>
      </div>
      <div className="main" style={styledWindow}>
        <div className="upperButtons">
          <button className="pussy" onClick={pussyMode}>Я маленька пусічка, мені вазько, хочу простіше</button>
          <button className="hard" onClick={hardMode}>Хочу складніше</button>
        </div>
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
            {copyStop ? "Нєа, не спрацює це. Та і оце повідомлення тепер нікуди не зникне, так що давай, оновлюй сторінку." : ""}
          </p>
          <p className="result">{result}</p>
          <p className="mistake">
            {buttonAllow
              ? "Упс, на цьому все, ви програли. Reset дасть змогу спробувати ще, якщо хтось не махлював"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
