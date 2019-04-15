import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item } from "../../../redux/reducers/item";
import { ItemsActions } from "../../../redux/types";
import uuid from "uuid";

export interface IState {
  id: string;
  category: string;
  make: string;
  model: string;
  price: number;
  description: string;
}

export interface IProps {
  onAddItem: Function;
}

// if state type is IState => onChange function type error

class AddItem extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      category: "",
      make: "",
      model: "",
      price: 0,
      description: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value } as IState);
    event.preventDefault();
  }

  onCreateItem(event: any) {
    const { category, make, model, price, description } = this.state;
    let newItem = { id: uuid(), category, make, model, price, description };

    this.props.onAddItem(newItem);
    this.setState({
      category: "",
      make: "",
      model: "",
      price: 0,
      description: ""
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="list-group-item list-group-item-success">
        <form onSubmit={this.onCreateItem}>
          <div className="form-row">
            <select
              className="form-control col-2"
              name="category"
              value={this.state.category}
              onChange={this.onChange}
              required
            >
              <option value="">none</option>
              <option value="guitars">guitars</option>
              <option value="amps">amps</option>
              <option value="other">other</option>
            </select>
            <input
              className="form-control col-2"
              type="text"
              name="make"
              value={this.state.make}
              placeholder="Enter make"
              required
              onChange={this.onChange}
            />
            <input
              className="form-control col-2"
              type="text"
              name="model"
              value={this.state.model}
              placeholder="Enter model"
              required
              onChange={this.onChange}
            />
            <input
              className="form-control col-2"
              type="number"
              name="price"
              value={this.state.price}
              placeholder="Enter price"
              required
              onChange={this.onChange}
            />
            <input
              className="form-control col-2"
              type="text"
              name="description"
              value={this.state.description}
              placeholder="Description"
              required
              onChange={this.onChange}
            />
            <button type="submit" className="btn btn-secondary ml-3">
              Add Item
            </button>
          </div>
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
