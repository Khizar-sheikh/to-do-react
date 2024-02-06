import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import { useTodoContext } from './TodoContext';
import '../styles/TaskContainer.css';
import StarIcon from '@mui/icons-material/Star';

function TaskContainer() {
    const { selectedCondition, selectedProject, addTask, filteredTasks } = useTodoContext();
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const getHeader = () => {
        if (selectedCondition === 'allTasks') {
            return 'All Tasks';
        } else if (selectedCondition === 'important') {
            return 'Important Tasks';
        } else if (selectedCondition === 'today') {
            return 'Today';
        } else if (selectedCondition === 'past7Days') {
            return 'Past 7 Days';
        } else if (selectedProject) {
            return ` ${selectedProject.name}`;
        } else {
            return ` ${selectedCondition}`;
        }
    };

    const handleAddTaskClick = () => {
        setShowAddTaskForm(!showAddTaskForm);
    };

    const handleAddTask = (newTask) => {
        addTask(newTask);
        setShowAddTaskForm(false);
    };
    const handleCancelTask = () => {
        setShowAddTaskForm(false);
    };



    return (
        <div className="task-container">
            <h2 className='taskcontainer__header' >{getHeader()}</h2>
            <button className='addTask' onClick={handleAddTaskClick}>Add Task</button>
            {showAddTaskForm && <AddTaskForm onAddTask={handleAddTask} onCancelTask={handleCancelTask} />}
            <ul className="task-list">
                {filteredTasks.map((task, index) => (
                    <li key={index} className="task-card">
                        <div className="title">{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</div>
                        <div className="star-icon">
                            {task.isImportant && <StarIcon style={{ color: '#f1c40f' }} />}
                        </div>
                        <div className="description"><b>Description</b>: {task.description}</div>
                        <div className="date-and-project">
                            <div className="date">Date: {task.date}</div>
                            <div className="project">{task.project.name}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskContainer;
