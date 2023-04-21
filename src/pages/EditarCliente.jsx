import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { obtenerCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import { actualizarCliente } from "../data/clientes";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.id);

  // Cuenta como return pq detiene la ejecucion
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }
  // console.log(cliente)
  return cliente;
}

export async function action({ params, request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  const errores = [];

  // Validacion
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email es invalido");
  }

  // retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  //Si llega hasta aqui es pq paso la validacion
  await actualizarCliente(params.id, datos);

  return redirect('/');
}

const EditarCliente = () => {

  const cliente = useLoaderData();
  const navigate = useNavigate(); 
  const errores = useActionData();
  console.log(cliente);

  return (
    <>
      <h1 className=" text-blue-900 font-black text-3xl">Nuevo cliente</h1>
      <p className="mt-3 text-2xl">
        Aqui podras modificar los datos de un cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-900 text-white px-5 py-1 rounded-md text-lg"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow-md w-3/4 mx-auto px-5 py-10 rounded mt-6">
        {errores?.length && errores.map( (error, i)=> <Error key={i}> {error} </Error> ) }

        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            value="Guardar cambios"
            className=" bg-blue-800 w-full p-2 rounded text-white uppercase font-bold mt-2"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
