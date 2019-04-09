import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item } from "../../../redux/reducers/item";
import { ItemsActions } from "../../../redux/types";
import uuid from "uuid";

export interface IState {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface IProps {
  onAddItem: Function;
}

class AddItem extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      name: "",
      price: 0,
      description: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDescrChange = this.onDescrChange.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
  }

  onNameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: event.currentTarget.value });
    event.preventDefault();
  }

  // Reminder: Set proper event type
  onPriceChange(event: any) {
    this.setState({ price: event.target.value });
    event.preventDefault();
  }
  onDescrChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ description: event.currentTarget.value });
    event.preventDefault();
  }

  onCreateItem(event: any) {
    const { name, price, description } = this.state;
    let newItem = { id: uuid(), name, price, description };

    this.props.onAddItem(newItem);
    this.setState({ name: "", price: 0, description: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="list-group-item list-group-item-success">
        <form onSubmit={this.onCreateItem}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter guitar brand"
            required
            onChange={this.onNameChange}
          />
          <input
            type="number"
            name="price"
            value={this.state.price}
            placeholder="Enter price"
            required
            onChange={this.onPriceChange}
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Description"
            required
            onChange={this.onDescrChange}
          />
          <button type="submit" className="btn btn-secondary ml-3">
            Add Item
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<ItemsActions>) => ({
  onAddItem: (item: Item) => dispatch(doAddItem(item))
});

export default connect(
  null,
  mapDispatchtoProps
)(AddItem);
