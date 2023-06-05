import { createSlice } from "@reduxjs/toolkit";
import { fetchQrCode } from "./fetchQrCode";
import { fetchAuthUser } from "./fetchAuthUser";
import { fetchSendMessage } from "./fetchSendMessage";
import { fetchGetMessage } from "./fetchGetMessage";
import { fetchDeleteMessage } from "./fetchDeleteMessage";

export type User = {
  idInstance: string;
  apiTokenInstance: string;
}

export type AuthData = {
  idInstance: string;
  apiTokenInstance: string;
  qrCode: string;
  message: string;
}

export type OperationStatus = {
  isLoading: boolean;
  error: boolean;
}

export type Message = {
  text: string,
  receiptId: number,
}

export type UserState = {
  user: {
    idInstance: string,
    apiTokenInstance: string,
  };
  authData: AuthData;
  message: {
    text: string
    receiptId: number,
  };
  isAuthenticated: boolean;
  operationStatus: {
    sendMessage: OperationStatus,
    getMessage: OperationStatus,
    deleteMessage: OperationStatus,
    getQrCode: OperationStatus,
    authUser: OperationStatus,
  };
}


const initialState: UserState = {     
  user: {
    idInstance: '',
    apiTokenInstance: '',
  },
  authData: {
    idInstance: '',
    apiTokenInstance: '',
    qrCode: '',
    message: '',
  },
  message: {
    text: '',
    receiptId: 0,
  },
  operationStatus: {
    sendMessage: {
      isLoading: false,
      error: false
    },
    getMessage: {
      isLoading: false,
      error: false
    },
    deleteMessage: {
      isLoading: false,
      error: false
    },
    getQrCode: {
      isLoading: false,
      error: false
    },
    authUser: {
      isLoading: false,
      error: false
    },
  },
  isAuthenticated: false,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAuthData(state, action) {
      const {idInstance, apiTokenInstance} = action.payload
      state.authData = {...state.authData, idInstance, apiTokenInstance}
    },
    changeAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
  },
  extraReducers: {

    // запрос QR-code
    [fetchQrCode.fulfilled.type]: (state, action) => {
      const { idInstance, apiTokenInstance} = action.payload
      const { type, message} = action.payload.data

      state.authData = {
        ...state.authData,
        qrCode: message,
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance
      }

      // проверка авторизации
      if (type === 'alreadyLogged') {
        localStorage.setItem('isAuthenticated', 'true')
        state.isAuthenticated = true
      }

      localStorage.setItem('authUser', JSON.stringify({idInstance, apiTokenInstance}))
      state.operationStatus.getQrCode = {error: false, isLoading: false}
    },
    [fetchQrCode.pending.type]: (state, action)=> {
      state.operationStatus.getQrCode.isLoading = true;
    },
    [fetchQrCode.rejected.type]: (state, action) => {
      state.operationStatus.getQrCode = {error: true, isLoading: false}
    },

    // проверка авторизации
    [fetchAuthUser.fulfilled.type]: (state, action) => {
      const { stateInstance} = action.payload

      state.isAuthenticated = stateInstance === 'authorized'

      stateInstance === 'authorized' &&
      (state.isAuthenticated = true)

      state.operationStatus.authUser = {error: false, isLoading: false}
    },
    [fetchAuthUser.pending.type]: (state, action)=> {
      state.operationStatus.authUser.isLoading = true;
    },
    [fetchAuthUser.rejected.type]: (state, action) => {
      state.operationStatus.authUser = {error: true, isLoading: false}
    },

    // отправка сообщений
    [fetchSendMessage.fulfilled.type]: (state, action) => {
      state.operationStatus.sendMessage = {error: false, isLoading: false}
    },
    [fetchSendMessage.pending.type]: (state, action)=> {
      state.operationStatus.sendMessage.isLoading = true
    },
    [fetchSendMessage.rejected.type]: (state, action) => {
      state.operationStatus.sendMessage = {error: true, isLoading: false}
    },

    // получить сообщение
    [fetchGetMessage.fulfilled.type]: (state, action) => {
      const {text, receiptId} = action.payload
      state.message = {text, receiptId}
      state.operationStatus.getMessage = {error: false, isLoading: false}
    },
    [fetchGetMessage.pending.type]: (state, action)=> {
      state.operationStatus.getMessage.isLoading = true
    },
    [fetchGetMessage.rejected.type]: (state, action) => {
      state.operationStatus.getMessage = {error: true, isLoading: false}
    },

    // удалить сообщение
    [fetchDeleteMessage.fulfilled.type]: (state, action) => {

      state.operationStatus.deleteMessage = {
        error: action.payload.result === false,
        isLoading: false
      };

      // проверка на успешное удаление
      if (action.payload.result !== false) {
        state.message = {receiptId: 0, text: ''}
      }

    },
    [fetchDeleteMessage.pending.type]: (state, action)=> {
      state.operationStatus.deleteMessage.isLoading = true
    },
    [fetchDeleteMessage.rejected.type]: (state, action) => {
      state.operationStatus.deleteMessage = {error: true, isLoading: false}
    }
  },
})

export const { addAuthData, changeAuthenticated } = userSlice.actions;
export default userSlice.reducer;