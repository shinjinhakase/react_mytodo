import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TaskCard from "./TaskCard";
import styles from "./TaskCard.module.scss";

const getChildren = vi.fn();
const handleEditTask = vi.fn();
const handleDoneTask = vi.fn();
const handleDeleteTask = vi.fn();
const handleAddChild = vi.fn();
const mockTask = {
	uuid: "uuid",
	title: "モックタスク",
	parentId: "parentId",
	isDone: false,
	order: 0,
	priority: 0,
	label: "label",
};

describe("TaskCard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		getChildren.mockImplementation(() => []);
		render(
			<TaskCard
				task={mockTask}
				getChildren={getChildren}
				handleEditTask={handleEditTask}
				handleDoneTask={handleDoneTask}
				handleDeleteTask={handleDeleteTask}
				handleAddChild={handleAddChild}
			/>,
		);
	});

	test("タスクカードが表示される", () => {
		const taskCard: HTMLInputElement = screen.getByRole("textbox");
		expect(taskCard.value).toBe("モックタスク");
	});

	test("文字を入力すると編集される", async () => {
		const input = screen.getByRole("textbox");
		await userEvent.type(input, "a");
		expect(handleEditTask).toHaveBeenCalledWith({
			...mockTask,
			title: "モックタスクa",
		});
	});

	test("doneボタンを押すと完了処理が呼ばれる", async () => {
		const button = screen.getByRole("button", { name: "done" });
		await userEvent.click(button);
		expect(handleDoneTask).toHaveBeenCalledWith(mockTask.uuid);
	});

	test("未完了の子がいると未完了タスクのdoneボタンは無効になる", () => {
		getChildren.mockImplementation((parentId: string) =>
			parentId === mockTask.uuid
				? [{ ...mockTask, uuid: "child", parentId: mockTask.uuid }]
				: [],
		);
		render(
			<TaskCard
				task={mockTask}
				getChildren={getChildren}
				handleEditTask={handleEditTask}
				handleDoneTask={handleDoneTask}
				handleDeleteTask={handleDeleteTask}
				handleAddChild={handleAddChild}
			/>,
		);

		expect(screen.getAllByRole("button", { name: "done" })[1]).toBeDisabled();
	});

	test("完了済みタスクのdoneボタンは未完了に戻すため有効になる", () => {
		render(
			<TaskCard
				task={{ ...mockTask, isDone: true }}
				getChildren={getChildren}
				handleEditTask={handleEditTask}
				handleDoneTask={handleDoneTask}
				handleDeleteTask={handleDeleteTask}
				handleAddChild={handleAddChild}
			/>,
		);

		expect(screen.getAllByRole("button", { name: "done" })[1]).not.toBeDisabled();
	});

	test("未完了タスクの削除ボタンは無効になる", () => {
		expect(screen.getByRole("button", { name: "x" })).toBeDisabled();
	});

	test("完了済みタスクの削除ボタンは有効で背景が緑になる", async () => {
		render(
			<TaskCard
				task={{ ...mockTask, isDone: true }}
				getChildren={getChildren}
				handleEditTask={handleEditTask}
				handleDoneTask={handleDoneTask}
				handleDeleteTask={handleDeleteTask}
				handleAddChild={handleAddChild}
			/>,
		);

		const deleteButton = screen.getAllByRole("button", { name: "x" })[1];
		expect(deleteButton).not.toBeDisabled();

		await userEvent.click(deleteButton);
		expect(handleDeleteTask).toHaveBeenCalledWith({ ...mockTask, isDone: true });

		const textbox = screen.getAllByRole("textbox")[1];
		expect(textbox.closest(`.${styles.taskCard}`)).toHaveClass(styles.done);
	});

	test("+ボタンを押すと子タスクが追加される", async () => {
		const button = screen.getByRole("button", { name: "+" });
		await userEvent.click(button);
		expect(handleAddChild).toHaveBeenCalledWith(mockTask.uuid);
	});

	test("子タスクの表示を試みる", () => {
		expect(getChildren).toHaveBeenCalledWith(mockTask.uuid);
	});
});
