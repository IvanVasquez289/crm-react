import { useNavigate , Form, redirect} from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({params}){
  await eliminarCliente(params.id)
  return redirect('/')
}

const Cliente = ({ cliente }) => {
  const { nombre, telefono, email, empresa, id } = cliente;
  const navigate = useNavigate()
  return (
    <tr className="border-b">
      <td className="p-4 space-y-1">
        <p className=" text-2xl text-gray-800"> {nombre} </p>
        <p>
          {" "}
          <em>{empresa}</em>{" "}
        </p>
      </td>

      <td className="p-4 space-y-1">
        <p className=" text-gray-800">
          {" "}
          <span className="font-bold">Email: </span> {email}{" "}
        </p>
        <p className=" text-gray-800">
          {" "}
          <span className="font-bold">TEL: </span> {telefono}{" "}
        </p>
      </td>

      <td className="p-4 flex gap-4">
        <Form
         method="post"
         action={`/clientes/${id}/eliminar`}
         onSubmit={(e)=>{
          // este prevent default detiene la funcion action, por lo tanto no se elimina
          if(!confirm('Deseas eliminar este registro?')){
            e.preventDefault()
          }
         }}
        >
          <button 
            type="submit" 
            className=" text-red-500 font-bold hover:text-red-700"
            
            >Eliminar
          </button>
        </Form>
        <button 
          type="button" 
          className=" text-blue-500 font-bold hover:text-blue-700"
          onClick={()=> navigate(`/clientes/${id}/editar`) }
          >Editar</button>
      </td>
    </tr>
  );
};

export default Cliente;
