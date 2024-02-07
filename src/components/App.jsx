import React from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Search } from './Search/Search';
import { ContactList } from './ContactList/ContactList';

export class App extends React.Component {
  state = {
    contacts:  [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      } else {
        console.error("Локальне сховище недоступне на цьому пристрої.");
      }
    }
}
  handleAddContact = (name, number) => {
    const { contacts } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter both the contact name and phone number.');
      return;
    }

    if (contacts.some((contact) => contact.name.toLowerCase() === name.trim().toLowerCase())) {
      alert('Contact with this name already exists!');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter));

    return (
      <div>
        <h1>Phonebook</h1>
        <Form handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Search filter={filter} onFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}
