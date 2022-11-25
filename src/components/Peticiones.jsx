import React from 'react'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

const Peticiones = (props) => {
    //hooks
    const [categoria, setCategoria] = React.useState('')
    const [servicio, setServicio] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [ubicacion, setUbicacion] = React.useState('')
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)
    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)

    const date = new Date()

    //obtener datos
    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const data = await db.collection(props.user.email).get()
                const arrayData = data.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
                setLista(arrayData)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    }, [])

    //funcion cancelar
    const cancelar = () => {
        setCategoria('')
        setServicio('')
        setDescripcion('')
        setUbicacion('')
        setId('')
        setError(null)
        setModoEdicion(false)
    }

    //eliminar dato
    const eliminarDato = async (id) => {
        try {
            await db.collection(props.user.email).doc(id).delete()
            const listraFiltrada = lista.filter((elemento) => elemento.id !== id)
            setLista(listraFiltrada)
        } catch (error) {
            console.log(error)
        }
    }

    //funcion para habilitar el modo edicion
    const editar = (elemento) => {
        setModoEdicion(true)
        setCategoria(elemento.categoria)
        setServicio(elemento.servicio)
        setDescripcion(elemento.descripcion)
        setUbicacion(elemento.ubicacion)
        setId(elemento.id)
    }

    //funcion editar peticion
    const editarPeticion = async (e) => {
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
        //editar en firebase
        try {
            const hoy = date.getDate()
            const mes = date.getMonth() + 1
            const fecha = hoy + '-' + mes
            await db.collection(props.user.email).doc(id).update({ categoria, servicio, descripcion, ubicacion, fecha })
            const listaEditada = lista.map((elemento) => elemento.id === id ?
                { id, categoria, servicio, descripcion, ubicacion, fecha } : elemento)
            //actualizar lista
            setLista(listaEditada)
            //limpiar estados
            setCategoria('')
            setServicio('')
            setDescripcion('')
            setUbicacion('')
            setId('')
            setError(null)
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    {
                        modoEdicion ? <div className='row'>
                            <div className="col-12">
                                <div className='card my-2 border-dark'>
                                    <div className='card-header text-bg-dark'>
                                        <h2 className='text-center'>Editar Petición</h2>
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
                                        <form onSubmit={editarPeticion}>
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
                                                <button className='btn btn-success border-dark my-1' type='submit'>Editar</button>
                                            </div>
                                        </form>
                                        <div className='d-grid gap-2'>
                                            <button className='btn btn-danger my-1 border-dark' onClick={cancelar}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    }
                    <ul className="list-group my-2">
                        <li className="list-group-item border-dark text-bg-dark">
                            <h2 className="text-center">Lista Peticiones</h2>
                        </li>
                        <li className="list-group-item border-dark text-bg-dark">
                            <h4 className="text-center">Categoría ; Servicio ; Descripción ; Ubicación ; Fecha</h4>
                        </li>
                        {
                            lista.map((elemento) => (
                                <li className="list-group-item border-dark" key={elemento.id}>{elemento.categoria} ; {elemento.servicio} ; {elemento.descripcion} ; {elemento.ubicacion} ; {elemento.fecha}
                                    <button className="btn btn-danger float-end mx-2 border-dark"
                                        onClick={() => eliminarDato(elemento.id)}>Eliminar</button>
                                    <button className="btn btn-success float-end mx-2 border-dark"
                                        onClick={() => editar(elemento)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="d-grid gap-2">
                        <Link className='btn btn-primary mr-2 border-dark' to='/peticion'>Crear Petición</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Peticiones