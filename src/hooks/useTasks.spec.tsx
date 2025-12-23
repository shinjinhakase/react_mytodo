import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import useTasks from "./useTasks";

beforeEach(() => {
  localStorage.clear();
});

describe("useTasks", () => {
  test("初期タスクを取得", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.getChildren(null)?.map((task) => task.title)).toStrictEqual([
      "task1",
      "task2",
    ]);
  });

  test("getChildren", () => {
    const { result } = renderHook(() => useTasks());
    const firstTaskId = result.current.getChildren(null)?.[0].uuid;
    expect(result.current.getChildren(firstTaskId)?.[0].title).toBe("task3");
  });

  test("editTask", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.editTask({
        ...result.current.getChildren(null)?.[0],
        title: "edited",
      });
    });
    expect(result.current.getChildren(null)?.[0].title).toBe("edited");
  });

  test("deleteTask", () => {
    const { result } = renderHook(() => useTasks());
    const firstTaskId = result.current.getChildren(null)?.[0].uuid;
    const secondTaskId = result.current.getChildren(null)?.[1].uuid;
    act(() => {
      result.current.deleteTask(result.current.getChildren(null)?.[0]);
    });
    expect(result.current.getChildren(null)?.filter((task) => task.uuid === firstTaskId).length).toBe(0);
    expect(result.current.getChildren(null)?.length).toBe(1);
    expect(result.current.getChildren(null)?.[0].uuid).toBe(secondTaskId);
  });

  test("addChildTask", () => {
    const { result } = renderHook(() => useTasks());
    const firstTaskId = result.current.getChildren(null)?.[0].uuid;
    act(() => {
      result.current.addChildTask(firstTaskId);
    });
    expect(result.current.getChildren(firstTaskId)?.length).toBe(2);

    act(() => {
      result.current.addChildTask(firstTaskId);
    });
    expect(result.current.getChildren(firstTaskId)?.length).toBe(3);
  })
});
