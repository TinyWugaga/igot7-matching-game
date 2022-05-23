import { useState, useMemo } from "react";

type Timer = ReturnType<typeof setInterval> | null
export default function() {
  const [timer, setTimer] = useState<Timer>(null);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [passedTime, setPassedTime] = useState(0);

  const countTime = () => {
    const time = new Date();
    setCurrentTime(time.getTime());
  };

  const startTimer = () => {
    const time = new Date();
    setStartTime(time.getTime());
    setCurrentTime(time.getTime());

    setTimer(setInterval(countTime, 1000));
  };

  const stopTimer = () => {
    console.log({timer})
    const time = new Date();
    setPassedTime((time.getTime() - startTime))
    
    if(timer) {
      clearInterval(timer)
      setTimer(null)
    }
  };

  const resumeTimer = () => {
    const time = new Date();
    setStartTime(time.getTime() - passedTime);
    setCurrentTime(time.getTime());

    setTimer(setInterval(countTime, 1000));
  };

  const resetTimer = () => {
    stopTimer();
    setStartTime(0);
    setCurrentTime(0);
    setPassedTime(0)
  };


  const currentTimer = useMemo(() => {
    const time = (currentTime - startTime) / 1000;
    const passedHour =  Math.floor(time / (60 * 60)) || '00'
    const passedMinute = Math.floor(time / 60 ) || '00'
    const passedSecond = Math.floor(time % 60) || '00'

    const formatTimeString = (timeString: number|string) => {
      if(timeString.toString().length === 1) return '0' + timeString
      return timeString
    }

    return `${formatTimeString(passedHour)}:${formatTimeString(passedMinute)}:${formatTimeString(passedSecond)}`;
  }, [currentTime, startTime]);

  return {
    startTimer,
    stopTimer,
    resumeTimer,
    resetTimer,
    currentTimer,
  };
}
