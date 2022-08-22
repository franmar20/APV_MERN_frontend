import { useState } from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {

      e.preventDefault();

      if(email === '' || email.length < 6){

        setAlerta({
          msg: 'El Email es Obligatorio',
          error: true
        });

      }

      try {

        const { data } = await clienteAxios.post('/veterinarios/olvide-password', {email});

        setAlerta({
          msg: data.msg,
          error: false
        });
        
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
            Recupera tu Contraseña y Administra tus
            <span className="text-black"> Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl
              outline-indigo-700"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value="Recuperar Contraseña"
            className="bg-indigo-700 w-full py-3 rounded-xl
            text-white uppercase font-bold mt-5 hover:cursor-pointer 
            hover:bg-indigo-800 md:w-auto px-10"
          />
        </form>
        <nav className="mt-5 lg:flex lg:justify-between">
          <p className="block text-center my-5 text-gray-500">¿Tienes una cuenta?
          <Link className='text-indigo-700 font-bold' to="/"> Inicia Sesión</Link></p>
          <p className="block text-center my-5 text-gray-500">¿No tienes una cuenta?
          <Link className='text-indigo-700 font-bold' to="/registrar"> Regístrate</Link></p>
        </nav>
      </div> 
      </>
  
    )
  }

export default OlvidePassword