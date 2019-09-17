import React from "react";
import { Layout } from "antd";
import "./public.css";

const { Header, Content, Footer } = Layout;

const LayoutPublic = ({ header, content }) => (
  <Layout>
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="public-logo" />
      {header}
    </Header>
    <Content style={{ padding: "0 50px", marginTop: 64 }}>
      <div
        style={{
          background: "#fff",
          padding: 24,
          minHeight: "calc(100vh - 133px)"
        }}
      >
        {content}
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export { LayoutPublic };
