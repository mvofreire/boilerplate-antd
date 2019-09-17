import React, { Component } from "react";
import { SectionContentAdminHeader, Search } from "components";
import {
  searchTopicByName,
  bindTopicToUser,
  loadUserTopics
} from "services/topico";

export default class TopicoPage extends Component {
  state = {
    dataSource: [],
    topics: []
  };

  componentDidMount() {
    this.loadData();
  }

  onSearch = async value => {
    const { docs } = await searchTopicByName(value);
    return docs.map(x => ({ label: x.name, value: x._id }));
  };

  onSelect = async ({ value }) => {
    try {
      const { status, message } = await bindTopicToUser(value);
      if (status) {
        this.loadData();
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadData = async () => {
    try {
      const topics = await loadUserTopics();
      this.setState({ topics });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { dataSource } = this.state;

    return (
      <React.Fragment>
        <SectionContentAdminHeader title="Topicos" justify="center">
          <Search provider={this.onSearch} onSelect={this.onSelect} />
        </SectionContentAdminHeader>
      </React.Fragment>
    );
  }
}
