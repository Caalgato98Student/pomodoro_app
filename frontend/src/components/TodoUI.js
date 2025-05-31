import React from 'react';

function TodoUI(props) {
  const {
    todo,
    isEditing,
    editTitle,
    setEditTitle,
    editDesc,
    setEditDesc,
    saveEditHandler,
    setIsEditing,
    deleteTodoHandler
  } = props;

  return (
    <div className="todo-item d-flex flex-column w-100 mb-2 p-2 bg-white rounded shadow-sm">
      {/* Sección de título y descripción o inputs de edición */}
      <div className="text-start flex-grow-1 mb-2">
        {isEditing ? (
          <>
            {/* Inputs para editar título y descripción */}
            <input
              className="form-control mb-1"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
            <textarea
              className="form-control"
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              rows={1}
              style={{ resize: "none", overflow: "hidden" }}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </>
          
        ) : (
          <>
            {/* Visualización de título y descripción */}
            <div className="todo-title">{todo.title}</div>
            <div className="todo-desc">{todo.description}</div>
          </>
        )}
      </div>
      {/* Sección de botones de acción */}
      <div className="d-flex flex-row flex-wrap gap-2 mt-2">
        {isEditing ? (
          <>
            {/* Botón para guardar cambios */}
            <button
              className="save-btn"
              onClick={saveEditHandler}
              title="Save changes"
            >
              <i className="bi bi-check-lg"></i>
            </button>
            {/* Botón para cancelar edición */}
            <button
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
              title="Cancel editing"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </>
        ) : (
          <>
            {/* Botón para activar modo edición */}
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <i className="bi bi-pencil"></i>
            </button>
            {/* Botón para eliminar tarea */}
            <button
              className="delete-btn"
              onClick={deleteTodoHandler}
              title="Delete task"
            >
              <i className="bi bi-trash3"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoUI;