import React from 'react'

const Error = ({children}) => {
  return (
    <div className=' bg-red-500 text-white font-bold p-3 mx-auto mb-6 rounded text-center'>
        {children}
    </div>
  )
}

export default Error