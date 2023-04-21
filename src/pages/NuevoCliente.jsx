import { useNavigate, Form , useActionData, redirect} from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarClientes } from "../data/clientes"

export async function action({request}){

  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')

  // console.log(datos);


  const errores = []

  // Validacion
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errores.push('El email es invalido')
  }

  // retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores
  }

  await agregarClientes(datos)

  return redirect('/');
  
}

const NuevoCliente = () => {
  const navigate = useNavigate()
  const errores = useActionData()

  console.log(errores)
  return (
    <>
      <h1 className=" text-blue-900 font-black text-3xl">Nuevo cliente</h1>
      <p className="mt-3 text-2xl">Llena todos los campos para agregar un nuevo cliente</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-900 text-white px-5 py-1 rounded-md text-lg'
          onClick={()=> navigate('/') }
        >
          Volver
        </button>
      </div>

    
      <div className="bg-white shadow-md w-3/4 mx-auto px-5 py-10 rounded mt-6">

        {errores?.length && errores.map( (error, i)=> <Error key={i}> {error} </Error> ) }

        <Form
          method="post"
          noValidate
        >
          <Formulario/>
          <input 
            type="submit" 
            value="Enviar formulario" 
            className=" bg-blue-800 w-full p-2 rounded text-white uppercase font-bold mt-2"/>
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente