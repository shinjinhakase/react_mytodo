import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import useTasks from "./useTasks";

beforeEach(() => {
	localStorage.clear();
});

describe("useTasks", () => {
	test("初期タスクを取得", () => {
		const { result } = renderHook(() => useTasks());
		expect(result.current.getChildren("root")?.map((task) => task.title)).toStrictEqual([
			"task1",
			"task2",
		]);
	});

	test("getChildren", () => {
		const { result } = renderHook(() => useTasks());
		const firstTaskId = result.current.getChildren("root")?.[0].uuid;
		expect(result.current.getChildren(firstTaskId)?.[0].title).toBe("task3");
	});

	test("editTask", () => {
		const { result } = renderHook(() => useTasks());
		act(() => {
			result.current.editTask({
				...result.current.getChildren("root")?.[0],
				title: "edited",
			});
		});
		expect(result.current.getChildren("root")?.[0].title).toBe("edited");
	});

	test("doneTask は子がすべて完了しているときだけ完了状態にする", () => {
		const { result } = renderHook(() => useTasks());
		const parentTaskId = result.current.getChildren("root")?.[0].uuid;
		const childTaskId = result.current.getChildren(parentTaskId)?.[0].uuid;

		act(() => {
			result.current.doneTask(parentTaskId);
		});
		expect(result.current.getChildren("root")?.[0].isDone).toBe(false);

		act(() => {
			result.current.doneTask(childTaskId);
			result.current.doneTask(parentTaskId);
		});
		expect(result.current.getChildren(parentTaskId)?.[0].isDone).toBe(true);
		expect(result.current.getChildren("root")?.[0].isDone).toBe(true);
	});

	test("doneTask は完了済みタスクを未完了に戻せる", () => {
		const { result } = renderHook(() => useTasks());
		const taskId = result.current.getChildren("root")?.[1].uuid;

		act(() => {
			result.current.doneTask(taskId);
		});
		expect(result.current.getChildren("root")?.[1].isDone).toBe(true);

		act(() => {
			result.current.doneTask(taskId);
		});
		expect(result.current.getChildren("root")?.[1].isDone).toBe(false);
	});

	test("deleteTask", () => {
		const { result } = renderHook(() => useTasks());
		const firstTaskId = result.current.getChildren("root")?.[0].uuid;
		const secondTaskId = result.current.getChildren("root")?.[1].uuid;
		act(() => {
			result.current.deleteTask(result.current.getChildren("root")?.[0]);
		});
		expect(
			result.current
				.getChildren("root")
				?.filter((task) => task.uuid === firstTaskId).length,
		).toBe(0);
		expect(result.current.getChildren("root")?.length).toBe(1);
		expect(result.current.getChildren("root")?.[0].uuid).toBe(secondTaskId);
	});

	test("addChildTask", () => {
		const { result } = renderHook(() => useTasks());
		const firstTaskId = result.current.getChildren("root")?.[0].uuid;
		act(() => {
			result.current.addChildTask(firstTaskId);
		});
		expect(result.current.getChildren(firstTaskId)?.length).toBe(2);

		act(() => {
			result.current.addChildTask(firstTaskId);
		});
		expect(result.current.getChildren(firstTaskId)?.length).toBe(3);
	});

	test("addTaskToStart", () => {
		const { result } = renderHook(() => useTasks());

		act(() => {
			result.current.addTaskToStart("root");
		});

		expect(result.current.getChildren("root")?.map((task) => task.title)).toStrictEqual([
			"newTask",
			"task1",
			"task2",
		]);
		expect(result.current.getChildren("root")?.[0].isDone).toBe(false);
	});
});
