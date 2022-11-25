import React from 'react'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Crear = (props) => {
    const navigate = useNavigate()
    //hooks
    const [categoria, setCategoria] = React.useState('')
    const [servicio, setServicio] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [ubicacion, setUbicacion] = React.useState('')
    const [error, setError] = React.useState(null)

    const date = new Date()

    //obtener datos
    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await db.collection(props.user.email).get()
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    }, [])

    //funcion guardar
    const guardar = async (e) => {
        e.preventDefault()
        if (!categoria) {
            setError('Debe seleccionar categoria')
            return
        }
        if (!servicio) {
            setError('Debe seleccionar servicio')
            return
        }
        if (!descripcion.trim()) {
            setError('Ingrese descripción de la petición')
            return
        }
        if (!ubicacion.trim()) {
            setError('Ingrese ubicación de la petición')
            return
        }
        //agregar a firebase
        try {
            const hoy = date.getDate()
            const mes = date.getMonth() + 1
            const fecha = hoy + '-' + mes
            const nuevaPeticion = { categoria, servicio, descripcion, ubicacion, fecha }
            await db.collection(props.user.email).add(nuevaPeticion)
        } catch (error) {
            console.log(error)
        }
        //limpiar estados
        setCategoria('')
        setServicio('')
        setDescripcion('')
        setUbicacion('')
        setError(null)
        //redireccionar
        navigate('/consultas')
    }

    //funcion cancelar
    const cancelar = () => {
        setCategoria('')
        setServicio('')
        setDescripcion('')
        setUbicacion('')
        setError(null)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-12">
                    <div className='card my-2 border-dark'>
                        <div className='card-header text-bg-dark'>
                            <h2 className='text-center'>Registro de Requerimientos</h2>
                        </div>
                        <div className='card-body bg-card'>
                            {
                                error ? <div className="alert alert-danger" role='alert'>
                                    {error}
                                </div> : null
                            }
                            <select className='form-select my-2'
                                onChange={(e) => { setCategoria(e.target.value) }}
                                value={categoria}>
                                <option selected value={''}>Seleccione Categoria</option>
                                <option value="Mantenimiento inmuebles">Mantenimiento Inmuebles</option>
                                <option value="Mantenimiento muebles">Mantenimiento Muebles</option>
                                <option value="Servicios">Servicios</option>
                            </select>
                            {
                                categoria == 'Mantenimiento inmuebles' &&
                                <select className='form-select my-2'
                                    onChange={(e) => { setServicio(e.target.value) }}
                                    value={servicio}>
                                    <option selected value={''}>Seleccione Servicio</option>
                                    <option value='Baño'>Baño</option>
                                    <option value='Cielo raso'>Cielo Raso</option>
                                    <option value='Eléctrico'>Eléctrico</option>
                                    <option value='Pared'>Pared</option>
                                    <option value='Puerta'>Puerta</option>
                                </select>
                            }
                            {
                                categoria == 'Mantenimiento muebles' &&
                                <select className='form-select my-2'
                                    onChange={(e) => { setServicio(e.target.value) }}
                                    value={servicio}>
                                    <option selected value={''}>Seleccione Servicio</option>
                                    <option value='Aire acondicionado'>Aire acondicionado</option>
                                    <option value='Archivador'>Archivador</option>
                                    <option value='Puesto de Trabajo'>Puesto de Trabajo</option>
                                    <option value='Silla'>Silla</option>
                                </select>
                            }
                            {
                                categoria == 'Servicios' &&
                                <select className='form-select my-2'
                                    onChange={(e) => { setServicio(e.target.value) }}
                                    value={servicio}>
                                    <option selected value={''}>Seleccione Servicio</option>
                                    <option value='Aseo'>Aseo</option>
                                    <option value='Transporte'>Transporte</option>
                                    <option value='Vigilancia'>Vigilancia</option>
                                </select>
                            }
                            <form onSubmit={guardar}>
                                {
                                    servicio ? <div className='form-floating'>
                                        <input type="text" className='form-control my-2'
                                            placeholder='Descripción de la Petición'
                                            onChange={(e) => { setDescripcion(e.target.value) }}
                                            value={descripcion} />
                                        <label for="descripcion">Descripción de la Petición</label>
                                    </div> : null
                                }
                                {
                                    servicio ? <div className='form-floating'>
                                        <input type="text" className='form-control my-2'
                                            placeholder='Ubicación'
                                            onChange={(e) => { setUbicacion(e.target.value) }}
                                            value={ubicacion} />
                                        <label for="ubicacion">Ubicacion</label>
                                    </div> : null
                                }
                                <div className='d-grid gap-2'>
                                    <button className='btn btn-dark border-dark my-1' type='submit'>Guardar</button>
                                </div>
                            </form>
                            <div className='d-grid gap-2'>
                                <button className='btn btn-danger border-dark my-1' onClick={cancelar}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Crear