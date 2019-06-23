import React, { Component } from "react";
import { Provider } from "react-redux";
import AppNav from "./components/AppNav";
import ListItems from "./components/ListItems";
import AddItem from "./components/AddItem";
import { authUser } from "./actions/authAction";
import store from "./store";

import { Container } from "reactstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  state = {
    isValid: false
  };
  componentDidMount() {
    store.dispatch(authUser());
  }
  render() {
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
}
