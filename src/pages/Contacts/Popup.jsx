import React from 'react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './details.css'
import PropTypes from 'prop-types'

const Popup = (props) => {
  const [show, setShow] = useState(false)

  const closeHandler = (e) => {
    setShow(false)
    props.onClose(false)
  }
  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className="overlay"
    >
      <div className="contactDetails">
        <div className="details2">
          <h4>{props.title}</h4>

          <button className="modal-close-button" onClick={closeHandler}>
            <span>&times;</span>
          </button>
        </div>
        <div>rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</div>
        <div className="">aaaaaaaaaaaaaaaaaaaaa</div>
      </div>
      
    </div>
  )
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default Popup
