import { Avatar } from '@mantine/core'
import './details.css'
import { randomColor } from '../../utils/color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Button, IconButton, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateContact } from '../../features/contacts/action'
import { CircularProgress } from '@mui/material'
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined'

function ContactDetails({ contact }) {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const [emailKeys, setEmailKeys] = useState(
    Object.keys(contact).filter((key) => key.startsWith('email'))
  )

  const [phoneKeys, setPhoneKeys] = useState(
    Object.keys(contact).filter((key) => key.startsWith('phone'))
  )

  const initialMails = useMemo(
    () => initialEmails(emailKeys, contact),
    [emailKeys, contact]
  )

  const initialPhones = useMemo(
    () => initialPhonesF(phoneKeys, contact),
    [phoneKeys, contact]
  )

  const [emails, setEmails] = useState(initialMails)
  const [phones, setPhones] = useState(initialPhones)

  const hasChanges =
    Object.values(initialMails).join() !== Object.values(emails).join() ||
    Object.values(initialPhones).join() !== Object.values(phones).join()

  const submit = async () => {
    setLoading(true)
    const _phones = Object.values(phones)
      .filter((value) => Boolean(value))
      .map((phone) => ({ phone }))
    dispatch(updateContact({ key: 'phones', value: _phones, id: contact.id }))
      .then(() => {
        const _emails = Object.values(emails).filter((value) => Boolean(value))
        dispatch(
          updateContact({ key: 'emails', value: _emails, id: contact.id })
        )
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let _phones = { ...phones }
    for (const key of Object.keys(_phones)) {
      const value = _phones[key]
      if (!value) {
        delete _phones[key]
      }
    }
    setPhones(_phones)
  }, [phones])

  useEffect(() => {
    let _emails = { ...emails }
    for (const key of Object.keys(_emails)) {
      const value = _emails[key]
      if (!value) {
        delete _emails[key]
      }
    }
    setEmails(_emails)
  }, [emails])

  return (
    <div className="flex flex-col min-h-[85vh]">
      <div className="flex items-center border border-black/40 rounded-lg p-2">
        <Avatar
          color={randomColor()}
          className="w-16 h-16 rounded-full text-base mr-3"
          radius="lg"
        >
          {contact.first_name[0]}
          {contact.last_name ? contact.last_name[0] : ''}
        </Avatar>
        <h3>{`${contact.first_name} ${contact.middle_name || ''} ${
          contact.last_name || ''
        }`}</h3>
      </div>
      <div className="flex flex-col mt-4 px-4 items-start">
        <div>
          <FontAwesomeIcon
            icon={faEnvelope}
            className=" text-gray-500 font-semibold hover:text-blue-800 mr-3"
          />
          <span>Email</span>
          {emailKeys.length === 0 && (
            <button
              onClick={() => setEmailKeys([...emailKeys, `email_1`])}
              className="text-white bg-blue-500 ml-3 rounded-full hover:scale-105"
            >
              <Add />
            </button>
          )}
        </div>
        <div className="flex flex-col w-full">
          {emailKeys.map((key, index) => (
            <div key={index} className="flex items-end mb-3">
              <TextField
                id={key}
                placeholder={`Email ${index + 1}`}
                type="email"
                variant="standard"
                className="w-[80%]"
                value={emails[key]}
                onChange={(e) =>
                  setEmails({ ...emails, [key]: e.target.value })
                }
              />
              {emailKeys.length - 1 === index && emailKeys.length <= 3 && (
                <button
                  onClick={() =>
                    setEmailKeys([...emailKeys, `email_${index + 2}`])
                  }
                  className="text-white bg-blue-500 ml-3 rounded-full hover:scale-105"
                >
                  <Add />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-4 px-4 items-start">
        <div>
          <FontAwesomeIcon
            icon={faPhone}
            className=" text-gray-500 font-semibold hover:text-blue-800 mr-3"
          />
          <span>Phones</span>
          {phoneKeys.length === 0 && (
            <button
              onClick={() => setPhoneKeys([...phoneKeys, `phone_1`])}
              className="text-white bg-blue-500 ml-3 rounded-full hover:scale-105"
            >
              <Add />
            </button>
          )}
        </div>
        <div className="flex flex-col w-full">
          {phoneKeys.map((key, index) => (
            <div key={index} className="flex items-end mb-3">
              <TextField
                id={key}
                placeholder={`Phone ${index + 1}`}
                type="tel"
                variant="standard"
                className="w-[80%]"
                value={phones[key]}
                onChange={(e) =>
                  setPhones({
                    ...phones,
                    [key]: e.target.value,
                  })
                }
              />
              {phoneKeys.length - 1 === index && phoneKeys.length <= 3 && (
                <button
                  onClick={() =>
                    setPhoneKeys([...phoneKeys, `phone_${index + 2}`])
                  }
                  className="text-white bg-blue-500 ml-3 rounded-full hover:scale-105"
                >
                  <Add />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
   
      <div className="flex-grow my-4"></div>
      <Button
        variant="contained"
        disabled={!hasChanges}
        onClick={() => submit()}
      >
        Save{' '}
        {loading && (
          <span className="ml-2">
            <CircularProgress style={{ color: 'white' }} size={20} />
          </span>
        )}
      </Button>
    </div>
  )
}

function initialEmails(emailKeys, contact) {
  let initial = {}
  for (const key of emailKeys) {
    if (contact[key]) initial[key] = contact[key]
  }
  return initial
}

function initialPhonesF(emailKeys, contact) {
  let initial = {}
  for (const key of emailKeys) {
    if (contact[key]) initial[key] = contact[key]
  }
  return initial
}

export default ContactDetails
