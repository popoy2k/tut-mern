import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

import RegisterModal from "./auth/RegisterModal";
import LogoutNav from "./auth/LogoutNav";
import LoginNav from "./auth/LoginNav";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AppNav extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    const { isAuthenticated, user } = this.props;

    const loggedIn = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            {user ? `Welcome ${user.name}!` : ""}
          </span>
        </NavItem>
        <NavItem>
          <LogoutNav />
        </NavItem>
      </Fragment>
    );

    const loggedOut = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginNav />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="warning" dark expand="md">
          <NavbarBrand href="/" className="text-white">
            Shooping List
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? loggedIn : loggedOut}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(AppNav);
