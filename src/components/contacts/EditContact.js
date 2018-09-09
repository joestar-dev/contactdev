import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
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

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
