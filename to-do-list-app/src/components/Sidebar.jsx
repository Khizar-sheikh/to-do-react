import { useState } from 'react';
import ProjectList from './ProjectList';
import { useTodoContext } from './TodoContext';
import '../styles/Sidebar.css';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function Sidebar() {
    const {
        setSelectedConditionAndProject,
        addProject,
        todoList,
    } = useTodoContext();
    const [newProjectName, setNewProjectName] = useState('');
    const [addingNewProject, setAddingNewProject] = useState(false);

    const handleProjectClick = (project) => {
        setSelectedConditionAndProject('project', project);
    };

    const handleCategoryClick = (condition) => {
        setSelectedConditionAndProject(condition);
    };

    const handleAddProjectClick = () => {
        setAddingNewProject(true);
    };

    const handleAddNewProject = () => {
        addProject(newProjectName);
        setNewProjectName('');
        setAddingNewProject(false);
    };

    const handleCancelAddProject = () => {
        setNewProjectName('');
        setAddingNewProject(false);
    };

    const isAddProjectButtonDisabled = () => {
        return newProjectName.trim() === '';
    };
    return (
        <aside className="sidebar">
            <h1 className='project__heading'>Filter</h1>
            <div className="category-section">
                <ul>
                    <li><button onClick={() => handleCategoryClick('today')}><h2>Today</h2></button></li>
                    <li><button onClick={() => handleCategoryClick('past7Days')}> <h2>Past 7 Days</h2> </button></li>
                    <li><button onClick={() => handleCategoryClick('important')}> <h2>Important</h2> </button></li>
                    <li><button onClick={() => handleCategoryClick('allTasks')}> <h2>All Tasks</h2></button></li>
                </ul>
            </div>
            {/* "Add a Project" button and form */}
            <div className="add-project-section">
                <h1 className='project__heading'>Projects</h1>
                {addingNewProject ? (
                    <div>
                        <input
                            type="text"
                            placeholder="New Project Name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                        />
                        <div className="button">
                            <button className='save' onClick={handleAddNewProject} disabled={isAddProjectButtonDisabled()}>
                                Save
                            </button>
                            <button className="cancel" onClick={handleCancelAddProject}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleAddProjectClick}>
                        <AddCircleOutlinedIcon /><h2>Add a Project</h2>
                    </button>
                )}
            </div>

            <ProjectList onProjectClick={handleProjectClick} projects={todoList.projects} />
        </aside>
    );
}

export default Sidebar;
