import { render, screen, userEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import * as LocalAuthentication from "expo-local-authentication";

import App from "./App";
import React from "react";

jest.mock("expo-local-authentication", () => ({
  authenticateAsync: jest.fn(),
}));

beforeEach(async () => {
  // @ts-ignore
  LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

  render(<App />);

  // Since App component is set to authenticate immediately on mount,
  // we need to wait before proceeding to other tests.
  await new Promise((resolve) => setTimeout(resolve, 0));
});

describe("App component", () => {
  test("renders created task", async () => {
    const inputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(inputElem, "Test Task");

    const btnElem = screen.getByText("Add");
    expect(btnElem).toBeOnTheScreen();

    await userEvent.press(btnElem);
    expect(screen.getByText("Test Task")).toBeOnTheScreen();
  });

  test("deletes created task", async () => {
    const inputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(inputElem, "Test Task");

    const addBtnElem = screen.getByText("Add");
    await userEvent.press(addBtnElem);

    const deleteBtnElem = screen.getByTestId("delete-btn-0");
    await userEvent.press(deleteBtnElem);

    expect(screen.queryByTestId("task-item-0")).not.toBeOnTheScreen();
  });

  test("edits the second task", async () => {
    // I created two tasks and this check allows me to be sure that only the second task was modified

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

  test("checks the second task", async () => {
    // I created two tasks and this check allows me to be sure that only the second task was modified

    const taskCreationInputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(taskCreationInputElem, "Test Task 1");

    const addBtnElem = screen.getByText("Add");
    await userEvent.press(addBtnElem);

    await userEvent.type(taskCreationInputElem, "Test Task 2");

    await userEvent.press(addBtnElem);

    const checkboxElem1 = screen.getByTestId("checkbox-1");
    await userEvent.press(checkboxElem1);

    const checkboxElem0 = screen.getByTestId("checkbox-0");

    expect(checkboxElem0).toBeOnTheScreen();
    expect(checkboxElem0.props.accessibilityState.checked).toBeFalsy();

    expect(checkboxElem1).toBeOnTheScreen();
    expect(checkboxElem1.props.accessibilityState.checked).toBeTruthy();
  });
});
