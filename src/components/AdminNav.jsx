import { Link } from "react-router-dom"

const AdminNav = () => {

  return (

    <nav className="flex gap-5">
        <Link
            to="/admin/perfil"
            className="font-bold uppercase text-indigo-700 underline underline-offset-4 hover:text-gray-500"
        >Perfil</Link>
        <Link
            to="/admin/cambiar-password"
            className="font-bold uppercase text-indigo-700 underline underline-offset-4 hover:text-gray-500"
        >Cambiar Password</Link>
    </nav>
    
  )

}

export default AdminNav