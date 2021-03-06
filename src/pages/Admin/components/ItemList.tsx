import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doDeleteItem, doUpdateItem } from "../../../redux/actions/item";
import { ItemsState, Item } from "../../../redux/reducers/item";
import { RootState, ItemsActions } from "../../../redux/types";
import { getSortedAndFilteredItems } from "../../../redux/selectors";
import Firebase, { withFirebase } from "../../../firebase";
import { compose } from "recompose";
import ConnectedItemSorter from "../../../components/ItemSorter";

import { List, Select, Button, Input } from "antd";
const { Option } = Select;

const ItemList: React.FC<ItemsState> = (props) => {
  const { items } = props;
  return (
    <div>
      <h5>Items: </h5>
      <ConnectedItemSorter />
      <List style={{ background: "#676767", padding: 6 }}>
        {items.map((item) => (
          <ConnectedItemComponent
            key={item.id}
            id={item.id}
            category={item.category}
            make={item.make}
            model={item.model}
            price={item.price}
            description={item.description}
          />
        ))}
      </List>
    </div>
  );
};

type ItemProps = {
  id: string;
  category: string;
  make: string;
  model: string;
  price: number;
  description: string;
  onDeleteItem: Function;
  onUpdateItem: Function;
  firebase: Firebase;
};

class ItemComponent extends React.Component<ItemProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEditing: false,
      id: "",
      category: "",
      make: "",
      model: "",
      price: 0,
      description: "",
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleStartEditClick = this.handleStartEditClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleFinishEditClick = this.handleFinishEditClick.bind(this);
  }

  handleDeleteClick(event: any) {
    const { id, category, make, model, description, price } = this.props;
    const item = { id, category, make, model, description, price };

    this.props.onDeleteItem(item);
    this.props.firebase.item(item.id).remove();
    event.preventDefault();
  }

  handleStartEditClick(event: any) {
    const { id, category, make, model, description, price } = this.props;
    this.setState({
      isEditing: !this.state.isEditing,
      id: id,
      category: category,
      make: make,
      model: model,
      price: price,
      description: description,
    });
    event.preventDefault();
  }

  handleFinishEditClick(event: any) {
    const { id, category, make, model, description, price } = this.state;
    let item = { id, category, make, model, description, price };
    this.props.onUpdateItem(item);
    this.props.firebase
      .item(item.id)
      .update({ category, make, model, description, price });

    this.setState({ isEditing: !this.state.isEditing });
    event.preventDefault();
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  }

  onSelect(value: string) {
    this.setState({ category: value });
  }

  render() {
    return (
      <div>
        {this.state.isEditing ? (
          <List.Item style={{ border: "#8c8c8c solid 1px" }}>
            <Select
              placeholder="Select a category"
              onChange={this.onSelect}
              style={{ width: 180, margin: 2 }}
            >
              <Option value="">none</Option>
              <Option value="guitars">guitars</Option>
              <Option value="amps">amps</Option>
              <Option value="other">other</Option>
            </Select>
            <Input
              type="text"
              name="make"
              value={this.state.make}
              onChange={this.onChange}
              style={{ width: 200 }}
            />
            <Input
              type="text"
              name="model"
              value={this.state.model}
              onChange={this.onChange}
              style={{ width: 200 }}
            />
            <Input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              style={{ width: 200 }}
            />
            <Input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              onClick={this.handleFinishEditClick}
              style={{ margin: 6 }}
            >
              Save
            </Button>
          </List.Item>
        ) : (
          <List.Item style={{ border: "#8c8c8c solid 1px" }}>
            <span>
              <strong>Category: </strong> {this.props.category}{" "}
            </span>
            <span>
              <strong>Brand: </strong> {this.props.make}{" "}
            </span>
            <span>
              <strong>Model: </strong>
              {this.props.model}{" "}
            </span>
            <span>
              <strong>Price: </strong>
              {this.props.price}kn{" "}
            </span>
            <span>
              <strong>Description: </strong>
              {this.props.description}{" "}
            </span>
            <span>
              <Button
                type="primary"
                onClick={this.handleStartEditClick}
                style={{ margin: 3 }}
              >
                Edit
              </Button>
              <Button
                type="danger"
                onClick={this.handleDeleteClick}
                style={{ margin: 6 }}
              >
                Delete
              </Button>
            </span>
          </List.Item>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: getSortedAndFilteredItems(state),
});

const mapDispatchtoProps = (dispatch: Dispatch<ItemsActions>) => ({
  onDeleteItem: (item: Item) => dispatch(doDeleteItem(item)),
  onUpdateItem: (item: Item) => dispatch(doUpdateItem(item)),
});

const ConnectedItemsList = connect(mapStateToProps)(ItemList);

const ConnectedItemComponent: React.ComponentClass<any> = compose(
  connect(null, mapDispatchtoProps),
  withFirebase
)(ItemComponent);

export default ConnectedItemsList;
