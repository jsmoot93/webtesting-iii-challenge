import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";

import Dashboard from "./Dashboard";

afterEach(cleanup);

describe("Dashboard Tests", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Dashboard />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("renders successfully without crashing", () => {
    render(<Dashboard />);
  });
  it("should render controls and display", () => {
    render(<Dashboard />);

    expect(document.querySelector(".controls")).toBeTruthy();
    expect(document.querySelector(".display")).toBeTruthy();
  });
});
