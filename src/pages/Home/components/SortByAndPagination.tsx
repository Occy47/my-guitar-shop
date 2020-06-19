import * as React from "react";
import { Select, Pagination, Row, Col } from "antd";
import { SortByActions, PaginationActions } from "../../../redux/types";
import { Dispatch } from "redux";
import { doSetSortBy } from "../../../redux/actions/sort";
import { connect } from "react-redux";
import { doSetPagination } from "../../../redux/actions/pagination";

const { Option } = Select;

class SortByAndPagination extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 4,
      offset: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange(value: any) {
    this.handleSortBy(value);
  }

  handleSortBy(sorter: string) {
    this.props.onSortBy(sorter);
  }

  onChange = (currentPage: any, itemsPerPage: any) => {
    var offset = currentPage * itemsPerPage - itemsPerPage;
    var pagination = { pagination: { currentPage, itemsPerPage, offset } };

    this.props.onSetPagination(pagination);
    this.setState({
      currentPage: currentPage,
      offset: offset,
      itemsPerPage: itemsPerPage,
    });
  };

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
            <Option value="SORT_BY_PRICE">Price</Option>
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
          <Pagination
            size="small"
            onChange={this.onChange}
            showSizeChanger={true}
            pageSizeOptions={["4", "8"]}
            defaultPageSize={4}
            total={15}
          />
        </Col>
      </Row>
    );
  }
}

const mapDispatchtoProps = (
  dispatch: Dispatch<SortByActions | PaginationActions>
) => ({
  onSortBy: (sorter: string) => dispatch(doSetSortBy(sorter)),
  onSetPagination: (pagination: object) =>
    dispatch(doSetPagination(pagination)),
});

export default connect(null, mapDispatchtoProps)(SortByAndPagination);
