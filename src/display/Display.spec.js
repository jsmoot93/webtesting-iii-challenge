import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import Dashboard from "../dashboard/Dashboard";
import Display from "./Display";

afterEach(cleanup);

describe("Display Tests", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Display />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Should display proper colors and text for each of the 3 states", () => {
    const { getByTestId } = render(<Dashboard />);
    const lockButton = getByTestId("lock-button");
    const openButton = getByTestId("open-button");
    const lockedLed = getByTestId("locked-led");
    const closedLed = getByTestId("closed-led");

    //Initially green and Unlocked/Open
    expect(lockedLed).toHaveTextContent("Unlocked");
    expect(lockedLed).toHaveClass("green-led");
    expect(closedLed).toHaveTextContent("Open");
    expect(closedLed).toHaveClass("green-led");

    //Closed gate should turn closed led red and text closed
    fireEvent.click(openButton);
    expect(lockedLed).toHaveTextContent("Unlocked");
    expect(lockedLed).toHaveClass("green-led");
    expect(closedLed).toHaveClass("red-led");
    expect(closedLed).toHaveTextContent("Closed");

    //Locking gate should change unlocked to red and text locked
    fireEvent.click(lockButton);
    expect(lockedLed).toHaveTextContent("Locked");
    expect(lockedLed).toHaveClass("red-led");
    expect(closedLed).toHaveClass("red-led");
    expect(closedLed).toHaveTextContent("Closed");
  });
});
