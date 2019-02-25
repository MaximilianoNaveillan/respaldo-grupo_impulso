import React, { Component } from 'react';

import moment from 'moment';


moment.updateLocale('en', {
    weekdaysMin : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
});
moment.updateLocale('en', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
});

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
    active:'',

    shadow_rut: null,
    shadow_cargo: null,
    shadow_banco:null,
    shadow_cuenta: null,
    shadow_tipocuenta: null,
    shadow_correo: null,
    shadow_fecha_i: null,
    shadow_fecha_t: null,
    shadow_servicio: null,
    shadow_cliente: null,
    shadow_proyecto: null,

    nameRut: '',
  }
  this.handleactive=this.handleactive.bind(this);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;

    this.nombre_1= props.nombre_1;
    this.nombre_2= props.nombre_2;
    this.nombre_3= props.nombre_3;
    this.rut= props.rut;
    this.cargo= props.cargo;
    this.costo= props.costo;
    this.banco= props.banco;
    this.cuenta= props.cuenta;
    this.tipocuenta= props.tipocuenta;
    this.correo= props.correo;
    this.fecha_i= props.fecha_i;
    this.fecha_t= props.fecha_t;
    this.estado= props.estado;
    this.servicio= props.servicio;
    this.cliente= props.cliente;
    this.proyecto= props.proyecto;
    this.mongodb = props.mongodb;
  }



  componentWillReceiveProps(nextProps){


      this.noteContent = nextProps.noteContent;
      this.noteId = nextProps.noteId;

      this.nombre_1= nextProps.nombre_1;
      this.nombre_2= nextProps.nombre_2;
      this.nombre_3= nextProps.nombre_3;
      this.rut= nextProps.rut;
      this.cargo= nextProps.cargo;
      this.costo= nextProps.costo;
      this.banco= nextProps.banco;
      this.cuenta= nextProps.cuenta;
      this.tipocuenta= nextProps.tipocuenta;
      this.correo= nextProps.correo;
      this.fecha_i= nextProps.fecha_i;
      this.fecha_t= nextProps.fecha_t;
      this.estado= nextProps.estado;
      this.servicio= nextProps.servicio;
      this.cliente= nextProps.cliente;
      this.proyecto= nextProps.proyecto;
      this.mongodb = nextProps.mongodb;


  }

  handleSelectId(idselected,contentselected,nombre_1selected,nombre_2selected,nombre_3selected,rutselected,cargoselected,costoselected,bancoselected,cuentaselected,tipocuentaselected,correoselected,fecha_iselected,fecha_tselected,estadoselected,servicioselected,clienteselected,proyectoselected,mongodbselected){
    this.props.selectId(idselected,contentselected,nombre_1selected,nombre_2selected,nombre_3selected,rutselected,cargoselected,costoselected,bancoselected,cuentaselected,tipocuentaselected,correoselected,fecha_iselected,fecha_tselected,estadoselected,servicioselected,clienteselected,proyectoselected,mongodbselected)
    }

  componentWillMount(){

if(this.rut){  this.setState({shadow_rut: true,}) }
if(this.cargo){  this.setState({shadow_cargo: true,})}
if(this.banco){  this.setState({shadow_banco: true,})}
if(this.cuenta){  this.setState({shadow_cuenta: true,})}
if(this.tipocuenta){  this.setState({shadow_tipocuenta: true,})}
if(this.correo){  this.setState({shadow_correo: true,})}
if(this.fecha_i){  this.setState({shadow_fecha_i: true,})}
if(this.fecha_t){  this.setState({shadow_fecha_t: true,})}
if(this.servicio){  this.setState({shadow_servicio: true,})}
if(this.cliente){  this.setState({shadow_cliente: true,})}
if(this.proyecto){  this.setState({shadow_proyecto: true,})}


if(this.noteContent==='RRHH. Eporadico'||this.noteContent==='RRHH. Transversal'){
  this.setState({
    nameRut:'Rut',
  })
}
// si es Gastos generales= Compañía,N° de Cliente,Fecha de Vencimiento
if(this.noteContent==='Gastos generales'){
  this.setState({
    nameRut:'Nº de cliente',
  })
}
  }

  rstselectId(){
    this.props.rstselectId();
  }

  handleRemove(id){
    const response = window.confirm('¿estas seguro de eliminar los datos?')
    if (response){
      this.props.removeNote(id);
    }
    return;
  }

