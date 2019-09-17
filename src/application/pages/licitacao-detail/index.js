import React, { Component, Fragment } from "react";
import { loadLicitacao } from "services/licitacoes";
import { Spin, Tag, Row, Col } from "antd";
import { SectionContentAdminHeader } from "components";

import Contratante from "./contratante";
import Objeto from "./objeto";
import Itens from "./itens";

class LicitacaoDetail extends Component {
  state = {
    loading: false,
    data: {}
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const { id } = this.props.match.params;

      this.setState({ loading: true });
      const data = await loadLicitacao(id);
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { data, loading } = this.state;
    const { objeto, itens, contratante, topics } = data;

    return (
      <Fragment>
        <SectionContentAdminHeader
          title="Detalhes de Licitação"
          backButton={true}
        />
        <Spin size="large" spinning={loading} />
        <Objeto {...objeto} topics={["tipo1", "categoria2"]} />
        <Row type="flex">
          <Col xs={24}>
            <Contratante {...contratante} />
          </Col>
        </Row>
        <Row type="flex">
          <Col xs={24}>
            <Itens data={itens} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default LicitacaoDetail;
