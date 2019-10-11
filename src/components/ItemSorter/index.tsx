import * as React from "react";
import { doSetFilter } from "../../redux/actions/sort";
import { Dispatch } from "redux";
import { SorterActions } from "../../redux/types";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

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
    return (
      <DropdownButton id="dropdown-item-button" title="Filter">
        <Dropdown.Item
          as="button"
          onClick={() => this.handleFilter("SHOW_ALL")}
        >
          Show all
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => this.handleFilter("SHOW_GUITARS")}
        >
          Guitars
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => this.handleFilter("SHOW_AMPS")}
        >
          Amps
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => this.handleFilter("SHOW_OTHER")}
        >
          Other
        </Dropdown.Item>
      </DropdownButton>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<SorterActions>) => ({
  onSetFilter: (filter: string) => dispatch(doSetFilter(filter))
});

const ConnectedItemSorter = connect(
  null,
  mapDispatchtoProps
)(ItemSorter);

export default ConnectedItemSorter;