handleactive(){

  if(this.state.active){
    this.setState({
      active:'',
    })
  }
  if(!this.state.active){
    this.setState({
      active:'active',
    })
  }
  //this.rstselectId();
}

  render(){

    var prenote="";
    var bottomoptions= (
      <div className="padding-small modal-footer divbordertop lighten-5 white">
      <button
      onClick={() => this.handleSelectId(this.noteId,this.noteContent,this.nombre_1,this.nombre_2,this.nombre_3,this.rut,this.cargo,this.costo,this.banco,this.cuenta,this.tipocuenta,this.correo,moment(dateTimeI),moment(dateTimeT),this.estado,this.servicio,this.cliente,this.proyecto,this.mongodb)}
      className={`btn modal-trigger transparent waves-effect waves-blue btn-flat btn-small right ${this.props.disabled}`}
      data-target="modal1"
      >
      Editar
      </button>

      <button
      onClick={() => this.handleRemove(this.noteId)}
      data-target="modal1"
      className={`modal-close transparent waves-effect waves-red btn-flat btn-small  ${this.props.disabled}`}>eliminar
      <i  className="material-icons left red-text">delete</i>
      </button>

      </div>
    )
    if(!this.props.contentselected){
      var TG="";
      if(this.props.tg){
        TG=(<font>{this.props.tg} <i className="material-icons small">chevron_right</i></font>);

      }
      bottomoptions="";
      prenote=(<font>{this.noteContent} <i className="material-icons small">chevron_right</i> {TG}</font>);
    }

    var pagado="nopagado";
    var checked = false;
    if(this.estado==="pagado"){pagado="pagado"; checked=true;}

    const dateTimeI= this.fecha_i;
    const dateTimeT= this.fecha_t;
    const formattedFI = moment(dateTimeI).format('LL')//2FORMATO DE FACHA INICIAL
    const formattedFT = moment(dateTimeT).format('LL')//2FORMATO DE FACHA DE TERMINO

  //  const day_dif = moment().diff(dateTimeT,"days");
    const day_dif = moment(dateTimeT).diff(moment().local().format('YYYY-MM-DDTHH'),"days");


    var badge=""

    if(day_dif<0){ badge="new badge tardias";}

    if(day_dif>-1){ if(day_dif<8){ badge="new badge criticas";}}

    if(day_dif>7){ badge="new badge";}

    const {shadow_rut,shadow_cargo,shadow_banco,shadow_cuenta,shadow_tipocuenta,
    shadow_correo,shadow_fecha_i,shadow_fecha_t,shadow_servicio,
    shadow_cliente,shadow_proyecto} = this.state;
    const numberformat = new Intl.NumberFormat("de-DE").format(this.costo);

    var block="collapsible-body active ";
    if(this.state.active){
      block="collapsible-body active  displayblock"
    }
    return(

      <li className={`${this.state.active} margin-l-r-small`}>
      <div className={pagado}>
        <div  className="collapsible-header margin-none" >
        <a href="# /" onClick={() =>this.handleactive()} >

        <strong>{prenote} {this.nombre_1} {this.nombre_2} {this.nombre_3}</strong>
        <span className={badge} data-badge-caption={day_dif}>D .</span>
        <small> Total $ {numberformat}. </small>


        </a>
        </div>

<div className={block}>

<div className="s12 m4 l6">
<div className={`switch ${this.props.disabled}`}>
  <label className="right">
    Inpaga
    <input  checked={checked} type="checkbox" onChange={() =>this.props.pago(this.noteId,this.noteContent,this.nombre_1,this.nombre_2,this.nombre_3,this.rut,this.cargo,this.costo,this.banco,this.cuenta,this.tipocuenta,this.correo,moment(dateTimeI),moment(dateTimeT),this.estado,this.servicio,this.cliente,this.proyecto,this.mongodb)}/>
    <span className="lever"></span>
    Pagada
  </label>
</div>

{shadow_fecha_t?<div className="s12"><strong>Fecha de expiraciòn :</strong> <span>{formattedFT}</span></div>:null}
</div>


<div className="row margin-small divbordertop">
<div className="col s12 margin-top-medium">
{shadow_fecha_i?<div className="col s12 m4 l6"><strong>Fecha de inicio :</strong> <span>{formattedFI}</span></div>:null}
<div className="col s12 m4 l6"><strong>Tipo de gasto :</strong> <span >{this.noteContent}</span></div>
{shadow_cliente?<div className="col s12 m4 l6"><strong>Cliente :</strong> <span >{this.cliente}</span></div>:null}
{shadow_servicio?<div className="col s12 m4 l6"><strong>Servicio :</strong> <span >{this.servicio}</span></div>:null}
{shadow_proyecto?<div className="col s12 m4 l6"><strong>Proyecto :</strong> <span >{this.proyecto}</span></div>:null}
{shadow_cargo?<div className="col s12 m4 l6"><strong>Cargo :</strong> <span>{this.cargo}</span></div>:null}
{shadow_rut?<div className="col s12 m4 l6"><strong>{this.state.nameRut} :</strong> <span >{this.rut}</span></div>:null}
</div>


<div className="col s12 margin-top-medium">
{shadow_correo?<div className="col s12 m4 l6"><strong>Correo :</strong> <span>{this.correo}</span></div>:null}
{shadow_banco?<div className="col s12 m4 l6"><strong>Banco :</strong> <span >{this.banco}</span></div>:null}
{shadow_cuenta?<div className="col s12 m4 l6"><strong>Nº de Cuenta :</strong> <span >{this.cuenta}</span></div>:null}
{shadow_tipocuenta?<div className="col s12 m4 l6"><strong>Tipo de cuenta :</strong > <span >{this.tipocuenta}</span></div>:null}
</div>

</div>
{bottomoptions}
</div>
      </div>
      </li>

    )
  }
}

export default Note;
