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
import { loginUser } from "../../actions/authAction";
import { clearError } from "../../actions/errorAction";
export class LoginNav extends Component {
  state = {
    isOpen: false,
    email: "",
    password: "",
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    // If register not success show error (server side)
    if (prevProps.error !== error && this.props.error.id === "LOGIN_ERROR") {
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
    const { email, password } = this.state;

    // CS Validation
    if (!email || !password) {
      return this.setState({ msg: "Please fill all field!" });
    }

    const newUser = { email, password };
    this.props.loginUser(newUser);
  };
  render() {
    const { isOpen, email, password } = this.state;
    return (
      <Fragment>
        <NavLink onClick={this.toggle} href="#" className="text-white">
          Login
        </NavLink>
        <Modal isOpen={isOpen} toggle={this.toggle} className="bg-success">
          <ModalHeader toggle={this.toggle}>
            Welcome to shooping list!
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              {this.state.msg ? (
                <Alert color="danger">
                  <i className="pr-4 text-danger">&times;</i>
                  {this.state.msg}
                </Alert>
              ) : null}

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

LoginNav.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser, clearError }
)(LoginNav);
