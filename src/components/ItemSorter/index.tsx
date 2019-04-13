import * as React from "react";
import { doSetFilter } from "../../redux/actions/sort";
import { Dispatch } from "redux";
import { SorterActions } from "../../redux/types";
import { connect } from "react-redux";

class ItemSorter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event: any) {
    this.props.onSetFilter(event.currentTarget.value);
  }

  render() {
    return (
      <div>
        <select onChange={this.onChange}>
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
