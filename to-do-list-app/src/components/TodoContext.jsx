import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from "prop-types"

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    // Load data from localStorage on component mount
    const initialTodoList = JSON.parse(localStorage.getItem('todoList')) || {
        projects: [],
        tasks: [],
    };

    const [todoList, setTodoList] = useState(initialTodoList);

    const [selectedCondition, setSelectedCondition] = useState('today');
    const [selectedProject, setSelectedProject] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

        // Update filteredTasks based on the selected condition and project
        if (selectedCondition === 'allTasks') {
            setFilteredTasks(todoList.tasks);
        } else if (selectedCondition === 'important') {
            setFilteredTasks(todoList.tasks.filter(task => task.isImportant));
        } else if (selectedCondition === 'today') {
            setFilteredTasks(
                todoList.tasks.filter(task => isTaskForToday(task, currentDate))
            );
        } else if (selectedCondition === 'past7Days') {
            setFilteredTasks(
                todoList.tasks.filter(task => isTaskInPast7Days(task, currentDate, oneDay))
            );
        } else if (selectedProject) {
            setFilteredTasks(selectedProject.tasks);
        } else {
            // Handle other conditions if needed
            setFilteredTasks([]);
        }
    }, [selectedCondition, selectedProject, todoList]);

    // Save data to localStorage whenever todoList changes
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    const addProject = (name) => {
        const newProject = {
            id: todoList.projects.length + 1,
            name,
            tasks: [],
        };
        setTodoList((prevTodoList) => ({
            ...prevTodoList,
            projects: [newProject, ...prevTodoList.projects],
        }));
    };

    const addTask = (newTask) => {
        setTodoList((prevTodoList) => {
            const updatedTasks = [newTask, ...prevTodoList.tasks];
            const updatedProjects = prevTodoList.projects.map((project) =>
                project.id === newTask.project.id
                    ? { ...project, tasks: [newTask, ...project.tasks] }
                    : project
            );

            return {
                ...prevTodoList,
                projects: updatedProjects,
                tasks: updatedTasks,
            };
        });
    };

    const setSelectedConditionAndProject = (condition, project = null) => {
        setSelectedCondition(condition);
        setSelectedProject(project);
    };

    const isTaskForToday = (task, currentDate) => {
        const taskDate = new Date(task.date);
        return (
            taskDate.getDate() === currentDate.getDate() &&
            taskDate.getMonth() === currentDate.getMonth() &&
            taskDate.getFullYear() === currentDate.getFullYear()
        );
    };

    const isTaskInPast7Days = (task, currentDate, oneDay) => {
        const taskDate = new Date(task.date);
        const daysDiff = Math.floor((currentDate - taskDate) / oneDay);
        return daysDiff >= 1 && daysDiff <= 7;
    };

    const value = {
        todoList,
        addProject,
        addTask,
        selectedCondition,
        setSelectedConditionAndProject,
        selectedProject,
        filteredTasks,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};

TodoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};