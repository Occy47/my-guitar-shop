import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item } from "../../../redux/reducers/item";
import { ItemsActions } from "../../../redux/types";
import uuid from "uuid";
import Firebase, { withFirebase } from "../../../firebase";
import { compose } from "recompose";
import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";

export interface IState {
  id: string;
  category: string;
  make: string;
  model: string;
  price: string;
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
      price: "0",
      description: "",
      url:
        "https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/thumbnails%2Fno_image_thumb.jpg?alt=media&token=9602f73e-b066-4069-a040-457a30e26fb4",
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
      .ref(`thumbnails/${image.name}`)
      .put(image)
      .then(() => {
        this.props.firebase.storage
          .ref("thumbnails")
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
      price: "0",
      description: "",
      url: "",
      image: null
    });
    event.preventDefault();
  }

  render() {
    const isInvalid = this.state.image === null ? true : false;
    return (
      <Form
        className="list-group-item list-group-item-success"
        onSubmit={this.onCreateItem}
      >
        <h5>Add item: </h5>
        <Form.Row>
          <Col>
            <Form.Control as="select" name="category" onChange={this.onChange}>
              <option value="">category</option>
              <option value="guitars">guitars</option>
              <option value="amps">amps</option>
              <option value="other">other</option>
            </Form.Control>
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="make"
              onChange={this.onChange}
              placeholder="Make"
              required
            />
          </Col>
          <Col>
            <Form.Control
              as="input"
              type="text"
              name="model"
              onChange={this.onChange}
              required
              placeholder="Model"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              name="price"
              onChange={this.onChange}
              placeholder="Price"
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              name="description"
              onChange={this.onChange}
              required
              placeholder="Description"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              name="file"
              type="file"
              onChange={this.onImageChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isInvalid}
              onClick={this.handleUpload}
            >
              Upload image
            </Button>
          </Col>
        </Form.Row>
        <Button variant="primary" type="submit">
          Add item
        </Button>
      </Form>
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
