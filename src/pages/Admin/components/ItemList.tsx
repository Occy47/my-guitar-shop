import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doDeleteItem } from "../../../redux/actions/item";
import { ItemsState, Item } from "../../../redux/reducers/item";
import { RootState, ItemsActions } from "../../../redux/types";

const ItemList: React.FC<ItemsState> = props => {
  const { items } = props;
  return (
    <div>
      {items.map(item => (
        <ConnectedItemComponent
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
        />
      ))}
    </div>
  );
};

type ItemProps = {
  item: Item;
  onDeleteItem: Function;
};

class ItemComponent extends React.Component<ItemProps | any, any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event: any) {
    const { id, name, description, price } = this.props;
    const item = { id, name, description, price };

    this.props.onDeleteItem(item);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <span>Brand: {this.props.name} </span>
        <span>Price: {this.props.price}kn </span>
        <span>Description: {this.props.description} </span>
        <span>
          <button>Edit</button>
        </span>
        <span>
          <button onClick={this.handleClick}>Delete</button>
        </span>
      </div>
    );
  }
}

// Parrent component connected to State => child component
// connected to Props ??!

const mapStateToProps = (state: RootState) => ({
  items: state.itemsState.items
});

const mapDispatchtoProps = (dispatch: Dispatch<ItemsActions>) => ({
  onDeleteItem: (item: Item) => dispatch(doDeleteItem(item))
});

const ConnectedItemsList = connect(mapStateToProps)(ItemList);

const ConnectedItemComponent = connect(
  null,
  mapDispatchtoProps
)(ItemComponent);

export default ConnectedItemsList;
