import * as React from "react";
import { connect } from "react-redux";
import { doAddItem } from "../../../../redux/actions/item";
import { Item } from "../../../../redux/reducers/item";

export interface IState {
  name: string;
  price: number;
  description: string;
}

export interface IProps {}

class AddItem extends React.Component<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      description: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDescrChange = this.onDescrChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onNameChange(event: any) {
    this.setState({ name: event.target.value });
    event.preventDefault();
  }
  onPriceChange(event: any) {
    this.setState({ price: event.target.value });
    event.preventDefault();
  }
  onDescrChange(event: any) {
    this.setState({ description: event.target.value });
    event.preventDefault();
  }

  onAddItem() {
    const { name, price, description } = this.state;
    const newItem = { name, price, description };
    return { newItem };
  }

  render() {
    return (
      <div>
        <input type="text" name="name" onChange={this.onNameChange} />
        <input type="text" name="price" onChange={this.onPriceChange} />
        <input type="text" name="description" onChange={this.onDescrChange} />
        <button onClick={this.onAddItem}>Add Item</button>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch: any) => ({
  onAddItem: (item: Item) => dispatch(doAddItem(item))
});

export default connect(
  null,
  mapDispatchtoProps
)(AddItem);
