import type React from "react";
import type { Task } from "../model/task";

type TaskCardProps = {
	onTaskChange: (task: Task) => void;
	onOrderUp: (task: Task) => void;
	onOrderDown: (task: Task) => void;
	onRemoveTask: (task: Task) => void;
	onAddChildren: (parent: Task) => void;
	isLastTask: boolean;
	task: Task;
};

export default function TaskCard({
	onTaskChange,
	onOrderUp,
	onOrderDown,
	onRemoveTask,
	onAddChildren,
	isLastTask,
	task,
}: TaskCardProps) {
	function onEditTaskTitle(event: React.FormEvent<HTMLInputElement>) {
		onTaskChange({ ...task, title: event.currentTarget.value });
	}

	function onOrderUpTaskCard(_: React.MouseEvent) {
		onOrderUp(task);
	}

	function onOrderDownTaskCard(_: React.MouseEvent) {
		onOrderDown(task);
	}

	function onRemoveTaskCard(_: React.MouseEvent) {
		onRemoveTask(task);
	}

	function onAddChild(parent: Task) {
		onAddChildren(parent);
	}

	function onRender(node: HTMLInputElement | null) {
		if (node === null) return;
		if (!isLastTask) return;
		if (node.dataset.focused === "true") return;
		node.focus();
		node.dataset.focused = "true";
	}

	return (
		<div key={task.id} id={task.id}>
			<input
				type="text"
				value={task.title}
				onChange={onEditTaskTitle}
				ref={onRender}
			/>
			<button type="button" onClick={onOrderUpTaskCard}>
				▲
			</button>
			<button type="button" onClick={onOrderDownTaskCard}>
				▼
			</button>
			<button type="button" onClick={onRemoveTaskCard}>
				done
			</button>
			<button type="button" onClick={() => onAddChild(task)}>
				+
			</button>
		</div>
	);
}
