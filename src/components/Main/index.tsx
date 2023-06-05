import './index.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchQrCode } from '../../redux/user/fetchQrCode';
import AuthForm from '../../pages/AuthForm';
import QrCode from '../../pages/QrCode';
import SendMessage from '../../pages/SendMessage';
import { addAuthData, changeAuthenticated } from '../../redux/user/user.slice';
import Messages from '../../pages/Messages';

function Chat () {
  const {authData, operationStatus, isAuthenticated} = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    const user: string | null = localStorage.getItem('authUser')

    // если в localStorage информация есть пользователе, а в сторе нет
    if (!!user && !authData.idInstance) {
      const {apiTokenInstance, idInstance} = JSON.parse(user)
      // подгружаем QrCode и сразу передаем информацию о пользователе в стор
      dispatch(fetchQrCode({apiTokenInstance, idInstance}))
    }
    
  }, [authData.idInstance])

  useEffect(()=> {
    const authenticated: string | null = localStorage.getItem('isAuthenticated')
    const user: string | null = localStorage.getItem('authUser')

    // если в localStorage информация есть о авторизации, а в сторе нет
    if (!!authenticated && !isAuthenticated) {
      const {apiTokenInstance, idInstance} = JSON.parse(user!)
      dispatch(changeAuthenticated(true))
      dispatch(addAuthData({apiTokenInstance, idInstance}))
    }

  }, [])

  return <main className="main">

    {// если пользователь авторизован, сразу перенаправлять на отправку сообщений
      isAuthenticated ? 
      <>
        <Messages />
        <SendMessage /> 
      </> :

      (// ожидание получения данных о пользователе
        operationStatus.authUser.isLoading ?
        <span>loading</span> :
  
        (// проверка на наличие apiTokenInstance и idInstance в сторе (они могут быть там из LocalStorage)
          !!authData.idInstance ?
          <QrCode /> :
          <AuthForm />
        )
      )
    }

  </main>
}
export default Chat;