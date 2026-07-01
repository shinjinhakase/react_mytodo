type Task = {
	uuid: string;
	parentId: string;
	isDone: boolean;
	title: string;
	order: number;
	priority: number;
	label: string;
};

export default Task;
