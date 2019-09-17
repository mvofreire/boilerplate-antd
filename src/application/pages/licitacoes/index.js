import React, { Component, Fragment } from "react";
import { SectionContentAdminHeader, InfiniteList } from "components";
import { AppContext } from "contexts/app";
import { Button, Tag, List, Skeleton, Avatar, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import { loadLicitacoes } from "services/licitacoes";
import { Typography } from "antd";

const { Paragraph } = Typography;
class LicitacoesPage extends Component {
  static contextType = AppContext;
  state = {
    error: false,
    favorites: []
  };

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = this.context.session.getFavoritesIDs();
    this.setState({ favorites });
  }

  loadData = async (page, limit) => {
    const { filters } = this.state;
    try {
      return loadLicitacoes(filters, page, limit);
    } catch (error) {
      this.setState({ error });
    }
  };

  toggleFavorite = item => async () => {
    const { favorites } = this.state;

    const inFavorites = favorites.indexOf(item._id) > -1;
    if (inFavorites) {
      this.removeFavorite(item);
    } else {
      this.saveFavorite(item);
    }
  };

  saveFavorite = async item => {
    const { _id } = item;

    try {
      await this.context.session.addFavorite(_id);
      const favorites = this.context.session.getFavoritesIDs();
      this.setState({ favorites });
    } catch (error) {
      this.setState({ error });
    }
  };

  removeFavorite = async item => {
    const { _id } = item;

    try {
      await this.context.session.removeFavorite(_id);
      const favorites = this.context.session.getFavoritesIDs();
      this.setState({ favorites });
    } catch (error) {
      this.setState({ error });
    }
  };

  goToFavorites = () => {
    const { history } = this.props;

    history.push("/admin/favorites");
  };

  renderItemList = item => {
    const { favorites } = this.state;
    const inFavorites = favorites.indexOf(item._id) > -1;

    return (
      <List.Item
        style={{
          paddingLeft: 10,
          boxShadow: "inset 4px 0px 0px 0px red"
        }}
        actions={[
          <Link to={`/admin/licitacao-detail/${item._id}`}>Saiba mais</Link>,
          <Icon
            onClick={this.toggleFavorite(item)}
            type="heart"
            style={{
              color: inFavorites ? "red" : "gray"
            }}
            theme={inFavorites ? "filled" : ""}
          />
        ]}
      >
        <Skeleton avatar title={false} loading={item.loading} active>
          <List.Item.Meta
            avatar={<Avatar icon="file" size="large" />}
            title={
              <Link to={`/admin/licitacao-detail/${item._id}`}>
                {item.objeto.titulo}
              </Link>
            }
            description={item.objeto.descricao}
          />
          <div>
            <Tag color="red">Itens - {item.itens.length}</Tag>
            <Tag color="blue">UASG {item.contratante.codigoUASG}</Tag>
          </div>
        </Skeleton>
      </List.Item>
    );
  };

  render() {
    return (
      <Fragment>
        <SectionContentAdminHeader title="Licitações">
          <Link to="/admin/favorites">
            <Button style={{ float: "right" }}>
              <Icon
                type="heart"
                style={{
                  color: "red"
                }}
              />
            </Button>
          </Link>
        </SectionContentAdminHeader>
        <Row>
          <Col span={24}>
            <InfiniteList
              provider={this.loadData}
              renderItem={this.renderItemList}
              fakeObj={{ objeto: {}, itens: {}, contratante: {} }}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default LicitacoesPage;
