import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/items";
import PropTypes from "prop-types";

export class ListItems extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onClick = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;
    const { isAuthenticated } = this.props;
    return (
      <div>
        <ListGroup className="mt-4">
          {items.map(elem => (
            <ListGroupItem key={elem._id}>
              {isAuthenticated ? (
                <Button
                  onClick={this.onClick.bind(this, elem._id)}
                  outline
                  color="danger"
                  className="mr-4"
                >
                  Delete
                </Button>
              ) : (
                ""
              )}

              {elem.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

ListItems.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ListItems);
