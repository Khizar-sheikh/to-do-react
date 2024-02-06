import { useTodoContext } from '../components/TodoContext';
import '../styles/ProjectList.css';

/*eslint-disable */
function ProjectList({ onProjectClick, projects }) {
    const { selectedProject } = useTodoContext();

    return (
        <div className="project-list">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        onClick={() => onProjectClick(project)}
                        className={selectedProject && selectedProject.id === project.id ? 'selected' : ''}
                    >
                        <h2>{project.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;
