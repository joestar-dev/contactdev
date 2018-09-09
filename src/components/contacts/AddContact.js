import React, { Component } from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
// import PropTypes from "prop-types";

class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e, dispatch) => {
    e.preventDefault();
    const { name, phone, email } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required!" } });
      return;
    } else if (email === "") {
      this.setState({ errors: { age: "email is required!" } });
      return;
    } else if (phone === "") {
      this.setState({ errors: { email: "Phone is required!" } });
      return;
    }
    const newContact = {
      // id: uuid(),
      name,
      email,
      phone
    };

    const res = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      newContact
    );
    // .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data  }));
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({ name: "", phone: "", email: "", errors: {} });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(e, dispatch)}>
                  <TextInputGroup
                    name="name"
                    type="text"
                    label="Name"
                    value={name}
                    placeholder="Enter Name"
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    name="email"
                    type="text"
                    label="Email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    type="text"
                    label="Phone"
                    value={phone}
                    placeholder="Enter Phone"
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    value="Add Contact"
                    type="submit"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
