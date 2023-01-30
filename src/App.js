import React, {useState} from 'react'

function App() {

const [areaText, setAreaText] = useState('')
const [count, setCount] = useState(100);
const [problem, setProblem] = useState(true);  
const [intervalID, setIntervalID] = useState(0);
const [result, setResult] = useState('');
const [copyStop, setCopyStop] = useState(false);
const [bgc, setBgc] = useState({
  background: 'white'
})
const [line, setLine] = useState('30%')




let str = 'У 1908 році було прокладено першу залізницю, що поєднала Володимир-Волинський із Ковелем на півночі і далі з Києвом, діяли поштово-телеграфна контора, вісім готелів, два кінотеатри, чотири фабрично-заводські підприємства.  '




let changeText = (e) => {
  setAreaText(e.target.value);
  console.log(areaText)
  const percentage = () => {
    let b = areaText.length / (str.length / 100);
    return b;
  }
  setLine(percentage())
  arrayFromValue();
  if(str.length === areaText.length && str === areaText){
    setResult('Вітаю, вам вдалося!');
    setCount(count)
    clearInterval(intervalID);
  } else if(count <= 0) {
    setProblem(true); 
  }
  
}

let arrayFromValue = () => {
    if(str[areaText.length - 1] !== areaText[areaText.length - 1]) {
      setBgc({
        background: 'red'
      });
    } else {
      setBgc({
        background: 'white'
      })
    } 
}

const timer = () =>{
 /* if(intervalID){
    timerReset();
    return;
  } */

  const time = setInterval(() => {
    setCount(prevCount => prevCount - 1);
    console.log()}, 1000);
  setIntervalID(time);
};

const timerReset = () => {
  clearInterval(intervalID);
  setIntervalID(0);
  setCount(100)
  timer();
}

let newAttempt = () => {
  setProblem(false);
  setAreaText('');
  timerReset();
  setResult('')
  setLine(0)
}



return <>
  <div className='pseudoHeader'>
    <div className='text' onCopy={() => setCopyStop(true)}>{str}</div>
  </div>
  <div className='centralPart'>
    <div className='buttons'>
      <div className='forButton'>
        <button>Reset</button>
      </div>
      <div className='forButton'>
      <button className='forButtonTry' onClick={newAttempt}>Спробувати</button>
      </div>
    </div>
    <div>
    <textarea value={areaText} style={bgc} id="textArea"  disabled={problem} onChange={changeText} onPaste={() => setCopyStop(true)}></textarea>
    </div>
    <div className='count'>
    <p>{count <= 0 ? '' : count}</p>
    </div>
  </div>
  <div>
    <div className="line">
      <div className="progres" style={{width: line + '%'}}>
      </div>
    </div>
  </div>
  <div>
    <p className='mistake'>{copyStop ? 'Дружок, а ти не охринів часом?' : ''}</p>
    <p className="result">{result}</p>
  </div>
 </>
}

export default App;
