import React from "react";
import AddItem from "./components/AddItem";
import ConnectedItemsList from "./components/ItemList";

const AdminPage = () => (
  <div>
    Admin Page
    <AddItem />
    <hr />
    <ConnectedItemsList />
  </div>
);

export default AdminPage;
