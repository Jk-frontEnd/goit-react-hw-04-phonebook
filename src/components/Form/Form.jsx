import React from 'react';
import css from './Form.module.css';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleAddContact = () => {
    const { name, number } = this.state;
    this.props.handleAddContact(name, number);
    this.setState({
      name: '',
      number: '',
    });
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formBox}>
        <label>
          Name
          <input type="text" name="name" value={name} onChange={this.handleNameChange} required />
        </label>
        <label>
          Phone number
          <input type="tel" name="number" value={number} onChange={this.handleNumberChange} required />
        </label>
        <button className={css.btn} type="button" onClick={this.handleAddContact}>
          Add Contact
        </button>
      </form>
    );
  }
}

export { Form };