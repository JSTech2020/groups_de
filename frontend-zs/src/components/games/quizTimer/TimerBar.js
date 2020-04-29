import React, { useState, useEffect } from 'react';
import './TimerBar.scss';

function TimerBar({ fullTime, resetTimer, resetTimerCallback, timeOutCallback, active }) {
  const [ time, setTime ] = useState(fullTime - 1);


  const fullHeight = 550; // The bar is 400px high - TODO; Use refs?
  const pixPerTime = fullHeight / (fullTime - 1);
  const height = Math.floor(time * pixPerTime);

  useEffect(() => {
    if (time >= 0 && active) {
      const timerId = setInterval(() => {
        const newTime = Math.max(time - 1, -1);
        if (newTime === -1) {
          timeOutCallback();
          clearInterval(timerId);
        }
        setTime(newTime);
      }, 1000);
      return () => clearInterval(timerId);
    }
  });

  useEffect(() => {
    if (resetTimer) {
      setTime(fullTime - 1);
      resetTimerCallback();
    }
  }, [resetTimer, fullTime, resetTimerCallback]);

  const runningOut = time < 5 ? 'running-out' : '';

  return (
    <div className="timer-bar">
      <div className="under-bar">
        <div className="bar-text">{ time + 1 }</div>
        <div className={`over-bar ${runningOut}`} style={{height: height + 'px'}}></div>
      </div>
    </div>
  );
}

export default TimerBar;