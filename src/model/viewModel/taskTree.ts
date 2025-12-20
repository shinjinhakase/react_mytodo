import type { Task, TaskList } from "../task";

export type TaskTree = {
	task: Task;
	children: TaskTree[];
};

export function buildTaskTree(taskList: TaskList) {
	function makeTaskTree(parent: Task): TaskTree {
		const isChild = (task: Task) => task.parentId === parent.id;
		return {
			task: parent,
			children: taskList.tasks
				.filter(isChild)
				.slice()
				.sort((a, b) => a.order - b.order)
				.map(makeTaskTree),
		};
	}

	const isAncestor = (task: Task) => task.parentId === null;

	return taskList.tasks
		.filter(isAncestor)
		.slice()
		.sort((a, b) => a.order - b.order)
		.map(makeTaskTree);
}
