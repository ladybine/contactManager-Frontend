import { useState } from 'react'
export default function usePop() {
  const [showPopup, setShowPopup] = useState(false)
  const openPopup = () => {
    setShowPopup(!showPopup)
  }

  return {
    showPopup,
    openPopup,
  }
}
