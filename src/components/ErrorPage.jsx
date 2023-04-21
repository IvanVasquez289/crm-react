import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div className=' space-y-8'>
        <h1 className=' text-blue-800 font-extrabold text-center text-4xl mt-20'>CRM - Clientes</h1>
        <p className=' text-center'>Hubo un error</p>
        <p className=' text-center'> {error.message || error.statusText} </p>
    </div>
  )
}

export default ErrorPage