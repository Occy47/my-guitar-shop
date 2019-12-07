import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ConnectedItemViewList from "./components/ItemViewList";
import ConnectedItemSorter from "../../components/ItemSorter";
import AlertMessage from "../../components/AlertMessage";

const HomePage = () => (
  <div className="container">
    <ConnectedItemSorter />
    <ConnectedItemViewList />
    <AlertMessage />
  </div>
);

export default HomePage;
