import './index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Contact, addNewContact, changeTarget } from '../../redux/contacts/contacts.slice';
import { useState } from 'react';

function Aside () {
  const [phone, setPhone] = useState<string>('');
  const contacts = useAppSelector(state => state.contactsSlice.contacts);
  const isAuthenticated = useAppSelector(state => state.userSlice.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleAddNewContact =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const checkNumber = contacts.findIndex(contact => contact.number === phone)
    checkNumber >= 0 || dispatch(addNewContact(phone))
  }

  const handleTargetContact =(number: string)=> {
    dispatch(changeTarget(number))
  }
  
  return <aside className="aside">

    {
      isAuthenticated &&
      <>
        <form onSubmit={handleAddNewContact}>
          <input 
          onChange={(e)=> setPhone(e.target.value)}
          type="tel" 
          id="phone"
          name="phone"
          placeholder="7 000 000 00 00"
          pattern="[0-9]{11}"
          required 
        />
          <button type="submit">add contact</button>
        </form>
        <div className='contacts'>
        {
          !!contacts.length
          ?
          contacts.map((item: Contact) => {
            return <button 
              key={item.contactId} 
              onClick={()=> handleTargetContact(item.number)} 
              className={`contacts__item ${item.number === '79661608099' && 'contacts__item_g' }`
            }>
              <span>{item.number} {item.number === '79661608099' && 'Цыганков Григорий'}</span>
            </button>
          })
          :
          <span>нет ни одного контакта</span>
        }
        </div>
      </>
    }
  </aside>
}

export default Aside