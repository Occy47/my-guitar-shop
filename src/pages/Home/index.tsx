import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ConnectedItemViewList from "./components/ItemViewList";
import ConnectedItemSorter from "../../components/ItemSorter";

const HomePage = () => (
  <div className="container">
    <ConnectedItemSorter />
    <ConnectedItemViewList />
  </div>
);

export default HomePage;
