import React, { Fragment, Component } from "react";
import { SectionContentAdminHeader } from "components";
import { loadDashData } from "services/dashboard";

export default class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const data = await loadDashData();
    console.log(data);
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <SectionContentAdminHeader title="Dashboard" justify="center">
          teste
        </SectionContentAdminHeader>
      </Fragment>
    );
  }
}
