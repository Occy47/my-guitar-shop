import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item } from "../../../redux/reducers/item";
import { ItemsActions } from "../../../redux/types";
import uuid from "uuid";
import Firebase, { withFirebase } from "../../../firebase";
import { compose } from "recompose";

export interface IState {
  id: string;
  category: string;
  make: string;
  model: string;
  price: number;
  description: string;
  url: string;
  image: any;
}

export interface IProps {
  onAddItem: Function;
  firebase: Firebase;
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
      description: "",
      url:
        "https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/images%2Fno_image_thumb.jpg?alt=media&token=36ff5469-1a5d-47cd-9535-db41e8768387",
      image: null
    };

    this.onChange = this.onChange.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value } as IState);
    event.preventDefault();
  }

  onImageChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ image: newImage });
    }
  }

  handleUpload(event: any) {
    const { image } = this.state;
    this.props.firebase.storage
      .ref(`images/${image.name}`)
      .put(image)
      .then(() => {
        this.props.firebase.storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url: string) => {
            this.setState({ url: url });
          });
      });
    event.preventDefault();
  }

  onCreateItem(event: any) {
    const { category, make, model, price, description, url } = this.state;
    let newItem = {
      id: uuid(),
      category,
      make,
      model,
      price,
      description,
      url
    };

    this.props.onAddItem(newItem);
    this.props.firebase.item(newItem.id).set({
      category,
      make,
      model,
      price,
      description,
      url
    });
    this.setState({
      category: "",
      make: "",
      model: "",
      price: 0,
      description: "",
      url: "",
      image: null
    });
    event.preventDefault();
  }

  render() {
    const isInvalid = this.state.image === null ? true : false;
    return (
      <div className="list-group-item list-group-item-success">
        <h5>Add item: </h5>
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
            <input
              className="form-control col-2"
              type="file"
              name="file"
              onChange={this.onImageChange}
            />
            <button onClick={this.handleUpload} disabled={isInvalid}>
              Upload image
            </button>
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

export default compose(
  connect(
    null,
    mapDispatchtoProps
  ),
  withFirebase
)(AddItem);
