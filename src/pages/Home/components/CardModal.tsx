import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

class CardModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Carousel interval={50000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fexaple_1.jpg?alt=media&token=3ac25107-9ae6-48a4-9967-9ed9b1a92cb3"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fexaple_2.jpg?alt=media&token=c21d0965-c10b-4649-8404-cb4157077696"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://firebasestorage.googleapis.com/v0/b/my-guitar-shop.appspot.com/o/carousel%2Fexaple_3.jpg?alt=media&token=9e8817be-413c-40fe-84b6-40ef4e78a50c"
              />
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CardModal;
