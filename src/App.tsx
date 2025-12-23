import "./App.css";
import ReactLogo from "./assets/ReactLogo";
import TypeScriptLogo from "./assets/TypeScriptLogo";
import TaskCard from "./components/TaskCard/TaskCard";
import useTasks from "./hooks/useTasks";
import type Task from "./types/Task";

function App() {
	const { getChildren, editTask, deleteTask, addChildTask } = useTasks();

	return (
		<>
			<h1>
				<ReactLogo width={50} height={50} />
				<TypeScriptLogo width={50} height={50} />
				{"タスク管理"}
				<button type="button" onClick={(_e) => addChildTask(null)}>
					+
				</button>
			</h1>
			{getChildren(null)?.map((task: Task) => (
				<TaskCard
					key={task.uuid}
					task={task}
					getChildren={getChildren}
					handleEditTask={editTask}
					handleDeleteTask={deleteTask}
					handleAddChild={addChildTask}
				/>
			))}
		</>
	);
}

export default App;
