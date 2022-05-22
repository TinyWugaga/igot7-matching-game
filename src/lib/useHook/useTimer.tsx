import { useState, useMemo } from "react";

export default function() {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  let timer: ReturnType<typeof setInterval>;
  const countTime = () => {
    const time = new Date();
    setCurrentTime(time.getTime());
  };

  const startTimer = () => {
    const time = new Date();
    setStartTime(time.getTime());
    setCurrentTime(time.getTime());

    timer = setInterval(countTime, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const resumeTimer = () => {
    timer = setInterval(countTime, 1000);
  };

  const resetTimer = () => {
    stopTimer();
    setStartTime(0);
    setCurrentTime(0);
  };

  const currentTimer = useMemo(() => {
    const passedTime = (currentTime - startTime) / 1000;
    const passedHour =  Math.floor(passedTime / (60 * 60)) || '00'
    const passedMinute = Math.floor(passedTime / 60 ) || '00'
    const passedSecond = Math.floor(passedTime % 60) || '00'
    return `${passedHour}H ${passedMinute}M ${passedSecond}S`;
  }, [currentTime, startTime]);

  return {
    startTimer,
    stopTimer,
    resumeTimer,
    resetTimer,
    currentTimer,
  };
}
