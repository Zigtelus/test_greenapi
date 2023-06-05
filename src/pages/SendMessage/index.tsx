import './index.scss';
import React, { FormEvent, useState } from 'react';
import { fetchSendMessage } from '../../redux/user/fetchSendMessage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GetMessage from '../GetMessage';
import DeleteMessage from '../DeleteMessage';

const SendMessage = () => {
  const {authData, operationStatus} = useAppSelector(state => state.userSlice);
  const chatId = useAppSelector(state => state.contactsSlice.target);
  const {idInstance, apiTokenInstance} = authData;
  const {isLoading, error} = operationStatus.sendMessage;
  
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!!message) {
      e.preventDefault();
      dispatch(fetchSendMessage({idInstance, apiTokenInstance, chatId: `${chatId}@c.us`, message}))
      setMessage('')
    }
  };

  return (<>
    {
      !!chatId ?
      <div>
        <div style={{position: 'absolute', top: '0vh', width: '100%', background: '#e1e1e1', padding: '30px'}}>
          <GetMessage />
          <DeleteMessage />
        </div>
        {isLoading &&  <span>loading</span>}
        <form className='sendMessage' onSubmit={handleSubmit}>
          <textarea
            className='placeWrite'
            placeholder={chatId === '79661608099' ? 'МЫ ГОТОВЫ ВЗЯТЬ ТЕБЯ НА РАБОТУ' : 'Введите текст сообщения'}
            value={message}
            required
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className='btn' type="submit">Send Message</button>
        </form>
        {error && <span>сообщение не было отправлено</span>}
      </div> :
      <div className='please'>ВЫБЕРИТЕ НОМЕР ТЕЛЕФОНА КОНТАКТА, КОТОРОМУ ХОТИТЕ НАПИСАТЬ</div>
    }

  </>);
};

export default React.memo(SendMessage);
