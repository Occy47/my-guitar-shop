import * as React from "react";
import { connect } from "react-redux";
import { ItemsState, Item } from "../../../redux/reducers/item";
import rootReducer from "../../../redux/reducers";
import { StateType } from "typesafe-actions";

export type RootState = StateType<typeof rootReducer>;

const ItemList: React.FC<ItemsState> = props => {
  const { items } = props;

  return (
    <div>
      {items.map(item => (
        <ItemComp
          name={item.name}
          price={item.price}
          description={item.description}
        />
      ))}
    </div>
  );
};

const ItemComp = (props: Item) => (
  <div>
    <span>{props.name}</span>
    <span>{props.price}</span>
    <span>{props.description}</span>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  items: state.itemsState.items
});

const ConnectedItemsList = connect(mapStateToProps)(ItemList);

export default ConnectedItemsList;
