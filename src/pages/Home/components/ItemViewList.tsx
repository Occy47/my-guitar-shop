import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";
import { ItemsState, Item } from "../../../redux/reducers/item";
import ItemViewCard from "./ItemViewCard";
import { getPaginatedSortedAndFilteredItems } from "../../../redux/selectors";

import { Spin } from "antd";

class ItemViewList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { items } = this.props;
    const { isLoading } = this.state;
    console.log("items: " + isLoading);
    return (
      <div className="container">
        {!isLoading ? (
          <div className="row">
            {items.map((item: Item) => (
              <ItemViewCard
                key={item.id}
                id={item.id}
                make={item.make}
                model={item.model}
                price={item.price}
                description={item.description}
                thumbUrl={item.thumbUrl}
                images={item.images}
              />
            ))}
          </div>
        ) : (
          <Spin size="large" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: getPaginatedSortedAndFilteredItems(state),
});

const ConnectedItemViewList = connect(mapStateToProps)(ItemViewList);

export default ConnectedItemViewList;
