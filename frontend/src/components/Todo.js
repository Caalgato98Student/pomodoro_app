import React, { useState } from 'react';
import axios from 'axios';
import TodoUI from './TodoUI';

// Componente para mostrar y editar un ítem de tarea
function TodoItem(props) {
  // Estado para modo edición
  const [isEditing, setIsEditing] = useState(false);
  // Estado para el título editado
  const [editTitle, setEditTitle] = useState(props.todo.title);
  // Estado para la descripción editada
  const [editDesc, setEditDesc] = useState(props.todo.description);

  // Elimina la tarea actual
  const deleteTodoHandler = () => {
    axios.delete(`http://localhost:8000/api/todo/${props.userId}/${props.todo.todo_id}`)
      .then(res => {
        if (res.status === 200) {
          alert("Tarea eliminada");
        } else {
          alert("Error al eliminar la tarea");
        }
      })
      .then(() => props.fetchTodos());
  }

  // Guarda los cambios de edición de la tarea
  const saveEditHandler = () => {
    axios.put(`http://localhost:8000/api/todo/${props.userId}/${props.todo.todo_id}`, {
      user_id: props.userId,
      todo_id: props.todo.todo_id,
      title: editTitle,
      description: editDesc
    }).then(() => {
      setIsEditing(false);
      props.fetchTodos();
    });
  };

  // Render el componente UI separado
  return (
    <TodoUI
      todo={props.todo}
      isEditing={isEditing}
      editTitle={editTitle}
      setEditTitle={setEditTitle}
      editDesc={editDesc}
      setEditDesc={setEditDesc}
      saveEditHandler={saveEditHandler}
      setIsEditing={setIsEditing}
      deleteTodoHandler={deleteTodoHandler}
    />
  );
}

export default TodoItem;