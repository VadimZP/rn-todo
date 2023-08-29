import { render, screen, userEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import * as LocalAuthentication from "expo-local-authentication";

import App from "./App";
import React from "react";

jest.mock("expo-local-authentication", () => ({
  authenticateAsync: jest.fn(),
}));

beforeEach(async () => {
  LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

  render(<App />);

  // Since your component is set to authenticate immediately on mount,
  // we need to wait before proceeding to other tests.
  await new Promise((resolve) => setTimeout(resolve, 0));
});

describe("App component", () => {
  /* beforeEach(async () => {
    test("should set isAuthenticated to true on successful authentication", async () => {
      LocalAuthentication.authenticateAsync.mockResolvedValue({
        success: true,
      });

      render(<App />);

      // Since your component is set to authenticate immediately on mount,
      // we need to wait before making assertions.
      await new Promise((resolve) => setTimeout(resolve, 0));

      // If an input with "Add task..." placeholder is visible it means that auth was successful
      const inputElem = screen.getByPlaceholderText("Add task...");
      expect(inputElem).toBeOnTheScreen();
    });
  }); */

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
    const taskCreationInputElem = screen.getByPlaceholderText("Add task...");
    await userEvent.type(taskCreationInputElem, "Test Task 1");
    const addBtnElem = screen.getByText("Add");
    await userEvent.press(addBtnElem);
    await userEvent.type(taskCreationInputElem, "Test Task 2");
    await userEvent.press(addBtnElem);
    const checkboxElem = screen.getByTestId("checkbox-1");
    await userEvent.press(checkboxElem);
    expect(checkboxElem).toHaveProp("value", true);
    expect(checkboxElem).toBeTruthy();
  });
});
