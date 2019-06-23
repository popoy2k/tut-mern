import React, { Component, Fragment } from "react";
import { logoutUser } from "../../actions/authAction";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class LogoutNav extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired
  };
  render() {
    return (
      <Fragment>
        <NavLink
          className="text-white"
          href="#"
          onClick={this.props.logoutUser}
        >
          {" "}
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(LogoutNav);
