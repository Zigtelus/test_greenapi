import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "./createAPI";
import { User } from "./user.slice";

const api = createAPI();

interface UserAndNumber extends User {
  number: number
}
export const fetchDeleteMessage = createAsyncThunk(
  'user/fetchDeleteMessage',
  async ({idInstance, apiTokenInstance, number}: UserAndNumber, thunkAPI) => {

    const secondPartURL = `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${number}`;

    try {
      const res = await api.delete<any>(secondPartURL);
      return res.data;
    } catch (error) {
      throw error;
    };
  }
);