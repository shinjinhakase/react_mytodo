import Hamburger from "../../assets/Hamburger";
import type Task from "../../types/Task";
import styles from "./TaskCard.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";

interface TaskCardProps {
	task: Task;
	getChildren: (parentId: string) => Task[];
	handleEditTask: (editedTask: Task) => void;
	handleDoneTask: (doneTaskId: string) => void;
	handleDeleteTask: (deletedTask: Task) => void;
	handleAddChild: (parentId: string) => void;
}

const TaskCard = ({
	task,
	getChildren,
	handleEditTask,
	handleDoneTask,
	handleDeleteTask,
	handleAddChild,
}: TaskCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id: task.uuid });

	const draggingStyle = {
		transform: CSS.Transform.toString(transform),
		transition: isDragging ? "none" : transition,
		visibility: isDragging ? ("hidden" as const) : ("visible" as const),
	};

	const inputRef = useRef<HTMLInputElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const children = getChildren(task.uuid);
	const hasIncompleteChildren = children.some((child) => !child.isDone);

	useEffect(() => {
		if (spanRef.current && inputRef.current) {
			inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
		}
	}, [task.title]);

	return (
		<div>
			<div
				className={`${styles.taskCard} ${task.isDone ? styles.done : ""}`.trim()}
				style={draggingStyle}
				ref={setNodeRef}
			>
				<div className={styles.dragHandle} {...attributes} {...listeners}>
					<Hamburger width={13} height={13} />
				</div>
				<input
					ref={inputRef}
					value={task.title}
					onChange={(e) =>
						handleEditTask({
							...task,
							title: e.target.value,
						})
					}
				/>
				<span
					ref={spanRef}
					style={{
						position: "absolute",
						visibility: "hidden",
						whiteSpace: "pre",
						fontSize: "16px",
						padding: "4px 8px",
					}}
				>
					{task.title || " "}
				</span>
				<div>
					<button
						type="button"
						onClick={(_e) => handleDoneTask(task.uuid)}
						disabled={task.isDone || hasIncompleteChildren}
					>
						done
					</button>
					<button type="button" onClick={(_e) => handleDeleteTask(task)}>
						x
					</button>
				</div>
				<button type="button" onClick={(_e) => handleAddChild(task.uuid)}>
					+
				</button>
			</div>
			<div className={styles.children}>
				{!isDragging &&
					children.map((child) => (
						<TaskCard
							key={child.uuid}
							task={child}
							getChildren={getChildren}
							handleEditTask={handleEditTask}
							handleDoneTask={handleDoneTask}
							handleDeleteTask={handleDeleteTask}
							handleAddChild={handleAddChild}
						/>
					))}
			</div>
		</div>
	);
};

export default TaskCard;
