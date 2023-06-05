import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "./createAPI";
import { User } from "./user.slice";

const api = createAPI();

export const fetchGetMessage = createAsyncThunk(
  'user/fetchGetMessage',
  async ({idInstance, apiTokenInstance}: User, thunkAPI) => {

    const secondPartURL = `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    const res = await api.get<any>(secondPartURL);

    try {

      const messageData = res.data.body.messageData;
      const receiptId = res.data.receiptId;
      
      const message = {
        text: false,
        receiptId
      }
      
      if (messageData) {
        if (messageData.extendedTextMessageData) {
          message.text = messageData.extendedTextMessageData.text;
        } else if (messageData.textMessageData) {
          message.text = messageData.textMessageData.textMessage;
        }
      }
      
      return {...message};
      
    } catch (error) {
      throw error;
    };
  }
);