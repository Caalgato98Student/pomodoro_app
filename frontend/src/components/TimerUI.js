import React from 'react';

function TimerUI({
  selectedTimer,
  timer,
  showSettings,
  startTimer,
  pauseTimer,
  resetTimer,
  setShowSettings,
  editWork,
  setEditWork,
  editShort,
  setEditShort,
  editLong,
  setEditLong,
  handleSave,
  setSelectedTimer
}) {
  return (
    <div
      id="timer-section"
      className="d-flex flex-column align-items-center w-100"
    >
      {/* Seccion del timer */}
      <div
        id="timer-display"
        className={`timer-display ${selectedTimer}`}
      >
        {String(timer.min).padStart(2, '0')}:{String(timer.sec).padStart(2, '0')}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button className="timer-btn" onClick={startTimer} disabled={timer.isActive} title="Start">
            <i className="bi bi-play-fill me-1"></i>
          </button>
          <button className="timer-btn" onClick={pauseTimer} disabled={!timer.isActive} title="Pause">
            <i className="bi bi-pause-fill me-1"></i>
          </button>
          <button className="timer-btn" onClick={resetTimer} title="Restart">
            <i className="bi bi-arrow-counterclockwise me-1"></i>
          </button>
          <button className="timer-btn" onClick={() => setShowSettings(true)} title="Settings">
            <i className="bi bi-gear me-1"></i>
          </button>
        </div>
      </div>

      {/* Modal de configuración */}
      {showSettings && (
        <div className="timer-modal-backdrop">
          <div className="timer-modal">
            <h5>Timer settings</h5>
            <div className="d-flex flex-column gap-3">
              <label>
                Pomodoro:
                <input
                  type="number"
                  min="1"
                  max="180"
                  className="input-timer-config ms-2"
                  value={editWork}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/, '');
                    if (value === "" || Number(value) > 180) return;
                    setEditWork(value);
                  }}
                />
              </label>
              <label>
                Short break:
                <input
                  type="number"
                  min="1"
                  max="60"
                  className="input-timer-config ms-2"
                  value={editShort}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/, '');
                    if (value === "" || Number(value) > 60) return;
                    setEditShort(value);
                  }}
                />
              </label>
              <label>
                Long break:
                <input
                  type="number"
                  min="1"
                  max="120"
                  className="input-timer-config ms-2"
                  value={editLong}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/, '');
                    if (value === "" || Number(value) > 120) return;
                    setEditLong(value);
                  }}
                />
              </label>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="cancel-btn" onClick={() => setShowSettings(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
              <button
                className="save-btn"
                onClick={() => {
                  handleSave();
                  setShowSettings(false);
                }}
              >
                <i className="bi bi-check-lg"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de controles debajo */}
      <div
        id="timer-controls"
        className="timer-controls d-flex flex-row justify-content-between gap-3"
      >
        {/* Pomodoro */}
        <div className="timer-mode-col d-flex flex-column align-items-center flex-fill">
          <button
            className={`mode-btn ${selectedTimer === 'work' ? 'active' : ''}`}
            onClick={() => setSelectedTimer('work')}
            type="button"
          >
            Pomodoro
          </button>
        </div>
        {/* Short break */}
        <div className="timer-mode-col d-flex flex-column align-items-center flex-fill">
          <button
            className={`mode-btn ${selectedTimer === 'short' ? 'active' : ''}`}
            onClick={() => setSelectedTimer('short')}
            type="button"
          >
            Short break
          </button>
        </div>
        {/* Long break */}
        <div className="timer-mode-col d-flex flex-column align-items-center flex-fill">
          <button
            className={`mode-btn ${selectedTimer === 'long' ? 'active' : ''}`}
            onClick={() => setSelectedTimer('long')}
            type="button"
          >
            Long break
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerUI;