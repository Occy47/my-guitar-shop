import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doDeleteItem, doUpdateItem } from "../../../redux/actions/item";
import { ItemsState, Item } from "../../../redux/reducers/item";
import { RootState, ItemsActions } from "../../../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";

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
  id: string;
  name: string;
  price: number;
  description: string;
  onDeleteItem: Function;
  onUpdateItem: Function;
};

class ItemComponent extends React.Component<ItemProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEditing: false,
      id: "",
      name: "",
      price: 0,
      description: ""
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleStartEditClick = this.handleStartEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFinishEditClick = this.handleFinishEditClick.bind(this);
  }
  handleDeleteClick(event: any) {
    const { id, name, description, price } = this.props;
    const item = { id, name, description, price };

    this.props.onDeleteItem(item);
    event.preventDefault();
  }

  handleStartEditClick(event: any) {
    const { id, name, description, price } = this.props;
    this.setState({
      isEditing: !this.state.isEditing,
      id: id,
      name: name,
      price: price,
      description: description
    });
    event.preventDefault();
  }

  handleFinishEditClick(event: any) {
    const { id, name, description, price } = this.state;
    let item = { id, name, description, price };
    this.props.onUpdateItem(item);

    this.setState({ isEditing: !this.state.isEditing });
    event.preventDefault();
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {this.state.isEditing ? (
          <form className="list-group-item list-group-item-primary">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <button
              type="button"
              className="btn btn-primary ml-1"
              onClick={this.handleFinishEditClick}
            >
              Save
            </button>
          </form>
        ) : (
          <div className="list-group-item list-group-item-primary">
            <span>Brand: {this.props.name} </span>
            <span>Price: {this.props.price}kn </span>
            <span>Description: {this.props.description} </span>
            <span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleStartEditClick}
              >
                Edit
              </button>
            </span>
            <span>
              <button
                type="button"
                className="btn btn-primary ml-1"
                onClick={this.handleDeleteClick}
              >
                Delete
              </button>
            </span>
          </div>
        )}
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
  onDeleteItem: (item: Item) => dispatch(doDeleteItem(item)),
  onUpdateItem: (item: Item) => dispatch(doUpdateItem(item))
});

const ConnectedItemsList = connect(mapStateToProps)(ItemList);

const ConnectedItemComponent = connect(
  null,
  mapDispatchtoProps
)(ItemComponent);

export default ConnectedItemsList;
