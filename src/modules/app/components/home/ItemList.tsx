import * as React from "react";
import { connect } from "react-redux";
import { ItemState, Item } from "../../../../redux/reducers/item";

const ItemList: React.FC<ItemState> = state => {
  return (
    <div>
      {state.items.map(item => (
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

const mapStateToProps = (state: ItemState) => ({
  items: state.items,
  error: state.error
});

export default connect(mapStateToProps)(ItemList);
