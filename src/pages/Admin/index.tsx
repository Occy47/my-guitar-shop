import React from "react";
import AddItem from "./components/AddItem";
import ConnectedItemsList from "./components/ItemList";
import ConnectedItemSorter from "../../components/ItemSorter";

const AdminPage = () => (
  <div>
    Admin Page
    <AddItem />
    <hr />
    <ConnectedItemSorter />
    <ConnectedItemsList />
  </div>
);

export default AdminPage;
