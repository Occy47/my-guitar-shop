import React from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";

const HomePage = () => (
  <div>
    Home Page
    <AddItem />
    <hr />
    <ItemList />
  </div>
);

export default HomePage;
