import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TaskCard from "./TaskCard";

const getChildren = vi.fn();
const handleEditTask = vi.fn();
const handleDeleteTask = vi.fn();
const handleAddChild = vi.fn();
const mockTask = {
	uuid: "uuid",
	title: "モックタスク",
	parentId: "parentId",
	order: 0,
	priority: 0,
	label: "label",
};

describe("TaskCard", () => {
	beforeEach(() => {
		render(
			<TaskCard
				task={mockTask}
				getChildren={getChildren}
				handleEditTask={handleEditTask}
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

	test("doneボタンを押すと削除される", async () => {
		const button = screen.getByRole("button", { name: "done" });
		await userEvent.click(button);
		expect(handleDeleteTask).toHaveBeenCalledWith(mockTask);
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
