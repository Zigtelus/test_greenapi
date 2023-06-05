import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "./createAPI";
import { User } from "./user.slice";



const api = createAPI();


export const fetchQrCode = createAsyncThunk(
  'user/fetchQrCode',
  async ({idInstance, apiTokenInstance}: User, thunkAPI) => {

    const secondPartURL = `waInstance${idInstance}/qr/${apiTokenInstance}`;

    try {
      const res = await api.get<any>(secondPartURL);
      return {
        idInstance,
        apiTokenInstance,
        data: res.data
      };
    } catch (error) {
      throw error;
    };
  }
);