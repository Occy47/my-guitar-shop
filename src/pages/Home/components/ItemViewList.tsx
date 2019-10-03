import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootState, ItemsActions } from "../../../redux/types";
import { connect } from "react-redux";
import { ItemsState, Item } from "../../../redux/reducers/item";
import ItemViewCard from "./ItemViewCard";
import getSortedItems from "../../../redux/selectors";

class ItemViewList extends React.Component<any, ItemsState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { items } = this.props;
    return (
      <div className="row">
        {items.map((item: Item) => (
          <ItemViewCard
            key={item.id}
            id={item.id}
            make={item.make}
            model={item.model}
            price={item.price}
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: getSortedItems(state)
});

const ConnectedItemViewList = connect(mapStateToProps)(ItemViewList);

export default ConnectedItemViewList;
