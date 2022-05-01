
import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes,setPacientes, paciente, setPaciente}) => {

        //VARIABLE, //FUNCION O CALLBACK 
        //El useState inicia vacío, al momento de escribir en elinput se irá llenando
    const [nombre,setNombre] = useState("");
    const [propietario,setPropietario] = useState("");
    const [email,setEmail] = useState("");
    const [fecha,setFecha] = useState("");
    const [sintomas,setSintomas] = useState("");

    const [error, setError] = useState(false);

    useEffect(() => {
      if (Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }
    }, [paciente])


  



    
    const generarId = () => {
      const random = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);

      return random+fecha;
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // VALIDACIÓN DE FORMULARIO
      if([nombre,propietario, email,fecha,sintomas].includes("")){
        // Si los campos están vacíos regresamos un true y no enviamos el formulario
          setError(true);
          return;
      }

      // Si los campos del formulario están llenos, retornamos en el state un false para enviar el formulario
      setError(false);

      //Objeto de paciente
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }
      
      if(paciente.id){
        // Editando el registro
        objetoPaciente.id = paciente.id;
        const pacientesActualizados = pacientes.map((pacienteState) =>  pacienteState.id === paciente.id? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados);
        setPaciente({})



      }else{
        //Nuevo registro
        objetoPaciente.id =generarId();
      setPacientes([...pacientes, objetoPaciente]);
      }


      // Reiniciar el form
      setNombre("")
      setPropietario("")
      setEmail("")
      setFecha("")
      setSintomas("")
    }

  return (
   <div className="md:w-1/2 lg:w-2/5 mx-5">
   <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
   <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {""}
   <span className="text-indigo-600 font-bold ">Administralos</span>
   </p>

    <form onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-lg py-10 px-5" action="">

      {error && <Error>Todos los campos son obligatorios</Error>}

      <div className="mb-5">
      <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
        Nombre mascota </label>
      <input 
      id="mascota"
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      type="text"
      placeholder="Nombre de la mascota"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
       />
       </div>

      <div className="mb-5">
      <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
        Nombre propietario</label>
      <input 
      id="propietario"
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      type="text"
      placeholder="Nombre del propietario"
      value={propietario}
      onChange={(e) => setPropietario(e.target.value)}
       />
       </div>

      <div className="mb-5">
      <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
        Email</label>
      <input 
      id="email"
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      type="email"
      placeholder="Email contacto propietario"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
       />
       </div>
      
      <div className="mb-5">
      <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
        Alta</label>
      <input 
      id="alta"
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      type="date"
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      />
       </div>


      <div className="mb-5">
      <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
        Síntomas</label>
      <textarea id="sintomas"
      className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
       name=""
       placeholder="Describe los síntomas"
       value={sintomas}
       onChange={(e) => setSintomas(e.target.value)}
       ></textarea>
       </div>

       <input 
       type="submit" value={paciente.id ? "Actualizar paciente": "Agregar paciente"}
       className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        
      />


    </form>




   </div>
  )
}

export default Formulario