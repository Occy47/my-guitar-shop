import * as React from "react";
import { connect } from "react-redux";
import { ItemsState, Item } from "../../../../redux/reducers/item";

const ItemList = (props: ItemsState) => {
  console.log(props.items);
  return (
    <div>
      {props.items.map((item: Item) => {
        <ItemComp
          name={item.name}
          price={item.price}
          description={item.description}
        />;
      })}
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

const mapStateToProps = (state: ItemsState) => ({
  items: state.items
});

export default connect(mapStateToProps)(ItemList);
