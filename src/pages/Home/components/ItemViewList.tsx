import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { ItemsState } from "../../../redux/reducers/item";
import ItemViewCard from "./ItemViewCard";

class ItemViewList extends React.Component<ItemsState, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { items } = this.props;
    return (
      <div className="row">
        {items.map(item => (
          <ItemViewCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.itemsState.items
});

const ConnectedItemViewList = connect(mapStateToProps)(ItemViewList);

export default ConnectedItemViewList;
