import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import Controls from "./Controls";
import Dashboard from "../dashboard/Dashboard";

afterEach(cleanup);

describe("Controls Tests", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Controls />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Should render with gate unlocked and proceed through 3 states described for buttons", () => {
    const { getByTestId } = render(<Dashboard />);
    const lockButton = getByTestId("lock-button");
    const openButton = getByTestId("open-button");

    //Initial lock is Lock Gate Disabled, Close Gate Enabled
    expect(lockButton).toHaveTextContent("Lock Gate");
    expect(lockButton).toBeDisabled();
    expect(openButton).toHaveTextContent("Close Gate");
    expect(openButton).not.toBeDisabled();

    //Close the gate
    fireEvent.click(openButton);
    expect(lockButton).toHaveTextContent("Lock Gate");
    expect(lockButton).not.toBeDisabled();
    expect(openButton).toHaveTextContent("Open Gate");
    expect(openButton).not.toBeDisabled();

    //Lock Gate
    fireEvent.click(lockButton);
    expect(lockButton).toHaveTextContent("Unlock Gate");
    expect(lockButton).not.toBeDisabled();
    expect(openButton).toHaveTextContent("Open Gate");
    expect(openButton).toBeDisabled();
  });

  it("Should call correct functions when the open/close or lock button is clicked and buttons are enabled", () => {
    const toggleLockedMock = jest.fn();
    const toggleOpenMock = jest.fn();
    const { getByTestId } = render(
      <Controls
        toggleLocked={toggleLockedMock}
        toggleClosed={toggleOpenMock}
        closed={true}
        locked={false}
      />
    );
    const lockButton = getByTestId("lock-button");
    const openButton = getByTestId("open-button");

    //Expect lock toggle to fire
    fireEvent.click(lockButton);
    expect(toggleLockedMock).toHaveBeenCalledTimes(1);

    //Expect open toggle to fire
    fireEvent.click(openButton);
    expect(toggleOpenMock).toHaveBeenCalledTimes(1);
  });

  it("Should not call any functions while buttons are disabled", () => {
    const toggleLockedMock = jest.fn();
    const toggleOpenMock = jest.fn();
    const { getByTestId } = render(
      <Controls
        toggleLocked={toggleLockedMock}
        toggleClosed={toggleOpenMock}
        closed={false}
        locked={true}
      />
    );
    const lockButton = getByTestId("lock-button");
    const openButton = getByTestId("open-button");

    //Expect lock toggle to do nothing
    fireEvent.click(lockButton);
    expect(toggleLockedMock).toHaveBeenCalledTimes(0);

    //Expect open toggle to do nothing
    fireEvent.click(openButton);
    expect(toggleOpenMock).toHaveBeenCalledTimes(0);
  });
});
