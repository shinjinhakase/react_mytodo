type Task = {
	uuid: string;
	parentId: string | null;
	title: string;
	order: number;
	priority: number;
	label: string;
};

export default Task;
