import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import M from 'materialize-css/dist/js/materialize.min.js'

import 'react-datepicker/dist/react-datepicker.css';


moment.updateLocale('en', {
    weekdaysMin : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
});
moment.updateLocale('en', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
});

class HastaCustomInput extends React.Component {

  render () {
    return (
      <a href="#/"
        className="btn waves-effect waves-light btn-small small calendarbtn"
        onClick={this.props.onClick}>
        <i className="material-icons left">event</i>
        {this.props.value}
      </a>
    )

  }
}

class DesdeCustomInput extends React.Component {

  render () {
    return (
      <a href="#/"
        className="btn waves-effect white waves-light black-text btn-small small calendarbtn"
        onClick={this.props.onClick}>
        <i className="material-icons left">event</i>
        {this.props.value}
      </a>
    )

  }
}




class NoteForm extends Component {
  constructor(props){
    super(props);
      this.state = {
        idselected:'',
        contentselected:'',
        nombre_1selected:'',
        nombre_2selected:'',
        nombre_3selected:'',
        rutselected:'',
        cargoselected:'',
        costoselected:'',
        bancoselected:'',
        cuentaselected:'',
        tipocuentaselected:'',
        correoselected:'',
        fecha_iselected:moment(),
        fecha_tselected:moment().add( 1 , 'months' ),
        estadoselected:'',
        servicioselected:'',
        clienteselected:'',
        proyectoselected:'',
        mongodbselected:'',

        tipogastotest:'',
      }
    this.addNote =this.addNote.bind(this);

    this.idselected = props.idselected;
    this.contentselected = props.contentselected;
    this.nombre_1selected = props.nombre_1selected;
    this.nombre_2selected = props.nombre_2selected;
    this.nombre_3selected = props.nombre_3selected;
    this.rutselected = props.rutselected;
    this.cargoselected = props.cargoselected;
    this.costoselected = props.costoselected;
    this.bancoselected = props.bancoselected;
    this.cuentaselected = props.cuentaselected;
    this.tipocuentaselected = props.tipocuentaselected;
    this.correoselected = props.correoselected;
    this.fecha_iselected = props.fecha_iselected;
    this.fecha_tselected = props.fecha_tselected;
    this.estadoselected = props.estadoselected;
    this.servicioselected = props.servicioselected;
    this.clienteselected = props.clienteselected;
    this.proyectoselected = props.proyectoselected;
    this.mongodbselected = props.mongodbselected;

    this.rstForm = this.rstForm.bind(this);
    this.handleChangef = this.handleChangef.bind(this);
    this.handleChange_fecha_i = this.handleChange_fecha_i.bind(this);
    this.handleChange_fecha_t = this.handleChange_fecha_t.bind(this);
    this.changeTipogasto = this.changeTipogasto.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      idselected:nextProps.idselected,
      contentselected:nextProps.contentselected,
      nombre_1selected:nextProps.nombre_1selected,
      nombre_2selected:nextProps.nombre_2selected,
      nombre_3selected:nextProps.nombre_3selected,
      rutselected:nextProps.rutselected,
      cargoselected:nextProps.cargoselected,
      costoselected:nextProps.costoselected,
      bancoselected:nextProps.bancoselected,
      cuentaselected:nextProps.cuentaselected,
      tipocuentaselected:nextProps.tipocuentaselected,
      correoselected:nextProps.correoselected,
      fecha_iselected:nextProps.fecha_iselected,
      fecha_tselected:nextProps.fecha_tselected,
      estadoselected:nextProps.estadoselected,
      servicioselected:nextProps.servicioselected,
      clienteselected:nextProps.clienteselected,
      proyectoselected:nextProps.proyectoselected,
      mongodbselected:nextProps.mongodbselected,

      tipogastotest :nextProps.proyectoselected,

    })


  }

  addNote(event){
    event.preventDefault()
      this.props.addNote(
        this.state.idselected,
        this.state.contentselected,
        this.state.nombre_1selected,
        this.state.nombre_2selected,
        this.state.nombre_3selected,
        this.state.rutselected,
        this.state.cargoselected,
        this.state.costoselected,
        this.state.bancoselected,
        this.state.cuentaselected,
        this.state.tipocuentaselected,
        this.state.correoselected,
        this.state.fecha_iselected,
        this.state.fecha_tselected,
        this.state.estadoselected,
        this.state.servicioselected,
        this.state.clienteselected,
        this.state.tipogastotest,
        this.state.mongodbselected

      );
    this.rstForm();
  }

  rstForm(){
    this.setState({
      idselected:'',
      nombre_1selected:'',
      nombre_2selected:'',
      nombre_3selected:'',
      rutselected:'',
      cargoselected:'',
      costoselected:'',
      bancoselected:'',
      cuentaselected:'',
      tipocuentaselected:'',
      correoselected:'',
      fecha_iselected:moment(),
      fecha_tselected:moment().add( 1 , 'months' ),
      estadoselected:'',
      servicioselected:'',
      clienteselected:'',
      proyectoselected:'',
      mongodbselected:'',

      tipogastotest:'',
    });
  }

  handleChangef(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  changeTipogasto(){
    const input =document.getElementById("autocomplete-input");
    var value = input.value;
    this.setState({
      proyectoselected:value,
      tipogastotest:value,
    });
    if(value !== "RRHH."){
      this.setState({
        nombre_3selected:'',
        cargoselected:'',
      });
    }
  }

  handleChange_fecha_i = (date) => {
  if(date!==null){
      this.setState({
        fecha_iselected:date
      });
      }
    }

  handleChange_fecha_t = (date) => {
  if(date!==null){
        this.setState({
          fecha_tselected:date
        });
      }
      }

returnfalse(){
  return false;
}

  render(){

    const dateTimeI= this.state.fecha_iselected;
    const dateTimeT= this.state.fecha_tselected;

    var inputsform="";
    var bdyinputsform="";



var stringTG ={"RRHH.":null,}



    this.props.TG.map( nwtg => {
    return  stringTG[nwtg] = null;
    });








    if(this.props.isproyect){


       M.Autocomplete.init(document.querySelectorAll('.autocomplete'),
       {
         data:stringTG,
         minLength:0,
         onAutocomplete: function(){
           document.getElementById("autocomplete-input").focus();
         }
       }
     );

     if(!this.state.tipogastotest){
       bdyinputsform = ""
     }

     if(this.state.tipogastotest){
     if(this.state.tipogastotest !== "RRHH."){
       bdyinputsform = (
         <div>
         <div className="input-field col s12 m6 l6 content-react-dp">
         <DatePicker
         customInput={<HastaCustomInput />}
         name='fecha_tselected'
         todayButton={"Hoy"}
         selected={moment(dateTimeT)}
         onChange={this.handleChange_fecha_t}
         dateFormat = "LL"
         peekNextMonth
         dropdownMode="select"
         required
         />
         <label className="active">Fecha de expiraciòn</label>
         </div>

         <div className="input-field col s12 m6 l6 ">
         <input
         id='Nombre_input'
         name='nombre_1selected'
         type="text"
         value={this.state.nombre_1selected}
         onChange={this.handleChangef}
         placeholder="Nombre de Gasto"
         required
         />
         <label className="active" htmlFor="Nombre_input">Nombre de Gasto</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='Apellido_p_input'
         name='nombre_2selected'
         type="text"
         value={this.state.nombre_2selected}
         onChange={this.handleChangef}
         placeholder="Compañia"
         required
         />
         <label className="active" htmlFor="Apellido_p_input">Compañia</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='rut_input'
         name='rutselected'
         type="text"
         value={this.state.rutselected}
         onChange={this.handleChangef}
         placeholder="Nº de cliente"
         required
         />
         <label className="active" htmlFor="rut_input">Nº de cliente</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='costo_input'
         name='costoselected'
         className="campo-numerico" type="number" min="1" pattern="^[0-9]+" onPaste={() => this.returnfalse} onDrop={() => this.returnfalse} autoComplete="off"
         value={this.state.costoselected}
         onChange={this.handleChangef}
         placeholder="Costo"
         required
         />
         <label className="active" htmlFor="costo_input">Costo</label>
         <span className="helper-text" data-error="wrong" data-success="right">{new Intl.NumberFormat("de-DE").format(this.state.costoselected)}</span>
         </div>

         <div className="input-field col s12 divider margin-none"></div>
         <div className="input-field col s12 margin-none padding-none">
         <h6 className="center margin-bottom-medium padding-none"><small>Datos de pago (*opcional)</small></h6>
         </div>

         <div className="input-field col s12 m6 l6 content-react-dp">
         <input
         id='mail_input'
         name='correoselected'
         type="text"
         value={this.state.correoselected}
         onChange={this.handleChangef}
         placeholder="E-mail"
         />
         <label className="active" htmlFor="mail_input">E-mail</label>
         </div>

         <div className="input-field col s12 m6 l6 content-react-dp">
         <input
         id='banco_input'
         name='bancoselected'
         type="text"
         value={this.state.bancoselected}
         onChange={this.handleChangef}
         placeholder="Banco"
         />
         <label className="active" htmlFor="banco_input">Banco</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='cuenta_input'
         name='cuentaselected'
         type="text"
         value={this.state.cuentaselected}
         onChange={this.handleChangef}
         placeholder="Nº de cuenta"
         />
         <label className="active" htmlFor="cuenta_input">Nº de cuenta</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='tipocuenta_input'
         name='tipocuentaselected'
         type="text"
         value={this.state.tipocuentaselected}
         onChange={this.handleChangef}
         placeholder="Tipo de cuenta"
         />
         <label className="active" htmlFor="tipocuenta_input">Tipo de cuenta</label>
         </div>

         </div>

       )
     }
     if(this.state.tipogastotest === "RRHH."){
       bdyinputsform = (
         <div>
         <div className="input-field col s12 margin-top-small padding-none">
         <div className="divider margin-bottom-medium"></div>
         </div>

         <div className="input-field col s12 m6 l6 content-react-dp">
         <DatePicker
         customInput={<DesdeCustomInput />}
         name='fecha_iselected'
         todayButton={"Hoy"}
         selected={moment(dateTimeI)}
         onChange={this.handleChange_fecha_i}
         dateFormat = "LL"
         peekNextMonth
         dropdownMode="select"
         required
         />
         <label className="active">Fecha de inicio</label>
         </div>

         <div className="input-field col s12 m6 l6 content-react-dp">
         <DatePicker
         customInput={<HastaCustomInput />}
         name='fecha_tselected'
         todayButton={"Hoy"}
         selected={moment(dateTimeT)}
         onChange={this.handleChange_fecha_t}
         dateFormat = "LL"
         peekNextMonth
         dropdownMode="select"
         required
         />
         <label className="active">Fecha de expiraciòn</label>
         </div>

         <div className="input-field col s12 m6 l6 ">
         <input
         id='Nombre_input'
         name='nombre_1selected'
         type="text"
         value={this.state.nombre_1selected}
         onChange={this.handleChangef}
         placeholder="Nombre"
         required
         />
         <label className="active" htmlFor="Nombre_input">Nombre</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='Apellido_p_input'
         name='nombre_2selected'
         type="text"
         value={this.state.nombre_2selected}
         onChange={this.handleChangef}
         placeholder="Apellido paterno"
         required
         />
         <label className="active" htmlFor="Apellido_p_input">Apellido paterno</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='Apellido_M_input'
         name='nombre_3selected'
         type="text"
         value={this.state.nombre_3selected}
         onChange={this.handleChangef}
         placeholder="Apellido materno"
         required
         />
         <label className="active" htmlFor="Apellido_M_input">Apellido materno</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='mail_input'
         name='correoselected'
         type="text"
         value={this.state.correoselected}
         onChange={this.handleChangef}
         placeholder="E-mail"
         required
         />
         <label className="active" htmlFor="mail_input">E-mail</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='rut_input'
         name='rutselected'
         type="text"
         value={this.state.rutselected}
         onChange={this.handleChangef}
         placeholder="Rut"
         required
         />
         <label className="active" htmlFor="rut_input">Rut</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='cargo_input'
         name='cargoselected'
         type="text"
         value={this.state.cargoselected}
         onChange={this.handleChangef}
         placeholder="Cargo"
         required
         />
         <label className="active" htmlFor="cargo_input">Cargo</label>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='costo_input'
         name='costoselected'
         className="campo-numerico" type="number" min="1" pattern="^[0-9]+" onPaste={() => this.returnfalse} onDrop={() => this.returnfalse} autoComplete="off"
         value={this.state.costoselected}
         onChange={this.handleChangef}
         placeholder="Costo"
         required
         />
         <label className="active" htmlFor="costo_input">Costo</label>
         <span className="helper-text" data-error="wrong" data-success="right">{new Intl.NumberFormat("de-DE").format(this.state.costoselected)}</span>
         </div>

         <div className="input-field col s12 m6 l6">
         <input
         id='banco_input'
         name='bancoselected'
         type="text"
         value={this.state.bancoselected}
         onChange={this.handleChangef}
         placeholder="Banco"
         required
         />
         <label className="active" htmlFor="banco_input">Banco</label>
         </div>

         <div className="input-field margin-bottom-none col s12 m6 l6">
         <input
         className="margin-bottom-none"
         id='cuenta_input'
         name='cuentaselected'
         type="text"
         value={this.state.cuentaselected}
         onChange={this.handleChangef}
         placeholder="Nº de cuenta"
         required
         />
         <label className="active" htmlFor="cuenta_input">Nº de cuenta</label>
         </div>

         <div className="input-field margin-bottom-none col s12 m6 l6">
         <input
         className="margin-bottom-none"
         id='tipocuenta_input'
         name='tipocuentaselected'
         type="text"
         value={this.state.tipocuentaselected}
         onChange={this.handleChangef}
         placeholder="Tipo de cuenta"
         required
         />
         <label className="active" htmlFor="tipocuenta_input">Tipo de cuenta</label>
         </div>
         </div>
       )
     }
     }
     inputsform = (
       <form  action="#"  autoComplete="off" onSubmit={this.addNote}>

       <div className="modal-content padding-none">
       <div className="row padding-none margin-none">

       <div className="input-field col s12">
       <input
       name='proyectoselected'
       type="text"
       value={this.state.proyectoselected}
       onChange={this.changeTipogasto}
       onFocus={this.changeTipogasto}
       id="autocomplete-input"
       className="autocomplete"
       placeholder="Tipo de gasto en proyecto"
       />
       </div>
       {bdyinputsform}


       </div>
       </div>

       <div className="modal-footer grey lighten-4">
       <button type="submitsubmit"  className="waves-effect waves-blue btn-flat">Guardar</button>
       </div>

       </form>
     )

    }else{
      if(this.state.contentselected==='RRHH. Eporadico'||this.state.contentselected==='RRHH. Transversal'){
        inputsform = (
          <form  action="#"  autoComplete="off" onSubmit={this.addNote}>

          <div className="modal-content padding-none">
          <div className="row padding-none margin-none">

          <div className="input-field col s12 m6 l6">
          <input
          className="input-min"
            disabled
            id='tipogasto_input'
            name='contentselected'
            type="text"
            value={this.state.contentselected}
            onChange={this.handleChangef}
            required
            />
            </div>

          <div className="input-field col s12 margin-top-small padding-none">
          <div className="divider margin-bottom-medium"></div>
          </div>

          <div className="input-field col s12 m6 l6 content-react-dp">
          <DatePicker
          customInput={<DesdeCustomInput />}
          name='fecha_iselected'
          todayButton={"Hoy"}
          selected={moment(dateTimeI)}
          onChange={this.handleChange_fecha_i}
          dateFormat = "LL"
          peekNextMonth
          dropdownMode="select"
          required
          />
          <label className="active">Fecha de inicio</label>
          </div>

          <div className="input-field col s12 m6 l6 content-react-dp">
          <DatePicker
          customInput={<HastaCustomInput />}
          name='fecha_tselected'
          todayButton={"Hoy"}
          selected={moment(dateTimeT)}
          onChange={this.handleChange_fecha_t}
          dateFormat = "LL"
          peekNextMonth
          dropdownMode="select"
          required
          />
          <label className="active">Fecha de expiraciòn</label>
          </div>

          <div className="input-field col s12 m6 l6 ">
          <input
          id='Nombre_input'
          name='nombre_1selected'
          type="text"
          value={this.state.nombre_1selected}
          onChange={this.handleChangef}
          placeholder="Nombre"
          required
          />
          <label className="active" htmlFor="Nombre_input">Nombre</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='Apellido_p_input'
          name='nombre_2selected'
          type="text"
          value={this.state.nombre_2selected}
          onChange={this.handleChangef}
          placeholder="Apellido paterno"
          required
          />
          <label className="active" htmlFor="Apellido_p_input">Apellido paterno</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='Apellido_M_input'
          name='nombre_3selected'
          type="text"
          value={this.state.nombre_3selected}
          onChange={this.handleChangef}
          placeholder="Apellido materno"
          required
          />
          <label className="active" htmlFor="Apellido_M_input">Apellido materno</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='mail_input'
          name='correoselected'
          type="text"
          value={this.state.correoselected}
          onChange={this.handleChangef}
          placeholder="E-mail"
          required
          />
          <label className="active" htmlFor="mail_input">E-mail</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='rut_input'
          name='rutselected'
          type="text"
          value={this.state.rutselected}
          onChange={this.handleChangef}
          placeholder="Rut"
          required
          />
          <label className="active" htmlFor="rut_input">Rut</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='cargo_input'
          name='cargoselected'
          type="text"
          value={this.state.cargoselected}
          onChange={this.handleChangef}
          placeholder="Cargo"
          required
          />
          <label className="active" htmlFor="cargo_input">Cargo</label>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='costo_input'
          name='costoselected'
          className="campo-numerico" type="number" min="1" pattern="^[0-9]+" onPaste={() => this.returnfalse} onDrop={() => this.returnfalse} autoComplete="off"
          value={this.state.costoselected}
          onChange={this.handleChangef}
          placeholder="Costo"
          required
          />
          <label className="active" htmlFor="costo_input">Costo</label>
          <span className="helper-text" data-error="wrong" data-success="right">{new Intl.NumberFormat("de-DE").format(this.state.costoselected)}</span>
          </div>

          <div className="input-field col s12 m6 l6">
          <input
          id='banco_input'
          name='bancoselected'
          type="text"
          value={this.state.bancoselected}
          onChange={this.handleChangef}
          placeholder="Banco"
          required
          />
          <label className="active" htmlFor="banco_input">Banco</label>
          </div>

          <div className="input-field margin-bottom-none col s12 m6 l6">
          <input
          className="margin-bottom-none"
          id='cuenta_input'
          name='cuentaselected'
          type="text"
          value={this.state.cuentaselected}
          onChange={this.handleChangef}
          placeholder="Nº de cuenta"
          required
          />
          <label className="active" htmlFor="cuenta_input">Nº de cuenta</label>
          </div>

          <div className="input-field margin-bottom-none col s12 m6 l6">
          <input
          className="margin-bottom-none"
          id='tipocuenta_input'
          name='tipocuentaselected'
          type="text"
          value={this.state.tipocuentaselected}
          onChange={this.handleChangef}
          placeholder="Tipo de cuenta"
          required
          />
          <label className="active" htmlFor="tipocuenta_input">Tipo de cuenta</label>
          </div>

          </div>

          </div>
          <div className="modal-footer grey lighten-4">
          <button type="submitsubmit"  className="waves-effect waves-blue btn-flat">Guardar</button>
          </div>
          </form>
        )
      }
      if(this.state.contentselected==="Gastos generales"){
        inputsform = (
          <form  action="#"  autoComplete="off" onSubmit={this.addNote}>

          <div className="modal-content padding-none">
          <div className="row padding-none margin-none">

          <div className="input-field col s12 m6 l6">
          <input
            className="input-min"
            disabled
            id='tipogasto_input'
            name='contentselected'
            type="text"
            value={this.state.contentselected}
            onChange={this.handleChangef}
            required
            />
            </div>

            <div className="input-field col s12 margin-top-small padding-none">
            <div className="divider margin-bottom-medium"></div>
            </div>

            <div className="input-field col s12 m6 l6 content-react-dp">
            <DatePicker
            customInput={<HastaCustomInput />}
            name='fecha_tselected'
            todayButton={"Hoy"}
            selected={moment(dateTimeT)}
            onChange={this.handleChange_fecha_t}
            dateFormat = "LL"
            peekNextMonth
            dropdownMode="select"
            required
            />
            <label className="active">Fecha de expiraciòn</label>
            </div>

            <div className="input-field col s12 m6 l6 ">
            <input
            id='Nombre_input'
            name='nombre_1selected'
            type="text"
            value={this.state.nombre_1selected}
            onChange={this.handleChangef}
            placeholder="Nombre de Gasto"
            required
            />
            <label className="active" htmlFor="Nombre_input">Nombre de Gasto</label>
            </div>

            <div className="input-field col s12 m6 l6">
            <input
            id='Apellido_p_input'
            name='nombre_2selected'
            type="text"
            value={this.state.nombre_2selected}
            onChange={this.handleChangef}
            placeholder="Compañia"
            required
            />
            <label className="active" htmlFor="Apellido_p_input">Compañia</label>
            </div>

            <div className="input-field col s12 m6 l6">
            <input
            id='rut_input'
            name='rutselected'
            type="text"
            value={this.state.rutselected}
            onChange={this.handleChangef}
            placeholder="Nº de cliente"
            required
            />
            <label className="active" htmlFor="rut_input">Nº de cliente</label>
            </div>

            <div className="input-field col s12 m6 l6">
            <input
            id='costo_input'
            name='costoselected'
            className="campo-numerico" type="number" min="1" pattern="^[0-9]+" onPaste={() => this.returnfalse} onDrop={() => this.returnfalse} autoComplete="off"
            value={this.state.costoselected}
            onChange={this.handleChangef}
            placeholder="Costo"
            required
            />
            <label className="active" htmlFor="costo_input">Costo</label>
            <span className="helper-text" data-error="wrong" data-success="right">{new Intl.NumberFormat("de-DE").format(this.state.costoselected)}</span>
            </div>

            <div className="input-field col s12 divider margin-none"></div>
            <div className="input-field col s12 margin-none padding-none">
            <h6 className="center margin-bottom-medium padding-none"><small>Datos de pago (*opcional)</small></h6>
            </div>

            <div className="input-field col s12 m6 l6 content-react-dp">
            <input
            id='mail_input'
            name='correoselected'
            type="text"
            value={this.state.correoselected}
            onChange={this.handleChangef}
            placeholder="E-mail"
            />
            <label className="active" htmlFor="mail_input">E-mail</label>
            </div>

            <div className="input-field col s12 m6 l6 content-react-dp">
            <input
            id='banco_input'
            name='bancoselected'
            type="text"
            value={this.state.bancoselected}
            onChange={this.handleChangef}
            placeholder="Banco"
            />
            <label className="active" htmlFor="banco_input">Banco</label>
            </div>

            <div className="input-field col s12 m6 l6">
            <input
            id='cuenta_input'
            name='cuentaselected'
            type="text"
            value={this.state.cuentaselected}
            onChange={this.handleChangef}
            placeholder="Nº de cuenta"
            />
            <label className="active" htmlFor="cuenta_input">Nº de cuenta</label>
            </div>

            <div className="input-field col s12 m6 l6">
            <input
            id='tipocuenta_input'
            name='tipocuentaselected'
            type="text"
            value={this.state.tipocuentaselected}
            onChange={this.handleChangef}
            placeholder="Tipo de cuenta"
            />
            <label className="active" htmlFor="tipocuenta_input">Tipo de cuenta</label>
            </div>


          </div>

          </div>
          <div className="modal-footer grey lighten-4">
          <button type="submitsubmit"  className="waves-effect waves-blue btn-flat">Guardar</button>
          </div>
          </form>
        )
      }
    }


    return(
      <div>

      {inputsform}

     </div>

    )

  }

}

export default NoteForm;
