import * as React from "react";
import ConnectedItemViewList from "./components/ItemViewList";
import AlertMessage from "../../components/AlertMessage";

import { Layout, Menu, Icon, Pagination } from "antd";
import "antd/dist/antd.css";
import { FilterActions } from "../../redux/types";
import { Dispatch } from "redux";
import { doSetFilter } from "../../redux/actions/filter";
import { connect } from "react-redux";
import SortByAndPagination from "./components/SortByAndPagination";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.onSetFilter("SHOW_ALL");
  }

  handleFilter(filter: string) {
    this.props.onSetFilter(filter);
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="database" />
                    Filter
                  </span>
                }
              >
                <Menu.Item
                  key="1"
                  onClick={() => this.handleFilter("SHOW_ALL")}
                >
                  All items
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => this.handleFilter("SHOW_GUITARS")}
                >
                  Guitars
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => this.handleFilter("SHOW_AMPS")}
                >
                  Amps
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() => this.handleFilter("SHOW_OTHER")}
                >
                  Other
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ background: "#fff" }}>
            <Content
              style={{
                background: "#4f4f52",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <SortByAndPagination />
              <ConnectedItemViewList />
            </Content>
          </Layout>
        </Layout>
        <AlertMessage />
      </Layout>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<FilterActions>) => ({
  onSetFilter: (filter: string) => dispatch(doSetFilter(filter))
});

export default connect(null, mapDispatchtoProps)(HomePage);
