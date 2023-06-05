import { createSlice } from "@reduxjs/toolkit";
import { fetchSendMessage } from "../user/fetchSendMessage";

export type Contact = {
  contactId: number;
  number: string;
  messages: {
    messageId: number;
    text: string;
  }[]
}

type InitialState = {
  contacts: Contact[];
  target: string;
}

const initialState: InitialState = {     
  contacts: [
    {
      contactId: 1,
      number: '79661608099',
      messages: []
    }
  ],
  target: ''
};


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addNewContact(state, action) {
      const lastId = state.contacts[state.contacts.length - 1]?.contactId || 0;
      const newUser = {
        contactId: lastId +1,
        number: action.payload,
      };

      state.contacts = [...state.contacts, {...newUser, messages: []}];
    },
    changeTarget(state, action) {
      state.target = action.payload
    },
  },
  extraReducers: {
    // добавление нового сообщения
    [fetchSendMessage.fulfilled.type]: (state, action) => {
      const {chatId, message} = action.payload

      const contactIndex = state.contacts.findIndex(contact => contact.number === chatId);

      if (contactIndex !== -1) {
        const messages = state.contacts[contactIndex].messages;
        const lastMessageId = messages[messages.length - 1]?.messageId || 0;
      
        const newMessage = {
          messageId: lastMessageId + 1,
          text: message,
        };
      
        state.contacts[contactIndex].messages = [
          ...messages,
          {...newMessage}
        ]
      }
    },
  }
})

export const { addNewContact, changeTarget } = contactsSlice.actions;
export default contactsSlice.reducer;