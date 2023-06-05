import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/user/fetchAuthUser';

function QrCode() {
  const [getSendQr, setSendQr] = useState<boolean>(false);
  const {authData} = useAppSelector(state => state.userSlice);
  const {isLoading} = useAppSelector(state => state.userSlice.operationStatus.authUser);
  const dispatch = useAppDispatch();

  const handleGetStatu =()=> {
    dispatch(fetchAuthUser(authData))
    setSendQr(true)
  }
  
  return <div style={{position: "absolute", top: "10vh"}}>
    {
      isLoading ? <span>loading</span> :
      <>
        <div>
          <img src={`data:image/png;base64,${authData.qrCode}`} alt="QRcode" />
          <span>{authData.message}</span>
        </div>
        <span> Если активировал QR код на телефоне, жми "next"</span>
        <button onClick={handleGetStatu}>next</button>

        {
          getSendQr && <span>активации не произошло</span>
        }
      </>
    }
  </div>
}

export default QrCode;