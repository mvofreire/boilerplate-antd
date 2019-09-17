import React, { PureComponent } from "react";
import { privatePages } from "application/pages";
import { LayoutAdmin } from "application/layout";
import { AppContext } from "contexts/app";
import { Menu, findMenuByPath } from "components";
import { Modal } from "antd";
import Header from "./header";
import Content from "./content";
import menus from "./menus";

export default class AuthenticatedPage extends PureComponent {
  static contextType = AppContext;

  constructor(p) {
    super(p);
    const { location } = this.props;
    this.state = {
      activeMenuKey: [findMenuByPath(location.pathname, menus).key],
      modalVisible: false
    };
    this.unlistenHistory = null;
  }
  componentDidMount() {
    const { history } = this.props;
    this.unlistenHistory = history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unlistenHistory && this.unlistenHistory();
  }

  handleLocationChange = ({ pathname }) => {
    this.setActiveMenu(findMenuByPath(pathname, menus).key);
  };

  setActiveMenu = key => {
    this.setState({
      activeMenuKey: typeof key === "undefined" ? [""] : [key]
    });
  };

  onLogoutClick = () => {
    console.log("logout");
    this.setState({
      modalVisible: true
    });
  };

  onLogout = () => {
    const { history } = this.props;
    this.context.logout();
    history.entries = [];
    history.index = -1;
    history.push("/login");
  };

  goTo = route => () => {
    const { history } = this.props;
    history.push(`/admin/${route}`);
  };

  onClickMenu = item => {
    const { history } = this.props;

    history.push(item.path);
  };

  render() {
    const { activeMenuKey, modalVisible } = this.state;
    return (
      <React.Fragment>
        <LayoutAdmin
          sideContent={
            <Menu
              menus={menus}
              onClickMenu={this.onClickMenu}
              menuOptions={{
                defaultSelectedKeys: activeMenuKey
              }}
            />
          }
          header={
            <Header onLogoutClick={this.onLogoutClick} goTo={this.goTo} />
          }
          content={<Content pages={privatePages} />}
        />
        <Modal
          title="=("
          centered
          visible={modalVisible}
          onOk={this.onLogout}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <p>Deseja realmente sair do sistema?</p>
        </Modal>
      </React.Fragment>
    );
  }
}
