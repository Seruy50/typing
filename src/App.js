import React, {useState} from 'react'

function App() {
//Продовжуй мудохатись з таймером!!!
const [areaText, setAreaText] = useState('')
const [count, setCount] = useState(10);
const [problem, setProblem] = useState(false);
const [intervalID, setIntervalID] = useState(0);
const [result, setResult] = useState('');
const [copyStop, setCopyStop] = useState(false);

let str = 'У 1908 році було прокладено першу залізницю, що поєднала Володимир-Волинський із Ковелем на півночі і далі з Києвом, діяли поштово-телеграфна контора, вісім готелів, два кінотеатри, чотири фабрично-заводські підприємства.  '
let arr = areaText.split('');
let arr2 = str.split('');

let changeText = (e) => {
  setAreaText(e.target.value);
  arrayFromValue();
  console.log(arr.length + '' + arr2.length);
  if((arr.length + 1) === arr2.length){
    setResult('Вітаю, вам вдалося!');
    timerReset();
    clearInterval(intervalID);
  }
  if(count <= 0) {
    setProblem(true)
  }
}

let arrayFromValue = () => {
  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== arr2[i]) {
      setProblem(true);
      timerReset(); 
    }
  }
}

let newAttempt = () => {
  setProblem(false);
  setAreaText('');
  timerReset();
  setResult('')
}

const timer = () =>{
  if(intervalID){
    timerReset();
    return;
  } 

  const time = setInterval(() => {
    setCount(prevCount => prevCount - 1);
    console.log()}, 1000);
  setIntervalID(time);
};

const timerReset = () => {
  clearInterval(intervalID);
  setIntervalID(0);
  setCount(10)
  timer();
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
    <textarea value={areaText} id="textArea" disabled={problem} onChange={changeText} onPaste={() => setCopyStop(true)}></textarea>
    </div>
    <div className='count'>
    <p>{count <= 0 ? '' : count}</p>
    </div>
  </div>
  <div>
    <p className='mistake'>{copyStop ? 'Дружок, а ти не охринів часом?' : ''}</p>
    <p className="result">{result}</p>
  </div>
 </>
}

export default App;
