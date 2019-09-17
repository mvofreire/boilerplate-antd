import React, { Component, Fragment } from "react";
import { SectionContentAdminHeader } from "components";
import { AppContext } from "contexts/app";
import { Tag, List, Skeleton, Avatar } from "antd";
import { loadFavorites } from "services/user";
import { formatToPTBR } from "util/date";
import { Link } from "react-router-dom";

class FavoritesPage extends Component {
  static contextType = AppContext;

  state = {
    filters: {},
    error: false,
    data: []
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { filters } = this.state;
    try {
      this.setState({ loading: true });
      const { docs } = await loadFavorites(filters);
      this.setState({ data: docs, loading: false });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { data, loading } = this.state;

    return (
      <Fragment>
        <SectionContentAdminHeader title="Favoritos" />
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => {
            return (
              <List.Item
                style={{
                  paddingLeft: 10,
                  boxShadow: "inset 4px 0px 0px 0px red"
                }}
                actions={[
                  <Link to={`/admin/licitacao-detail/${item.reference._id}`}>
                    Saiba mais
                  </Link>
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" size="large" />}
                    title={
                      <span>
                        <a href="https://ant.design">
                          {item.reference.objeto.titulo}
                        </a>
                        <Tag color="#ddd">{formatToPTBR(item.data)}</Tag>
                      </span>
                    }
                    description={item.reference.objeto.descricao}
                  />
                  <div>
                    <Tag color="red">Itens - {item.reference.itens.length}</Tag>
                    <Tag color="green">
                      Inicio {item.reference.objeto.periodoInicio}
                    </Tag>
                    <Tag color="blue">
                      UASG {item.reference.contratante.codigoUASG}
                    </Tag>
                  </div>
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </Fragment>
    );
  }
}

export default FavoritesPage;
