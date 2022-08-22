import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const {cerrarSesion} = useAuth()

    return (

        <header className="py-10 bg-indigo-900">
            <div className="container mx-auto flex flex-col justify-between lg:flex-row items-center">
                <h1 className="font-bold text-2xl text-indigo-400 text-center">Administrador de Pacientes de {''} 
                <span className="text-white font-black">Veterinaria</span></h1>
                <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                    <Link to="/admin" className="text-white text-sm uppercase font-bold">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold">
                        Perfil</Link>
                    <button type="button" title="Cerrar Sesión" onClick={cerrarSesion} className="text-white text-sm uppercase font-bold items-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></button>
                </nav>
            </div>
        </header>

    )

}

export default Header