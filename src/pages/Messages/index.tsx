import './index.scss';
import { useAppSelector } from '../../redux/hooks';
import React from 'react';

function Messages() {
  const chatId = useAppSelector(state => state.contactsSlice.target);
  const contacts = useAppSelector(state => state.contactsSlice.contacts);
  const contactIndex = contacts.findIndex(contact => contact.number === chatId);

  return <div className="messages">
    {// проверка на наличие выбранного чата 
      !!chatId &&
      contacts[contactIndex].messages.map(message => {
        return <div key={message.messageId} className="message">{message.text}</div>
      })
    }
  </div>
}

export default React.memo(Messages);