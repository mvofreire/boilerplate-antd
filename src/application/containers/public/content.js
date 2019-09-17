import React, { Fragment } from "react";
import { Route } from "react-router-dom";

export const Content = ({ pages }) => (
  <Fragment>
    {pages.map((page, i) => (
      <Route key={`page-${i}`} {...page} />
    ))}
  </Fragment>
);
