import { BeatLoader } from 'react-spinners'

const Preloader = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <BeatLoader color='blue' />
    </div>
  )
}

export default Preloader