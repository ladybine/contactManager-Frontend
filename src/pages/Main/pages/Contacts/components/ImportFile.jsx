import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-tailwind/react'

const ImportFile = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const inputFile = useRef()

  const submitFile = (e) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    dispatch(uploadFile(file)).finally(() => {
      setLoading(false)
      inputFile.current.value = ''
    })
  }

  return (
    <>
      <Button
        className="mr-5"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
      >
        <label htmlFor="file" className="cursor-pointer">
          <FontAwesomeIcon icon={faFileImport} color="white" className="mr-2" />
          {loading ? 'Loading...' : 'Import a file'}
        </label>
      </Button>
      <input
        className="hidden"
        type="file"
        name="file"
        id="file"
        onChange={submitFile}
        ref={inputFile}
      />
    </>
  )
}

export default ImportFile
