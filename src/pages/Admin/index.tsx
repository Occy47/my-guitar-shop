import * as React from "react";
import AddItem from "./components/AddItem";
import ConnectedItemsList from "./components/ItemList";
import ConnectedItemSorter from "../../components/ItemSorter";
import UsersList from './components/UsersList';

const AdminPage = () => (
  <div>
    Admin Page
    <AddItem />
    <hr />
    <ConnectedItemSorter />
    <ConnectedItemsList />
    <hr />
    <UsersList />
  </div>
);

export default AdminPage;
