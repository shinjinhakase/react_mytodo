import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  test("タイトル表示", () => {
    expect(screen.getByText("タスク管理")).toBeInTheDocument();
  });

  test("タスクの表示", async () => {
    const taskList = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(taskList.length).toBe(3);
    expect(taskList[0].value).toBe("task1");
    expect(taskList[1].value).toBe("task3");
    expect(taskList[2].value).toBe("task2");
  });

  test("追加ボタンを押すとタスクが追加される", async () => {
    const button = screen.getAllByRole("button", { name: "+" })?.[0];
    await userEvent.click(button);
    const taskList = screen.getAllByRole("textbox");
    expect(taskList.length).toBe(4);
  });
});
