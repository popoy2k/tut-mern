import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Input,
  Label,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createItem } from "../actions/items";

export class AddItem extends Component {
  state = {
    isOpen: false,
    name: ""
  };
  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = { name: this.state.name };
    this.props.createItem(newItem);
    this.setState({ isOpen: false, name: "" });
  };
  render() {
    const { isOpen, name } = this.state;
    return (
      <div>
        <Button color="success" outline onClick={this.toggle}>
          Add more
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle} className="bg-success">
          <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  name="name"
                  onChange={this.onChange}
                  value={name}
                  className="form-control"
                  id="name"
                />
              </FormGroup>
              <Button color="info" outline>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddItem.propTypes = {
  createItem: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({});

export default connect(
  null,
  { createItem }
)(AddItem);
