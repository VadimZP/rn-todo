import { render, screen, userEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import App from "./App";

describe("App component", () => {
  test("renders created task", async () => {
    render(<App />);

    const inputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(inputElem, "Test Task");

    const btnElem = screen.getByText("Add");
    expect(btnElem).toBeOnTheScreen();

    await userEvent.press(btnElem);

    expect(screen.getByText("Test Task")).toBeOnTheScreen();
  });

  test("deletes created task", async () => {
    render(<App />);

    const inputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(inputElem, "Test Task");

    const addBtnElem = screen.getByText("Add");
    await userEvent.press(addBtnElem);

    const deleteBtnElem = screen.getByTestId("delete-btn-0");
    await userEvent.press(deleteBtnElem);

    expect(screen.queryByTestId("task-item-0")).not.toBeOnTheScreen();
  });

  test("edits only the second task", async () => {
    render(<App />);

    const taskCreationInputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(taskCreationInputElem, "Test Task 1");

    const addBtnElem = screen.getByText("Add");
    await userEvent.press(addBtnElem);

    await userEvent.type(taskCreationInputElem, "Test Task 2");
    await userEvent.press(addBtnElem);

    const editBtnElem = screen.getByTestId("edit-btn-1");
    await userEvent.press(editBtnElem);

    const taskEditingInputElem = screen.getByTestId("task-input-1");
    await userEvent.clear(taskEditingInputElem);
    await userEvent.type(taskEditingInputElem, "Edited task content");

    const saveBtnElem = screen.getByTestId("save-btn-1");
    await userEvent.press(saveBtnElem);

    expect(screen.getByText("Test Task 1")).toBeOnTheScreen();
    expect(screen.getByText("Edited task content")).toBeOnTheScreen();
  });
});
