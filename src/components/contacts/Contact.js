import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { Consumer } from "../../context";

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false
    };
  }

  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  onDeleteClick = async (id, dispatch) => {
    // this.props.deleteClickHandler();
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };
  render() {
    const { id, name, phone, email } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={showClickStyle}
                />
                <i
                  className="fas fa-times"
                  style={timesStyle}
                  onClick={() => this.onDeleteClick(id, dispatch)}
                />
                <Link to={`/edit/${id}`}>
                  <i className="fas fa-pencil-alt" style={editStyle} />
                </Link>
              </h4>
              {showContactInfo && (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const showClickStyle = {
  cursor: "pointer"
};

const timesStyle = {
  cursor: "pointer",
  float: "right",
  color: "red"
};

const editStyle = {
  cursor: "pointer",
  float: "right",
  color: "black",
  marginRight: "1rem"
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired
  // deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;
