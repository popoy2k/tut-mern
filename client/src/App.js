import React from "react";
import { Provider } from "react-redux";
import AppNav from "./components/AppNav";
import ListItems from "./components/ListItems";
import AddItem from "./components/AddItem";
import store from "./store";

import { Container } from "reactstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Provider store={store}>
      <AppNav />
      <Container>
        <div className="mt-4">
          <AddItem />
          <ListItems />
        </div>
      </Container>
    </Provider>
  );
}

export default App;
