import React, { Component, Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Input,
  Label,
  Form,
  Alert,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authAction";
import { clearError } from "../../actions/errorAction";
export class AddItem extends Component {
  state = {
    isOpen: false,
    name: "",
    email: "",
    password: "",
    password1: "",
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // If register not success show error (server side)
    if (prevProps.error !== error && this.props.error.id === "REGISTER_ERROR") {
      this.setState({ msg: error.msg });
    }
    // If registered success close modal
    if (this.state.isOpen && isAuthenticated) this.toggle();
  }
  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    this.setState({
      msg: null,
      name: "",
      email: "",
      password: "",
      password1: ""
    });
    this.props.clearError();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password1 } = this.state;

    // CS Validation
    if (!name || !email || !password || !password1) {
      return this.setState({ msg: "Please fill all field!" });
    }
    if (password !== password1)
      return this.setState({ msg: "Password don't match!" });

    const newUser = { name, email, password };
    this.props.registerUser(newUser);
  };
  render() {
    const { isOpen, name, email, password, password1 } = this.state;
    return (
      <Fragment>
        <NavLink onClick={this.toggle} href="#" className="text-white">
          Register
        </NavLink>
        <Modal isOpen={isOpen} toggle={this.toggle} className="bg-success">
          <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              {this.state.msg ? (
                <Alert color="danger">
                  <i className="pr-4 text-danger">&times;</i>
                  {this.state.msg}
                </Alert>
              ) : null}

              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={name}
                  className="form-control"
                  id="name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                  className="form-control"
                  id="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                  className="form-control"
                  id="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password1">Re-type Password</Label>
                <Input
                  type="password"
                  name="password1"
                  onChange={this.onChange}
                  value={password1}
                  className="form-control"
                  id="password1"
                />
              </FormGroup>
              <Button color="info" outline>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

AddItem.propTypes = {
  registerUser: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser, clearError }
)(AddItem);
