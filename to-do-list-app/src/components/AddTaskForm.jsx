import { useState } from 'react';
import { useTodoContext } from './TodoContext';
import '../styles/AddTaskForm.css';
/*eslint-disable */
function AddTaskForm({ onAddTask, onCancelTask }) {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        date: '',
        isImportant: false,
        project: null,
    });

    const { todoList } = useTodoContext();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setTaskData((prevData) => ({
            ...prevData,
            [name]: name === 'project' ? todoList.projects.find((project) => project.id === parseInt(value, 10)) : (type === 'checkbox' ? checked : value),
        }));
    };

    const handleAddTask = () => {
        if (validateTaskData()) {
            if (taskData.project) {
                onAddTask(taskData);
                setTaskData({
                    title: '',
                    description: '',
                    date: '',
                    isImportant: false,
                    project: null,
                });
            }
        }
    };
    const handleCancelTask = () => {
        onCancelTask();
    };

    const validateTaskData = () => {
        return taskData.title.trim() !== '' && taskData.project !== null;
    };

    return (
        <div className="add-task-form">
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleInputChange}
                    placeholder='Task Title...'
                />
            </label>

            <label>
                Description:
                <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    placeholder='Task Description..'
                />
            </label>

            <label>
                Date:
                <input
                    type="date"
                    name="date"
                    value={taskData.date}
                    onChange={handleInputChange}
                    placeholder='Pick a date'
                />
            </label>

            <label className='important'>
                Is Important:
                <input
                    type="checkbox"
                    name="isImportant"
                    checked={taskData.isImportant}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Select a Project:
                <select
                    name="project"
                    value={taskData.project ? taskData.project.id : ''}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        -- Select a Project --
                    </option>
                    {todoList.projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </label>

            {/* "Add Task" button */}
            <button onClick={handleAddTask}>Add Task</button>
            <button className='cancel' onClick={handleCancelTask}>Cancel</button>
        </div>
    );
}

export default AddTaskForm;
