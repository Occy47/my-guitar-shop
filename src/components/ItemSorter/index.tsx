import * as React from "react";
import { doSetFilter } from "../../redux/actions/filter";
import { Dispatch } from "redux";
import { FilterActions } from "../../redux/types";
import { connect } from "react-redux";

import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

class ItemSorter extends React.Component<any, any> {
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
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => this.handleFilter("SHOW_ALL")}>
          Show all
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.handleFilter("SHOW_GUITARS")}>
          Guitars
        </Menu.Item>
        <Menu.Item key="3" onClick={() => this.handleFilter("SHOW_AMPS")}>
          Amps
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button style={{ margin: 6 }} ghost>
          Filter
          <DownOutlined translate="" />
        </Button>
      </Dropdown>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<FilterActions>) => ({
  onSetFilter: (filter: string) => dispatch(doSetFilter(filter)),
});

const ConnectedItemSorter = connect(null, mapDispatchtoProps)(ItemSorter);

export default ConnectedItemSorter;
