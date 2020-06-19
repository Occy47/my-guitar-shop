import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import HomeCarousel from "./components/HomeCarousel";
import { Layout, Button, Row, Col } from "antd";
import "./landing.css";

class LandingPage extends React.Component<any, any> {
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

export default LandingPage;
