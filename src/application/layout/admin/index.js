import React, { Component } from "react";
import { Layout } from "antd";
import "./admin.css";

const { Header, Sider, Content } = Layout;
class LayoutAdmin extends Component {
  state = {
    collapsed: true
  };

  onCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };

  render() {
    const { header, content, sideContent } = this.props;
    return (
      <Layout>
        <Sider
          onCollapse={this.onCollapse}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          {sideContent}
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, display: "flex" }}>
            <div style={{ width: "100%" }}>{header}</div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "calc(100vh - 112px)"
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export { LayoutAdmin };
