import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Search } from './Search/Search';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const[filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
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

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter));

  return (
    <div>
      <h1>Phonebook</h1>
      <Form handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Search filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};
