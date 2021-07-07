/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import { useEffect } from 'react'

const Notification = ({ errorMessage, info, setInfo, setErrorMessage }) => {
  useEffect(() => {
    if (errorMessage || info) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
        setInfo(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage, info])

  return (
    <div>
      { errorMessage ?

        <div className="error">{errorMessage}</div>
        : info ?
          <div className="info">{info}</div>
          :
          null}
    </div>
  )
}

export default Notification