import React from "react";
import ReactDOM from "react-dom";
import Category from "./Category";
import Project from "../Project/Project.js";

it("Renders the Category component", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Project route={{ match: { params: "foo" } }}>
      <Category />
    </Project>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
