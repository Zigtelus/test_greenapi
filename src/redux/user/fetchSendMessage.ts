import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "./createAPI";
import { User } from "./user.slice";

const api = createAPI();

interface FetchSendMessage extends User {
  chatId: string;
  message: string;
}

export const fetchSendMessage = createAsyncThunk(
  'user/fetchSendMessage',
  async ({idInstance, apiTokenInstance, chatId, message}: FetchSendMessage, thunkAPI) => {

    const secondPartURL = `waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    try {
      await api.post<any>(secondPartURL, {chatId, message});
      return {
        chatId: chatId.slice(0, 11),
        message
      };
    } catch (error) {
      throw error;
    };
  }
);