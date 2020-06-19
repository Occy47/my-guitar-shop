import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doAddItem } from "../../../redux/actions/item";
import { Item } from "../../../redux/reducers/item";
import { ItemsActions } from "../../../redux/types";
import uuid from "uuid";
import Firebase, { withFirebase } from "../../../firebase";
import { compose } from "recompose";
// import Form from "react-bootstrap/Form";
// import { Col, Button } from "react-bootstrap";

import { Form, Row, Col, Button, Select, Input, Upload } from "antd";
//import { UploadOutline, InboxOutline } from "@ant-design/icons";

const { Option } = Select;

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
      imageThree: null,
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
    this.clickInput = this.clickInput.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  clickInput(event: any) {
    var target = event.target.id;
    var inputBtn = document.getElementById(`${target}Input`);
    if (inputBtn) {
      inputBtn.click();
    }
    {
      console.log("btn is null");
    }
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.target.value } as IState);
    event.preventDefault();
  }

  onSelect(value: string) {
    if (value) {
      this.setState({ category: value });
    }
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
    console.log("thumb uploaded");
  }

  onImageOneChange(event: any) {
    if (event.target.files[0]) {
      const newImage = event.target.files[0];
      this.setState({ imageOne: newImage });
    } else {
      console.log("image one do nothing");
    }
  }

  handleImageOneUpload() {
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
    console.log("image one uploaded");
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
      imageThreeUrl,
    } = this.state;

    let newItem = {
      id,
      category,
      make,
      model,
      price,
      description,
      thumbUrl,
      images: { imageOneUrl, imageTwoUrl, imageThreeUrl },
    };

    this.props.onAddItem(newItem);
    this.props.firebase.item(newItem.id).set({
      category,
      make,
      model,
      price,
      description,
      thumbUrl,
      images: { imageOneUrl, imageTwoUrl, imageThreeUrl },
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
      imageThree: null,
    });
    event.preventDefault();
  }

  render() {
    const { thumbnail, imageOne, imageTwo, imageThree } = this.state;
    const isInvalid = thumbnail === null ? true : false;
    console.log("thumb: " + this.state.thumbnail);
    console.log("thumb url : " + this.state.thumbUrl);
    if (this.state.imageOne) {
      console.log("image 1: " + this.state.imageOne.name);
    }

    console.log("image 1 url : " + this.state.imageOneUrl);
    console.log("category: " + this.state.category);

    return (
      <Form
        name="add item"
        onSubmit={this.onCreateItem}
        style={{ background: "#676767", padding: 6 }}
      >
        <h5>Add item: </h5>
        <Row>
          <Col span={4}>
            <Form.Item label="Category" required style={{ padding: 6 }}>
              <Select
                onChange={this.onSelect}
                placeholder="Select a category"
                allowClear
              >
                <Option value="guitars">guitars</Option>
                <Option value="amps">amps</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Make" required style={{ padding: 6 }}>
              <Input name="make" onChange={this.onChange} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item required label="Model" style={{ padding: 6 }}>
              <Input name="model" onChange={this.onChange} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Price" required style={{ padding: 6 }}>
              <Input name="price" onChange={this.onChange} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item required label="Description" style={{ padding: 6 }}>
              <Input name="description" onChange={this.onChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Form.Item label="Thumbnail" style={{ padding: 6 }}>
              <Button name="thumb" id="thumb" onClick={this.clickInput}>
                <input
                  style={{ display: "none" }}
                  id="thumbInput"
                  name="thumb"
                  type="file"
                  onChange={this.onThumbnailChange}
                />
                Select thumbnail
              </Button>
              <Button
                disabled={thumbnail === null ? true : false}
                onClick={this.handleThumbnailUpload}
                style={{ margin: 6 }}
              >
                Upload
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Image 1" style={{ padding: 6 }}>
              <Button id="imageOne" onClick={this.clickInput}>
                <input
                  style={{ display: "none" }}
                  id="imageOneInput"
                  name="imageOne"
                  type="file"
                  onChange={this.onImageOneChange}
                />
                Select image 1
              </Button>
              <Button
                disabled={imageOne === null ? true : false}
                onClick={this.handleImageOneUpload}
                style={{ margin: 6 }}
              >
                Upload
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Image 2" style={{ padding: 6 }}>
              <Button id="imageTwo" onClick={this.clickInput}>
                <input
                  style={{ display: "none" }}
                  id="imageTwoInput"
                  name="imageTwo"
                  type="file"
                  onChange={this.onImageTwoChange}
                />
                Select image 2
              </Button>
              <Button
                disabled={imageTwo === null ? true : false}
                onClick={this.handleImageTwoUpload}
                style={{ margin: 6 }}
              >
                Upload
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Image 3" style={{ padding: 6 }}>
              <Button id="imageThree" onClick={this.clickInput}>
                <input
                  style={{ display: "none" }}
                  id="imageThreeInput"
                  name="imageThree"
                  type="file"
                  onChange={this.onImageThreeChange}
                />
                Select image 3
              </Button>
              <Button
                disabled={imageThree === null ? true : false}
                onClick={this.handleImageThreeUpload}
                style={{ margin: 6 }}
              >
                Upload
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ padding: 6 }}>
          Add item
        </Button>
      </Form>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch<ItemsActions>) => ({
  onAddItem: (item: Item) => dispatch(doAddItem(item)),
});

export default compose(
  connect(null, mapDispatchtoProps),
  withFirebase
)(AddItem);
