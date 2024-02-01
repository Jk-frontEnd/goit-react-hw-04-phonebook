import React from 'react';
import css from './ContactList.module.css';
import { ContactElem } from 'components/ContactElem/ContactElem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <div className={css.contBox}>
      <h2 className={css.header}>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <ContactElem key={contact.id} contact={contact} onDeleteContact={onDeleteContact} />
        ))}
      </ul>
    </div>
  );
};

export { ContactList };
