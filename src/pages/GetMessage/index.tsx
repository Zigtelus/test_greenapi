import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGetMessage } from '../../redux/user/fetchGetMessage';

function GetMessage() {
  const {message, operationStatus, authData} = useAppSelector(state => state.userSlice);
  const {text, receiptId} = message;
  const {isLoading, error} = operationStatus.getMessage;
  const {idInstance, apiTokenInstance} = authData;

  const dispatch = useAppDispatch();

  const handleGetMessage =()=> {
    dispatch(fetchGetMessage({idInstance, apiTokenInstance}))
  }
  
  return <div style={{margin: "15px 0 15px"}}>
    {
      isLoading ? <span> loading </span> :
      <>
        <div>
          <button onClick={handleGetMessage}>get message</button>
        </div>
        {// проверка на наличие поступившей информации информации с сервера
          !!receiptId &&
          <>
            {/* случается, что текста сообщения нет, а номер сообщения есть!! */}
            {text ? <span>{text}</span> : <span>текст сообщения отсутствует</span>}
            <span> сообщения № - {receiptId}</span>
          </>

        }
        {// проверка на ошибку с сервера
          error && <span>сообщение не было обнаружено</span>
        }
      </>
    }


  </div>
}

export default React.memo(GetMessage);