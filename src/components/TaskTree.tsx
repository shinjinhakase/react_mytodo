import { useContext } from "react";
import {
	AddChildrenContext,
	ChangeTaskContext,
	OrderDownContext,
	OrderUpContext,
	RemoveTaskContext,
} from "../contexts/TaskCardContext";
import type { TaskTree as TT } from "../model/viewModel/taskTree";
import TaskCard from "./TaskCard";

type TaskTreeProps = {
	taskTree: TT;
};

export function TaskTree({ taskTree }: TaskTreeProps) {
	const changeTask = useContext(ChangeTaskContext);
	const orderUp = useContext(OrderUpContext);
	const orderDown = useContext(OrderDownContext);
	const removeTask = useContext(RemoveTaskContext);
	const addChildren = useContext(AddChildrenContext);
	return (
		<>
			<TaskCard
				onTaskChange={changeTask}
				onOrderUp={orderUp}
				onOrderDown={orderDown}
				onRemoveTask={removeTask}
				onAddChildren={addChildren}
				isLastTask={false /*taskTree.task.id === tasklist.tasks[-1].id*/}
				task={taskTree.task}
			/>
			<ul>
				{taskTree.children.map((child) => (
					<TaskTree taskTree={child} key={child.task.id} />
				))}
			</ul>
		</>
	);
}
