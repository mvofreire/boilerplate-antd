import React from "react";
import { Typography, Row, Col } from "antd";
const { Title } = Typography;

export default ({ data = {} }) => {
  return (
    <Row type="flex">
      <Col xs={18}>{data.descricao && data.descricao.join(" ")}</Col>
      <Col xs={6}>{data.codigoUASG}</Col>
    </Row>
  );
};
