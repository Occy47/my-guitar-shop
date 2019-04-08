import React from "react";
import ItemView from "./components/ItemView";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <ItemView />
      </div>
      <div className="col-sm">
        <ItemView />
      </div>
      <div className="col-sm">
        <ItemView />
      </div>
    </div>
  </div>
);

export default HomePage;
