import * as React from "react";
import { doSetFilter } from "../../redux/actions/sort";
import { Dispatch } from "redux";
import { SorterActions } from "../../redux/types";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

class ItemSorter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.onSetFilter("SHOW_ALL");
  }

  onChange(event: any) {
    this.props.onSetFilter(event.currentTarget.value);
  }

  render() {
    return (
      <div className="input-group mb-3 w-25">
        <div className="input-group-prepend">
          <label className="input-group-text">Filter</label>
        </div>
        <select className="custom-select" onChange={this.onChange}>
          <option value="SHOW_ALL">Show all</option>
          <option value="SHOW_GUITARS">Guitars</option>
          <option value="SHOW_AMPS">Amps</option>
          <option value="SHOW_OTHER">Other</option>
        </select>
      </div>
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
