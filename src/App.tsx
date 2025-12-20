import { useEffect, useState } from "react";
import "./App.css";
import ReactLogo from "./assets/ReactLogo";
import TaskCard from "./components/TaskCard/TaskCard";
import type Task from "./types/Task";
import TypeScriptLogo from "./assets/TypeScriptLogo";

function App() {
	const loadedTaskList: Task[] = JSON.parse(
		localStorage.getItem("taskData") || "[]",
	);
	const first_task_id = crypto.randomUUID();
	const defaultTaskList: Task[] = [
		{
			uuid: first_task_id,
			parentId: null,
			title: "task1",
			order: 0,
			label: "A",
			priority: 1,
		},
		{
			uuid: crypto.randomUUID(),
			parentId: null,
			title: "task2",
			order: 1,
			label: "B",
			priority: 2,
		},
		{
			uuid: crypto.randomUUID(),
			parentId: first_task_id,
			title: "task3",
			order: 0,
			label: "C",
			priority: 3,
		},
	];

	const tasks = loadedTaskList.length > 0 ? loadedTaskList : defaultTaskList;
	const [taskList, setTaskList] = useState<Task[]>(tasks);

	useEffect(() => {
		localStorage.setItem("taskData", JSON.stringify(taskList));
	}, [taskList]);

	const handleEditTask = (editedTask: Task) => {
		setTaskList(
			taskList.map((task: Task) =>
				task.uuid === editedTask.uuid ? editedTask : task,
			),
		);
	};

	const handleDeleteTask = (deletedTask: Task) => {
		setTaskList(
			taskList.filter((task: Task) => task.uuid !== deletedTask.uuid),
		);
	};

	const getChildren = (parentId: string | null) => {
		if (parentId === null)
			return taskList.filter((task) => task.parentId === null);

		return taskList.filter((task) => task.parentId === parentId);
	};

	const handleAddChild = (parentId: string | null) => {
		const newTask = {
			uuid: crypto.randomUUID(),
			parentId: parentId,
			title: "newTask",
			order: 0,
			label: "C",
			priority: 3,
		};
		setTaskList(taskList.concat(newTask));
	};

	return (
		<>
			<h1>
				<ReactLogo width={50} height={50} />
        <TypeScriptLogo width={50} height={50} />
				{"タスク管理"}
				<button type="button" onClick={(_e) => handleAddChild(null)}>
					+
				</button>
			</h1>
			{getChildren(null).map((task: Task) => (
				<TaskCard
					key={task.uuid}
					task={task}
					getChildren={getChildren}
					handleEditTask={handleEditTask}
					handleDeleteTask={handleDeleteTask}
					handleAddChild={handleAddChild}
				/>
			))}
		</>
	);
}

export default App;
