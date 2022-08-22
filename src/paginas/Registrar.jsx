import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [email, setEmail] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {

    e.preventDefault();

    if([nombre, password, repetirPassword, email].includes('')){
      setAlerta({msg: 'Hay Campos Vacíos', error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Las Contraseñas no son Iguales', error: true});
      return;
    }

    if(password.length < 7){
      setAlerta({msg: 'Contraseña muy Corta, mínimo 7 caracteres', error: true});
      return;
    }

    setAlerta({});

    //Crear el usuario en el API
    try {

      await clienteAxios.post('/veterinarios', {nombre, email, password});
      setAlerta({
        msg: 'Creado Correctamente, revisa tu EMAIL',
        error: false
      });
      setNombre('');
      setPassword('');
      setRepetirPassword('');
      setEmail('');
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  };

  const { msg } = alerta;

  return (

    <>
      <div>
        <h1 className="text-indigo-600  font-black text-6xl">
          Crea tu Cuenta y Administra tus
          <span className="text-black"> Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta 
          alerta={alerta}
        />} 
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input 
              type="text"
              placeholder="Tu Nombre Completo"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl
              outline-indigo-700"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input 
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl
              outline-indigo-700"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input 
              type="password"
              placeholder="Repite Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl
              outline-indigo-700"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email"
              placeholder="Tu Email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl
              outline-indigo-700"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 rounded-xl
            text-white uppercase font-bold mt-5 hover:cursor-pointer 
            hover:bg-indigo-800 px-10"
          />
        </form>
        <nav className="mt-5 lg:flex lg:justify-between">
          <p className="block text-center my-5 text-gray-500">¿Tienes una cuenta?
          <Link className='text-indigo-700 font-bold' to="/"> Inicia Sesión</Link></p>
          <Link className="block text-center my-5 text-gray-500 font-bold" to="/olvide-password">Olvidé mi Password</Link>
        </nav>
      </div> 
    </>

  )

}

export default Registrar