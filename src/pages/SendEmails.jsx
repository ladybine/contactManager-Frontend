import { faL } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/dist/style.css'

export default function SendEmails() {
  const [emails, setEmails] = useState([])
  const [focused, setFocused] = useState(false)
  return (
    <form>
      <h3>Emails</h3>
      <ReactMultiEmail
        placeholder="input your email"
        emails={emails}
        onChange={(_emails) => {
          setEmails(_emails)
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-handle>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                x
              </span>
            </div>
          )
        }}
      />
      <br />
      <h4>value</h4>
      <h3>Focused:{focused ? 'true' : 'false'}</h3>
      <p>{emails.join(',') || 'empty'}</p>
    </form>
  )
}
