import "./App.css";
import ReactLogo from "./assets/ReactLogo";
import TypeScriptLogo from "./assets/TypeScriptLogo";
import TaskCard from "./components/TaskCard/TaskCard";
import useTasks from "./hooks/useTasks";
import type Task from "./types/Task";
import {
  SortableContext,
  verticalListSortingStrategy,
	sortableKeyboardCoordinates,
	arrayMove,
} from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState, useRef } from "react";

const OverlayTask = (task: Task) => {
  return(
    <div>
      <input value={task.title}/><button disabled>done</button>
    </div>
  );
};

function App() {
	const { taskList, setTaskList, getChildren, editTask, deleteTask, addChildTask } = useTasks();
	const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
	const [activeId, setActiveId] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = taskList.findIndex((item) => item.uuid === active.id);
      const newIndex = taskList.findIndex((item) => item.uuid === over.id);
      const newTaskList = arrayMove(taskList, oldIndex, newIndex);
      setTaskList(newTaskList);
    };
    setActiveId(null);
  };

  const activeItem = activeId
    ? taskList.find((task) => task.uuid === activeId)
    : null;

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
			<div ref={containerRef}>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}  
				>
					<SortableContext
						items={taskList.map((task) => task.uuid)}
						strategy={verticalListSortingStrategy}
					>
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
					</SortableContext>
					<DragOverlay>
						{activeItem ? (
							<OverlayTask {...activeItem} />
						) : null }
					</DragOverlay>
				</DndContext>
			</div>
		</>
	);
}

export default App;
