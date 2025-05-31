import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './styles/Todos.css';
import TodoView from './components/TodoListView';
import TimerView from './components/TimerView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Genera o recupera el user_id único del usuario en localStorage del navegador
function getUserId() {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }
  return userId;
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const userId = getUserId();

  const fetchTodos = useCallback(() => {
    axios.get(`http://localhost:8000/api/todo?user_id=${userId}`)
      .then(res => setTodoList(res.data));
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodoHandler = () => {
    if (!title.trim() || !desc.trim()) {
      alert("Debes ingresar título y descripción");
      return;
    }
    const todo_id = crypto.randomUUID();
    axios.post('http://localhost:8000/api/todo', {
      title,
      description: desc,
      user_id: userId,
      todo_id 
    })
      .then(() => {
        setTitle('');
        setDesc('');
        fetchTodos();
      });
  };

  return (
    <div className="App min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="card-body w-100">
        <h1 className="mb-2 title">Pomodoro</h1>
        <h6 className="mb-4 subtitle">FASTAPI · React · MongoDB</h6>
        {/* Flexbox principal para timer y tareas */}
        <div className="main-sections d-flex flex-row flex-wrap gap-4 w-100">
          {/* Sección Timer+Controles */}
          <div className="timer-section flex-grow-1 d-flex flex-column align-items-center">
            <TimerView userId={userId} />
          </div>
          {/* Sección Tareas */}
          <div className="tasks-section flex-grow-1 d-flex flex-column align-items-center">
            <h5 className="mb-3 subtitle">Add todo</h5>
            <span className="card-text d-flex flex-column align-items-center w-100">
              <input className="mb-2 form-control titleIn" value={title} onChange={event => setTitle(event.target.value)} placeholder='Task'/>
              <input className="mb-2 form-control desIn" value={desc} onChange={event => setDesc(event.target.value)} placeholder='Description' />
              <button className="btn-add-todo mx-2 mb-3" onClick={addTodoHandler}>Add</button>
            </span>
            <div className="todos-list w-100">
              <TodoView todoList={todoList} fetchTodos={fetchTodos} userId={userId} />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-light py-2 mt-4 d-flex align-items-center justify-content-center gap-2">
        <span className="footer-author">
          Created by Camila Alejandra Gallardo Torres
        </span>
        <a
          href="https://github.com/Caalgato98Student"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light github-link"
          title="GitHub"
        >
          <i className="bi bi-github"></i>
        </a>
      </footer>
    </div>
  );
}

export default App;