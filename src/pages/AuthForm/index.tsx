import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchQrCode } from '../../redux/user/fetchQrCode';
import { User } from '../../redux/user/user.slice';

function AuthForm() {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.userSlice.operationStatus.getQrCode);
  const [authData, setAuthData] = useState<User>({
    idInstance: '',
    apiTokenInstance: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchQrCode(authData))
  };

  return <div style={{position: "absolute", top: "10vh"}}>
    {
      isLoading ? <span>loading</span> :

      <>
        <form onSubmit={handleSubmit}>
          <label>
            idInstance:
            <input
              type="text"
              value={authData.idInstance}
              onChange={(e) => setAuthData(state => ({...state, idInstance: e.target.value}))}
            />
          </label>
    
          <label>
            apiTokenInstance:
            <input
              type="text"
              value={authData.apiTokenInstance}
              onChange={(e) => setAuthData(state => ({...state, apiTokenInstance: e.target.value}))}
            />
          </label>

          <button type="submit">Submit</button>
        </form>

        {
          error && <span>данный пользоваель не был найден</span>
        }
      </>
    }
  </div>
}

export default AuthForm;