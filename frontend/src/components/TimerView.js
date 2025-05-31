import { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from './Timer';

// Componente para mostrar y configurar el temporizador
function TimerView({ userId }) {
  // Estado para la configuración del temporizador
  const [settings, setSettings] = useState(null);

  // Obtiene la configuración del temporizador del backend al montar o cambiar userId
  useEffect(() => {
    axios.get(`http://localhost:8000/api/timer/${userId}`)
      .then(res => setSettings(res.data));
  }, [userId]);

  // Guarda la configuración actualizada del temporizador en el backend
  const saveSettings = (newSettings) => {
    axios.put(`http://localhost:8000/api/timer/${userId}`, {
      user_id: userId,
      ...newSettings
    }).then(res => setSettings(res.data));
  };

  // Muestra mensaje de carga si no hay configuración aún
  if (!settings) return <div>Loading...</div>;

  // Renderiza el componente Timer con las configuraciones actuales
  return (
    <Timer
      workDuration={settings.work_duration}
      shortBreak={settings.short_break} 
      longBreak={settings.long_break}    
      onSave={saveSettings}     
    />
  );
}

export default TimerView;