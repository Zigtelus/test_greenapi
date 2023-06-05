import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDeleteMessage } from '../../redux/user/fetchDeleteMessage';

function DeleteMessage() {
  const [clickButton, setClickButton] = useState<boolean>(false);

  const {authData, message, operationStatus} = useAppSelector(state => state.userSlice);
  const {idInstance, apiTokenInstance} = authData;
  const {isLoading, error} = operationStatus.deleteMessage;
  const {receiptId} = message;

  const dispatch = useAppDispatch();

  const handleDeleteMessage =()=> {
    dispatch(fetchDeleteMessage({idInstance, apiTokenInstance, number: receiptId}))
    setClickButton(true)
  }

  return <div>
    {// проверка на загрузку
      isLoading ? <span>loading</span> :
      <>
        <div>
          <button onClick={handleDeleteMessage}>delete message</button>
        </div>
        {// проверка на первое нажатие handleDeleteMessage
          clickButton && (
            // проверка на ошибку с сервера
            error ? <span>сообщение для удаления не было обнаружено</span> :
            (!!receiptId || <span>сообщение удалено</span>)
          )
        }
      </>
    }
  </div>
}

export default React.memo(DeleteMessage);