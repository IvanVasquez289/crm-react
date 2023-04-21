import { Outlet , Link, NavLink,useLocation} from "react-router-dom"


const Layout = () => {

  const location = useLocation()
  return (
    <div className=" md:flex md:min-h-screen">
        <aside className=" md:w-1/4 bg-blue-900 px-5 py-10">
            <h2 className=" text-white font-black text-center text-3xl"> CRM - Clientes </h2>

            <nav className="mt-10">
                <Link 
                    className={` ${location.pathname==='/' ? 'text-blue-300' : 'text-white'} block text-2xl hover:text-blue-300`}
                    to="/">Clientes
                </Link>
                <Link 
                    className={` ${location.pathname==='/clientes/nuevo' ? 'text-blue-300' : 'text-white'} block text-2xl hover:text-blue-300`}
                    to="/clientes/nuevo">Nuevo Cliente
                </Link>
              
            </nav>
        </aside>

        <main className=" md:w-3/4 md:h-screen overflow-scroll p-10">
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout