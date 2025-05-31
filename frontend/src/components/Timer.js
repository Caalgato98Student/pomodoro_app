import { useState, useEffect, useCallback } from 'react';
import '../styles/Timer.css';
import TimerUI from './TimerUI';

function Timer({ workDuration, shortBreak, longBreak, onSave }) {
  // Estado para el modo seleccionado: 'work', 'short', 'long'
  const [selectedTimer, setSelectedTimer] = useState('work');

  //Boton settings para editar timer
  const [showSettings, setShowSettings] = useState(false);

  // Estados para cada timer
  const [workTime, setWorkTime] = useState({ min: workDuration || 25, sec: 0, isActive: false });
  const [shortTime, setShortTime] = useState({ min: shortBreak || 5, sec: 0, isActive: false });
  const [longTime, setLongTime] = useState({ min: longBreak || 15, sec: 0, isActive: false });

  // Para editar configuración
  const [editWork, setEditWork] = useState(workDuration || 25);
  const [editShort, setEditShort] = useState(shortBreak || 5);
  const [editLong, setEditLong] = useState(longBreak || 15);

  // Funcion para reproducir sonido cuanoo termina el timer
  const playEndSound = useCallback(() => {
    try {
      const audio = new Audio('/notification.mp3');
      audio.play();
    } catch (error) {
      console.error("Error reproduciendo sonido:", error);
    }
  }, []);

  // Actualiza los tiempos si cambian los props
  useEffect(() => {
    setWorkTime({ min: workDuration || 25, sec: 0, isActive: false });
    setShortTime({ min: shortBreak || 5, sec: 0, isActive: false });
    setLongTime({ min: longBreak || 15, sec: 0, isActive: false });
    setEditWork(workDuration || 25);
    setEditShort(shortBreak || 5);
    setEditLong(longBreak || 15);
  }, [workDuration, shortBreak, longBreak]);

  // Timer effect para el modo seleccionado
  useEffect(() => {
    let interval = null;
    const timers = {
      work: [workTime, setWorkTime],
      short: [shortTime, setShortTime],
      long: [longTime, setLongTime]
    };
    const [timer, setTimer] = timers[selectedTimer];

    if (timer.isActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev.sec > 0) {
            return { ...prev, sec: prev.sec - 1 };
          } else if (prev.min > 0) {
            return { ...prev, min: prev.min - 1, sec: 59 };
          } else {
            clearInterval(interval);
            playEndSound();
            return { ...prev, isActive: false };
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedTimer, workTime.isActive, shortTime.isActive, longTime.isActive, playEndSound]);

  // Helpers para el timer seleccionado
  const getTimerState = () => {
    if (selectedTimer === 'work') return [workTime, setWorkTime, editWork];
    if (selectedTimer === 'short') return [shortTime, setShortTime, editShort];
    return [longTime, setLongTime, editLong];
  };

  const [timer, setTimer, editValue] = getTimerState();

  const startTimer = () => setTimer(prev => ({ ...prev, isActive: true }));
  const pauseTimer = () => setTimer(prev => ({ ...prev, isActive: false }));
  const resetTimer = () => setTimer({ min: Number(editValue), sec: 0, isActive: false });

  const handleSave = () => {
    console.log('Guardando tiempos...', editWork, editShort, editLong);
    if (onSave) {
      onSave({
        work_duration: Number(editWork),
        short_break: Number(editShort),
        long_break: Number(editLong)
      });
    }
    setWorkTime({ min: Number(editWork), sec: 0, isActive: false });
    setShortTime({ min: Number(editShort), sec: 0, isActive: false });
    setLongTime({ min: Number(editLong), sec: 0, isActive: false });
  };

  return (
    <TimerUI
      selectedTimer={selectedTimer}
      timer={timer}
      showSettings={showSettings}
      startTimer={startTimer}
      pauseTimer={pauseTimer}
      resetTimer={resetTimer}
      setShowSettings={setShowSettings}
      editWork={editWork}
      setEditWork={setEditWork}
      editShort={editShort}
      setEditShort={setEditShort}
      editLong={editLong}
      setEditLong={setEditLong}
      handleSave={handleSave}
      setSelectedTimer={setSelectedTimer}
    />
  );
}

export default Timer;