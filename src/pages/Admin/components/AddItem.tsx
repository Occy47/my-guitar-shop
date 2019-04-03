import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item, ItemsActions } from "../../../redux/reducers/item";

export interface IState {
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
      name: "",
      price: 0,
      description: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDescrChange = this.onDescrChange.bind(this);
  }

  onNameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: event.currentTarget.value });
    event.preventDefault();
  }

  // Set proper event type
  onPriceChange(event: any) {
    this.setState({ price: event.target.value });
    event.preventDefault();
  }
  onDescrChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ description: event.currentTarget.value });
    event.preventDefault();
  }

  render() {
    const { name, price, description } = this.state;
    const newItem = { name, price, description };
    const { onAddItem } = this.props;
    console.log(newItem);
    return (
      <div>
        <input type="text" name="name" onChange={this.onNameChange} />
        <input type="number" name="price" onChange={this.onPriceChange} />
        <input type="text" name="description" onChange={this.onDescrChange} />
        <button onClick={() => onAddItem(newItem)}>Add Item</button>
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
