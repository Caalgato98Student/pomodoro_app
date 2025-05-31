import TodoItem from './Todo'

export default function TodoView(props) {
    return (
        <div>
            <ul>
                {props.todoList.map(todo =>
                    <TodoItem
                        key={todo.todo_id}
                        todo={todo}
                        userId={props.userId}
                        fetchTodos={props.fetchTodos}
                    />
                )}
            </ul>
        </div>
    )
}