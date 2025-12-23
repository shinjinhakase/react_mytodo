import { useCallback, useEffect, useState } from "react";
import type Task from "../types/Task";

const createDefaultTasks = () => {
	const firstTaskId = crypto.randomUUID();

	return [
		{
			uuid: firstTaskId,
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
			parentId: firstTaskId,
			title: "task3",
			order: 0,
			label: "C",
			priority: 3,
		},
	];
};

const useTasks = () => {
	const loadedTaskList: Task[] = JSON.parse(
		localStorage.getItem("taskData") || "[]",
	);

	const initialTasks =
		loadedTaskList.length > 0 ? loadedTaskList : createDefaultTasks();

	const [taskList, setTaskList] = useState<Task[]>(initialTasks);

	useEffect(() => {
		localStorage.setItem("taskData", JSON.stringify(taskList));
	}, [taskList]);

	const editTask = useCallback((editedTask: Task) => {
		setTaskList((prev) =>
			prev.map((task) => (task.uuid === editedTask.uuid ? editedTask : task)),
		);
	}, []);

	const deleteTask = useCallback((deletedTask: Task) => {
		setTaskList((prev) =>
			prev.filter((task) => task.uuid !== deletedTask.uuid),
		);
	}, []);

	const addChildTask = useCallback((parentId: string | null) => {
		const newTask: Task = {
			uuid: crypto.randomUUID(),
			parentId,
			title: "newTask",
			order: 0,
			label: "C",
			priority: 3,
		};

		setTaskList((prev) => prev.concat(newTask));
	}, []);

	const getChildren = useCallback(
		(parentId: string | null) => {
			return taskList.filter((task) => task.parentId === parentId);
		},
		[taskList],
	);

	return {
		getChildren,
		editTask,
		deleteTask,
		addChildTask,
	};
};

export default useTasks;
