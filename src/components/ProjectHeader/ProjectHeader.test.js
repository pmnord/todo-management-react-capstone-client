import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";

it("Renders the ProjectHeader component", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <ProjectHeader />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
