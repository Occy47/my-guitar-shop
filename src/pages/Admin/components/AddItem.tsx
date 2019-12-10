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
  thumbUrl: string;
  imageOneUrl: string;
  imageTwoUrl: string;
  imageThreeUrl: string;
  thumbnail: any;
  imageOne: any;
  imageTwo: any;
  imageThree: any;
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
      id: uuid(),
      category: "",
      make: "",
      model: "",
      price: "0",
      description: "",
      thumbUrl:
        "https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/thumbnails%2Fno_thumbnail_thumb.jpg?alt=media&token=9602f73e-b066-4069-a040-457a30e26fb4",
      imageOneUrl: "",
      imageTwoUrl: "",
      imageThreeUrl: "",
      thumbnail: null,
      imageOne: null,
      imageTwo: null,
      imageThree: null
    };

    this.onChange = this.onChange.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onThumbnailChange = this.onThumbnailChange.bind(this);
    this.handleThumbnailUpload = this.handleThumbnailUpload.bind(this);
    this.onImageOneChange = this.onImageOneChange.bind(this);
    this.onImageTwoChange = this.onImageTwoChange.bind(this);
    this.onImageThreeChange = this.onImageThreeChange.bind(this);
    this.handleImageOneUpload = this.handleImageOneUpload.bind(this);
    this.handleImageTwoUpload = this.handleImageTwoUpload.bind(this);
    this.handleImageThreeUpload = this.handleImageThreeUpload.bind(this);
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value } as IState);
    event.preventDefault();
  }

  onThumbnailChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ thumbnail: newImage });
    }
  }

  handleThumbnailUpload(event: any) {
    const { thumbnail } = this.state;
    this.props.firebase.storage
      .ref(`thumbnails/${thumbnail.name}`)
      .put(thumbnail)
      .then(() => {
        this.props.firebase.storage
          .ref("thumbnails")
          .child(thumbnail.name)
          .getDownloadURL()
          .then((url: string) => {
            this.setState({ thumbUrl: url });
          });
      });
    event.preventDefault();
  }

  onImageOneChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ imageOne: newImage });
    }
  }

  handleImageOneUpload(event: any) {
    const { imageOne, id } = this.state;
    this.props.firebase.storage
      .ref(`images/${id}/${imageOne.name}`)
      .put(imageOne)
      .then(() => {
        this.props.firebase.storage
          .ref(`images/${id}`)
          .child(imageOne.name)
          .getDownloadURL()
          .then((url: string) => {
            this.setState({ imageOneUrl: url });
          });
      });
  }

  onImageTwoChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ imageTwo: newImage });
    }
  }

  handleImageTwoUpload() {
    const { imageTwo, id } = this.state;
    this.props.firebase.storage
      .ref(`images/${id}/${imageTwo.name}`)
      .put(imageTwo)
      .then(() => {
        this.props.firebase.storage
          .ref(`images/${id}`)
          .child(imageTwo.name)
          .getDownloadURL()
          .then((url: string) => {
            this.setState({ imageTwoUrl: url });
          });
      });
  }

  onImageThreeChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ imageThree: newImage });
    }
  }

  handleImageThreeUpload() {
    const { imageThree, id } = this.state;
    this.props.firebase.storage
      .ref(`images/${id}/${imageThree.name}`)
      .put(imageThree)
      .then(() => {
        this.props.firebase.storage
          .ref(`images/${id}`)
          .child(imageThree.name)
          .getDownloadURL()
          .then((url: string) => {
            this.setState({ imageThreeUrl: url });
          });
      });
  }

  onCreateItem(event: any) {
    const {
      id,
      category,
      make,
      model,
      price,
      description,
      thumbUrl,
      imageOneUrl,
      imageTwoUrl,
      imageThreeUrl
    } = this.state;
    let newItem = {
      id,
      category,
      make,
      model,
      price,
      description,
      thumbUrl,
      images: { imageOneUrl, imageTwoUrl, imageThreeUrl }
    };

    this.props.onAddItem(newItem);
    this.props.firebase.item(newItem.id).set({
      category,
      make,
      model,
      price,
      description,
      thumbUrl,
      images: { imageOneUrl, imageTwoUrl, imageThreeUrl }
    });
    this.setState({
      category: "",
      make: "",
      model: "",
      price: "0",
      description: "",
      thumbUrl: "",
      imageOneUrl: "",
      imageTwoUrl: "",
      imageThreeUrl: "",
      thumbnail: null,
      imageOne: null,
      imageTwo: null,
      imageThree: null
    });
    event.preventDefault();
  }

  render() {
    const isInvalid = this.state.thumbnail === null ? true : false;
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
              name="thumbnail"
              type="file"
              onChange={this.onThumbnailChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isInvalid}
              onClick={this.handleThumbnailUpload}
            >
              Upload thumbnail
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              name="imageOne"
              type="file"
              onChange={this.onImageOneChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isInvalid}
              onClick={this.handleImageOneUpload}
            >
              Upload image 1
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              name="imageTwo"
              type="file"
              onChange={this.onImageTwoChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isInvalid}
              onClick={this.handleImageTwoUpload}
            >
              Upload image 2
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Control
              name="imageThree"
              type="file"
              onChange={this.onImageThreeChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isInvalid}
              onClick={this.handleImageThreeUpload}
            >
              Upload image 3
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
  connect(null, mapDispatchtoProps),
  withFirebase
)(AddItem);
