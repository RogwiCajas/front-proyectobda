import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Input } from  'reactstrap';
import axios from "axios"; 

import { fetchCrearRegistro, fetchEliminarRegistro, fetchRegistro, fetchUpdateRegistro } from './api';

const id= '6199e0501896218cea96a9a9'
class App extends React.Component{
  state = {
    data: [],
    modalInsertar: false,
    form:{
      _id: '',
      unique_key: '',
      taxi_id: '',
      company: '',
      trip_total: 6.05,
    },
    busqueda: {
      idBuscar: '',
    },
    tipoModal: 'insertar',
    modalEliminar: false,

  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  peticionGET= (id) => {
    fetchRegistro(id).then(response =>{
      this.setState({data: response})
    }).catch(error=>{
      console.log(error.message);
    })
  }
  peticionPost=async()=>{
   //delete this.state.form._id;
    fetchCrearRegistro(this.state.form.unique_key, this.state.form.taxi_id, this.state.form.company, this.state.form.trip_total ).then(response=>{
      this.modalInsertar();
      this.peticionGET(this.state.busqueda.idBuscar);
    }).catch(error=>{
      console.log(error.message);
    })

  }

  peticionPut=async()=>{
    fetchUpdateRegistro(this.state.form._id,this.state.form.unique_key, this.state.form.taxi_id, this.state.form.company, this.state.form.trip_total ).then(response=>{
      this.modalInsertar();
      this.peticionGET(this.state.busqueda.idBuscar);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionDelete=()=>{
    fetchEliminarRegistro(this.state.form._id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGET('22');
    }).catch(error=>{
      console.log(error.message);
    })
  }

  handleChangeBuscar = async e =>{
    e.persist();
    await this.setState({
      busqueda:{
        ...this.state.busqueda,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.busqueda);
  }

  obtenerRegistro = async => {
    this.peticionGET(this.state.busqueda.idBuscar)
  }
  
  seleccionarRegistro = () =>{
    this.setState({
      tipoModal:'actualizar',
      form:{
        _id: this.state.data._id?this.state.data._id:'empty',
        unique_key: this.state.data.unique_key?this.state.data.unique_key:'empty',
        taxi_id: this.state.data.taxi_id?this.state.data.taxi_id:'empty',
        company: this.state.data.company?this.state.data.company:'empty',
        trip_total: this.state.data.trip_total?this.state.data.trip_total:0,
      }
    })
  }
  handleChange = async e =>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  

  /*componentDidMount() {
    this.peticionGET('6199e0501896218cea96a9a9');
  }*/

  render(){
    const {form} =this.state;
    return(
      <div className="App">
      <br /><br /><br />
      <button className="btn btn-success" onClick={() =>{this.setState({ tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar registro</button>
      <br/><br/>

      <div style={{display: 'flex'}}>
        <Input id='buscar_id' name='idBuscar' type='text' placeholder='ingresar _id' onChange={this.handleChangeBuscar}/>
        <button id='buscar' className="btn btn-success" onClick={this.obtenerRegistro} >Buscar</button>  
      </div>

      <table className="table ">
        <thead>
          <tr>
            <th>Document Id</th>
            <th>Company</th>
            <th>Monto </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {this.state.data!==null &&
          <tr>
            
            <th>{this.state.data._id!==(null || undefined)?this.state.data._id:'empty'}</th>
            <th>{this.state.data.company!==(null || undefined)?this.state.data.company:'empty'}</th>
            <th>{this.state.data.trip_total!==(null || undefined)?this.state.data.trip_total:0}</th>
            
            {this.state.data._id !==undefined &&
            <th><button className="btn btn-success" onClick={()=>{this.seleccionarRegistro(); this.modalInsertar()}}>editar</button>
            <button className="btn btn-danger" onClick={()=>{this.seleccionarRegistro(); this.setState({modalEliminar: true})}} >Borrar</button>
            </th>
             }
             
          </tr>
        }
        </tbody>
      </table>
      
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="_id">ID</label>
            <input className="form-control" type="text" name="_id" id="_id" readOnly onChange={this.handleChange} value={form?form._id:'autoincrementable'}/>
            <br />
            <label htmlFor="unique_key">Unique key</label>
            <input className="form-control" type="text" name="unique_key" id="unique_key" onChange={this.handleChange} value={form?form.unique_key:''} />
            <br />
            <label htmlFor="taxi_id">taxi id</label>
            <input className="form-control" type="text" name="taxi_id" id="taxi_id" onChange={this.handleChange} value={form?form.taxi_id:''} />
            <br />
            <label htmlFor="company">Compania</label>
            <input className="form-control" type="text" name="company" id="company" onChange={this.handleChange} value={form?form.company:''} />
            <br />
            <label htmlFor="trip_total">Monto</label>
            <input className="form-control" type="number" name="trip_total" id="trip_total" step="0.01" min="0" onChange={this.handleChange}  value={form?form.trip_total:''}/>
            <br />

          </div>
        </ModalBody>

        <ModalFooter>
          {this.state.tipoModal==='insertar'?
            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
            Insertar
          </button>: 
          <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
            Actualizar
          </button>
          }
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
        </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               ¿Eliminar Registro :  {form && form._id} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
        </Modal>


      </div>
    )
  }
}

export default App;
