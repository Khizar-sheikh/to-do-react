import { TodoProvider } from './components/TodoContext'; // Import TodoProvider
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskContainer from './components/TaskContainer';
import '../src/styles/App.css';

function App() {
  return (
    <TodoProvider> {/* Use TodoProvider */}
      <div className="app">
        <div className="app_header">
          <Header />
        </div>
        <div className="app-content">
          <Sidebar />
          <TaskContainer />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
