import { useState, useEffect } from "react"
import Alerta from '../components/Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente } = usePacientes()

  useEffect(() => {

    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(new Date(paciente.fecha).toISOString().slice(0, 10))
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }

  }, [paciente])

  const handleSubmit = e => {

    e.preventDefault()

    //validar el formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true
      })
    }    

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id})

    if(id){
      setAlerta({
        msg: 'Guardado Correctamente'
      })
    }else{
      setAlerta({
        msg: 'Agregado Correctamente'
      })
    }
    
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')

  }

  const { msg } = alerta;

  return (

    <>

      <h2 className="font-black lg:text-3xl text-center text-2xl">Administrador de Pacientes</h2>

      <p className="text-xl text-center mb-10 mt-5">Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta 
          alerta={alerta}
        />} 
        <div className="mb-5">
          <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
          >Mascota</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="outline-indigo-800 border-2 border-indigo-600 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="outline-indigo-800 border-2 border-indigo-600 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
          >E-Mail</label>
          <input
            id="email"
            type="email"
            placeholder="E-Mail del Propietario"
            className="outline-indigo-800 border-2 border-indigo-600 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha Alta</label>
          <input
            id="fecha"
            type="date"
            className="outline-indigo-800 border-2 border-indigo-600 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Síntomas</label>
          <textarea
            id="sintomas"
            type="text"
            placeholder="Describe los Síntomas"
            className="outline-indigo-800 border-2 border-indigo-600 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ id ? 'Guardar Cambios' : 'Agregar Paciente' }
        />
      </form>
    </> 

  )
  
}

export default Formulario