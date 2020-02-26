import * as React from "react";
import { Menu, Select, Button, Pagination, Row, Col } from "antd";
import { SortByActions } from "../../../redux/types";
import { Dispatch } from "redux";
import { doSetSortBy } from "../../../redux/actions/sort";
import { connect } from "react-redux";

const { Option } = Select;

class SortByAndPagination extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  handleChange(value: any) {
    this.handleSortBy(value);
  }

  handleSortBy(sorter: string) {
    this.props.onSortBy(sorter);
  }

  render() {
    return (
      <Row style={{ padding: "10px", background: "#fff" }}>
        <Col span={8}>
          Sort by:{" "}
          <Select
            defaultValue="availability"
            style={{ width: 120 }}
            onChange={this.handleChange}
          >
            <Option value="AVAILABILITY">Availability</Option>
            <Option value="SORT_BY_MAKE">Make</Option>
            <Option value="price">Price</Option>
          </Select>
        </Col>
        <Col span={8}>
          Show:{" "}
          <Select
            defaultValue="show_all"
            style={{ width: 140 }}
            onChange={this.handleChange}
          >
            <Option value="show_all">Show all</Option>
            <Option value="available">Available only</Option>
          </Select>
        </Col>
        <Col span={8}>
          {" "}
          <Pagination size="small" total={50} showSizeChanger />
        </Col>
      </Row>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<SortByActions>) => ({
  onSortBy: (sorter: string) => dispatch(doSetSortBy(sorter))
});

export default connect(null, mapDispatchtoProps)(SortByAndPagination);
