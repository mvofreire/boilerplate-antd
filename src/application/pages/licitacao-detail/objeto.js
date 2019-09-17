import React, { Fragment } from "react";
import { Typography, Row, Col, Button, Tag, Icon, Card } from "antd";
const { Title, Paragraph, Text } = Typography;

export default ({
  titulo,
  descricao = "",
  topics = [],
  limitEntrega = null,
  preiodoInicio = []
}) => {
  return (
    <Fragment>
      <Row type="flex">
        <Col xs={24}>
          <Title level={3}>{titulo}</Title>
        </Col>
      </Row>
      <Row type="flex" align="middle" style={{ margin: "15px 0px" }}>
        <Col xs={18}>
          {topics.map(topic => (
            <Tag color="red">{topic}</Tag>
          ))}
        </Col>
        <Col xs={6}>
          <Button type="primary" style={{ float: "right" }}>
            <Icon type="download" />
            Ver documentos
          </Button>
        </Col>
      </Row>
      <Row type="flex" style={{ margin: "15px 0px" }}>
        <Col xs={18}>
          <Text>{descricao}</Text>
        </Col>
        <Col xs={6}>
          <Card title="Limite" style={{ marginBottom: 15 }}>
            <p>{limitEntrega}</p>
          </Card>
          <Card title="Periodo de atendimento">
            <p>{preiodoInicio.join(" - ")}</p>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
