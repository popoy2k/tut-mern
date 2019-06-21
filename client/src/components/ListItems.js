import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../actions/items";
import PropTypes from "prop-types";

export class ListItems extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  render() {
    return (
      <div>
        <ListGroup>
          {this.props.item.map(item => (
            <ListGroupItem> {item.name} </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

ListItems.propTypes = {
  item: PropTypes.array.isRequired,
  getItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems }
)(ListItems);
