import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "./createAPI";

const api = createAPI();

export const fetchAuthUser = createAsyncThunk(
  'user/fetchAuthUser',
  async ({idInstance, apiTokenInstance}: any, thunkAPI) => {
    
    const secondPartURL = `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    try {
      const res = await api.get<any>(secondPartURL);
      return res.data;
    } catch (error) {
      throw error;
    };
  }
);