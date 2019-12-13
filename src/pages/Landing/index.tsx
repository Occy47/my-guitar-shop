import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { doSetItems } from "../../redux/actions/item";
import { ItemsActions } from "../../redux/types";
import { withFirebase } from "../../firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import HomeCarousel from "./components/HomeCarousel";
import { Layout, Button, Row, Col } from "antd";
import "./landing.css";

class LandingPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.firebase.items().on("value", (snapshot: any) => {
      const itemsObject = snapshot.val();

      const itemsList = Object.keys(itemsObject).map(key => ({
        ...itemsObject[key],
        id: key
      }));
      this.props.onSetItems(itemsList);
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
    return (
      <Layout>
        <Layout className="carousel">
          <HomeCarousel />
        </Layout>
        <Layout className="welcome-text">
          <Row className="col">
            <Col span={8}></Col>
            <Col span={8}>
              <h2>Welcome to My-guitar Shop!</h2>
            </Col>
            <Col span={8}></Col>
          </Row>
          <Row className="col">
            <Col span={8}></Col>
            <Col span={8}>
              <Button type="primary">
                <Link to={ROUTES.HOME}>Enter</Link>
              </Button>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<ItemsActions>) => ({
  onSetItems: (items: any) => dispatch(doSetItems(items))
});

const ConnectedLandigPage = compose(
  connect(null, mapDispatchToProps),
  withFirebase
)(LandingPage);

export default ConnectedLandigPage;
