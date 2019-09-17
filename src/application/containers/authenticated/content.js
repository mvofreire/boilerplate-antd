import React, { Fragment } from "react";
import { Route } from "react-router-dom";

export default ({ pages }) => (
  <Fragment>
    {pages.map((page, i) => (
      <Route key={`page-admin-${i}`} {...page} />
    ))}
  </Fragment>
);
