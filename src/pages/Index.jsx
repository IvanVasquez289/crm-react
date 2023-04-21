import { useLoaderData } from "react-router-dom";
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";

export async function loader() {
  const clientes = await obtenerClientes()
  console.log(clientes)
  return clientes 
}

const Index = () => {
  const clientes = useLoaderData();


  return (
    <>
      <h1 className=" text-blue-900 font-black text-3xl">Clientes</h1>
      <p className="mt-3 text-2xl">Administra tus clientes</p>

      {clientes.length > 0 ? (
        <table className=" w-full  mt-5 table-auto shadow-md bg-white">
          <thead className=" bg-blue-900 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map(cliente => (
             <Cliente
              cliente={cliente}
              key= {cliente.id}
             />
            ) )}
          </tbody>
        </table>
      ) : (
        <p className=" text-center">No hay clientes aun</p>
      ) }
    </>
  );
};

export default Index;
