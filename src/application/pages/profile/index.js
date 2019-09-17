import React, { Fragment, useContext } from "react";
import { AppContext } from "contexts/app";
import { SectionContentAdminHeader } from "components";

export default () => {
  const { session } = useContext(AppContext);

  return (
    <Fragment>
      <SectionContentAdminHeader title={session.name} />
      profile
    </Fragment>
  );
};
