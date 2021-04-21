import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <div>
            {tasks.map((task, index) => (
                <Task
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    key={index}
                />
            ))}
        </div>
    )
}

export default Tasks
