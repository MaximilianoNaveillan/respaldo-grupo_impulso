import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css';

import Prenote from './components/prenote'
import NoteForm from './components/noteform'
import Service from './components/service'
import Proyect from './components/proyect'
import Users from './components/users'

import {DB_CONFIG} from './config/config';
import 'firebase/database';

import DatePicker from 'react-datepicker';
import moment from 'moment';
//moment.suppressDeprecationWarnings = true;
moment.updateLocale('en', {
    weekdaysMin : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
});
moment.updateLocale('en', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
});

function serchForContent(contentselected){
  return function(x){
  return x.noteContent === contentselected;
  }
}

function serchForContentPagado(){
  return function(x){
  return x.estado === "pagado";
  }
}

function searchingFor(term,contentselected){
  return function(x){
    if(x.noteContent===contentselected){
      const data = (x.nombre_1+x.nombre_2+x.nombre_3x+x.rut+x.cargo+x.costo+x.cuenta+x.tipocuenta+x.correo+x.fecha_i+x.fecha_t+x.estado+x.servicio+x.cliente)
      return data.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

}

function searchingForProyect(proyecto){

    return function(x){

      const data = x.proyecto;
      if(proyecto===data){
        return data.includes(data);
      }

  }

}

function searchingFortardias(){
  return function(x){

      const data = x.fecha_t;
      const day_dif = moment(data).diff(moment().format('YYYY-MM-DDTHH'),"days");

      if(day_dif<0 && x.estado!=="pagado"){
        return data.includes(data);
      }


  }
}

function searchingForcriticas(){
  return function(x){

      const data = x.fecha_t;
      const day_dif = moment(data).diff(moment().format('YYYY-MM-DDTHH'),"days");
      if(day_dif>-1 && x.estado!=="pagado"){
        if(day_dif<8){
          return data.includes(data);
        }

      }


  }
}

function searchingFortemprana(){
  return function(x){

      const data = x.fecha_t;
      const day_dif = moment(data).diff(moment().format('YYYY-MM-DDTHH'),"days");
        if(day_dif>7 && x.estado!=="pagado"){
          return data.includes(data);
        }
  }
}

function searchingalert(){
    return function(x){
            return x.estado!=="pagado";
          }
}
function historicfilter(name){
        return function(x){
          return x.name===name;
        }
}

class App extends Component {
constructor(){
    super();

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
      fecha_tselected:moment(),
      estadoselected:'',
      servicioselected:'',
      clienteselected:'',
      proyectoselected:'',
      mongodbselected:'',
      proyectselect:'',

      proyectnameselect:'',
      proyectphone:'',
      proyectmail:'',
      proyectadress:'',
      proyectrut:'',
      proyectgiro:'',

      user:null,
      useradmin:'',
      uerslist:[],
      leer:'displaynone',
      editar:'displaynone',

      calendar:'',
      api:null,
      classNameapi:'',


      newnotes:[],
      notes:[],
      services:[],
      clients:[],
      proyect:[],
      hitorics:[],
      hitoricselect:'',
      historicxdata:[],

      term:'',
      termservice:'',
      rstservicecontent:'',
      nwservice:'',
      nwclientid:'',
      nwclient:'',
      nwclientservice:'',
      nwclientphone:'',
      nwclientmail:'',
      nwclientadress:'',
      nwclientrut:'',
      nwclientgiro:'',

      pagoid:'',
      pagonoteContent:'',
      pagonombre_1:'',
      pagonombre_2:'',
      pagonombre_3:'',
      pagorut:'',
      pagocargo:'',
      pagocosto:'',
      pagobanco:'',
      pagocuenta:'',
      pagotipocuenta:'',
      pagocorreo:'',
      pagofecha_i:moment(),
      pagofecha_t:moment(),
      pagoexpiracion:moment(),
      pagoestado:'',
      pagoservicio:'',
      pagocliente:'',
      pagoproyecto:'',
      pagomongodb:'',

      tipopago:'',
      transversalchecked:false,
      esporadicochecked:false,
      pagoesporadicodisplay:'',
      pagotransversaldisplay:'',

      proyectClientselect:'',
      proyectIdselect:'',
      proyectNameselect:'',
      proyectValueselect:'',
      proyectDateIselect:'',
      proyectDateFselect:'',
      proyectBudgetselect:'',
      proyectComentselect:'',

      startDate:moment(),
      historicojsx:'',

    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.dbservice = this.app.database().ref().child('service');
    this.dbclient = this.app.database().ref().child('clients');
    this.dbproyect = this.app.database().ref().child('proyects');
    this.dbhitoric = this.app.database().ref().child('Gastos')


    this.handleAuth=this.handleAuth.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.renderLoginButton=this.renderLoginButton.bind(this);
    this.renderuseradmin=this.renderuseradmin.bind(this);

    this.selectId = this.selectId.bind(this);
    this.rstselectId = this.rstselectId.bind(this);
    this.handleFechaInicio=this.handleFechaInicio.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.changeTo=this.changeTo.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.searchHandlerService=this.searchHandlerService.bind(this);
    this.searchHandlerFocus = this.searchHandlerFocus.bind(this);
    this.searchHandlerServiceFocus = this.searchHandlerServiceFocus.bind(this);

    this.addNote = this.addNote.bind(this);
    this.addService = this.addService.bind(this);
    this.addClient = this.addClient.bind(this);
    this.addProyect = this.addProyect.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.removeService = this.removeService.bind(this);
    this.removeClient = this.removeClient.bind(this);
    this.rstClient = this.rstClient.bind(this);
    this.proyectSelect = this.proyectSelect.bind(this);
    this.editProyect = this.editProyect.bind(this);
    this.rstservicecontent= this.rstservicecontent.bind(this);
    this.SelectProyect= this.SelectProyect.bind(this);
    this.guid= this.guid.bind(this);
    this.pago= this.pago.bind(this);
    this.putpago= this.putpago.bind(this)
    this.handleChangetipopago1= this.handleChangetipopago1.bind(this);
    this.handleChangetipopago2= this.handleChangetipopago2.bind(this);
    this.gethistorico= this.gethistorico.bind(this);
    this.handleEstartDate= this.handleEstartDate.bind(this);
    this.levelSelect= this.levelSelect.bind(this);


  }

guid() {
  return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
}

s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

componentWillMount(){

this.setState({useradmin:"useradmin"});
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      var usuario ={
        uid:user.uid,
        nombre:user.displayName,
        email:user.email,
        foto:user.photoURL
      }


      firebase.database().ref(`Usuarios/${user.uid}`)
      .set(usuario)
      firebase.database().ref('admin').on('value', snapshot => {
        this.setState({
          useradmin: snapshot.val()
        })
      })

      firebase.database().ref('leer').on('value', snapshot => {
        var stringleer =snapshot.val().split(",")
          for(let i = 0; i < stringleer.length; i++){

            if (stringleer[i] === user.email){
                this.setState({
                  leer: ''
                })
            }
          }
      })

      firebase.database().ref('editar').on('value', snapshot => {
        var string =snapshot.val().split(",")
          for(let i = 0; i < string.length; i++){

            if (string[i] === user.email){
                this.setState({
                  editar: ''
                })
            }
          }
      })









    });

    const { notes } = this.state;
    const { services } = this.state;
    const { clients } = this.state;
    const { proyect } = this.state;
    const { hitorics } = this.state;
    const { historicxdata } = this.state;

      this.app.database().ref().child(`Gastos-${moment().format('YYYY-MM')}`).on('child_added', snap => {
        historicxdata.push({
          noteId: snap.key,
          noteContent: snap.val().noteContent,
          nombre_1: snap.val().nombre_1,
          nombre_2: snap.val().nombre_2,
          nombre_3: snap.val().nombre_3,
          rut: snap.val().rut,
          cargo: snap.val().cargo,
          costo: snap.val().costo,
          banco: snap.val().banco,
          cuenta: snap.val().cuenta,
          tipocuenta: snap.val().tipocuenta,
          correo: snap.val().correo,
          fecha_i:snap.val().fecha_i,
          fecha_t:snap.val().fecha_t,
          estado: snap.val().estado,
          servicio:snap.val().servicio,
          cliente:snap.val().cliente,
          proyecto:snap.val().proyecto,
          mongodb:snap.val().mongodb,
        })
        this.setState({historicxdata});
      });


    this.db.on("child_changed", snap => {
      const nwstring={
        noteId: snap.key,
        noteContent: snap.val().noteContent,
        nombre_1: snap.val().nombre_1,
        nombre_2: snap.val().nombre_2,
        nombre_3: snap.val().nombre_3,
        rut: snap.val().rut,
        cargo: snap.val().cargo,
        costo: snap.val().costo,
        banco: snap.val().banco,
        cuenta: snap.val().cuenta,
        tipocuenta: snap.val().tipocuenta,
        correo: snap.val().correo,
        fecha_i:snap.val().fecha_i,
        fecha_t:snap.val().fecha_t,
        estado: snap.val().estado,
        servicio:snap.val().servicio,
        cliente:snap.val().cliente,
        proyecto:snap.val().proyecto,
        mongodb:snap.val().mongodb,
      }

      for(let i = 0; i < notes.length; i++){
        if (notes[i].noteId === snap.key){
          notes.splice(i, 1, nwstring);
        }
      }
this.setState({notes});
    });
    this.dbservice.on('child_changed', snap => {
      const nwservices={
        serviceId: snap.key,
        serviceContent: snap.val().serviceContent,
      }
      for(let i = 0; i < services.length; i++){
        if (services[i].serviceId === snap.key){
          services.splice(i, 1, nwservices);
        }
      }
this.setState({services});
    });
    this.dbclient.on('child_changed', snap => {
      const nwclients={
        clientId: snap.key,
        clientContent: snap.val().clientContent,
        clientService: snap.val().clientService,
        clientphone: snap.val().clientService,
        clientmail: snap.val().clientService,
        clientadress: snap.val().clientadress,
        clientrut: snap.val().clientrut,
        clientgiro: snap.val().clientgiro,
      }
      for(let i = 0; i < clients.length; i++){
        if (clients[i].clientId === snap.key){
          clients.splice(i, 1, nwclients);
        }
      }
this.setState({clients});
    });
    this.dbproyect.on('child_changed', snap => {
      const nwproyect={
        proyectId: snap.key,
        idclient:snap.val().idclient,
        proyectName: snap.val().proyectName,
        proyectValue: snap.val().proyectValue,
        proyectDateI: snap.val().proyectDateI,
        proyectDateF: snap.val().proyectDateF,
        proyectBudget: snap.val().proyectBudget,
        proyectComent: snap.val().proyectComent,
      }
      for(let i = 0; i < proyect.length; i++){
        if (proyect[i].proyectId === snap.key){
          proyect.splice(i, 1, nwproyect);
        }
      }
this.setState({proyect});
    });
    this.dbhitoric.on('child_changed', snap => {
      const nwhitorics={
        Id: snap.key,
        name:snap.val().name,
      }
      for(let i = 0; i < hitorics.length; i++){
        if (hitorics[i].proyectId === snap.key){
          hitorics.splice(i, 1, nwhitorics);
        }
      }
this.setState({hitorics});
    });


    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent,
        nombre_1: snap.val().nombre_1,
        nombre_2: snap.val().nombre_2,
        nombre_3: snap.val().nombre_3,
        rut: snap.val().rut,
        cargo: snap.val().cargo,
        costo: snap.val().costo,
        banco: snap.val().banco,
        cuenta: snap.val().cuenta,
        tipocuenta: snap.val().tipocuenta,
        correo: snap.val().correo,
        fecha_i:snap.val().fecha_i,
        fecha_t:snap.val().fecha_t,
        estado: snap.val().estado,
        servicio:snap.val().servicio,
        cliente:snap.val().cliente,
        proyecto:snap.val().proyecto,
        mongodb:snap.val().mongodb,
      })
      this.setState({notes});
    });
    this.dbservice.on('child_added', snap => {
      services.push({
        serviceId: snap.key,
        serviceContent: snap.val().serviceContent,
      })
      this.setState({services});
    });
    this.dbclient.on('child_added', snap => {
      clients.push({
        clientId: snap.key,
        clientContent: snap.val().clientContent,
        clientService: snap.val().clientService,
        clientphone: snap.val().clientphone,
        clientmail: snap.val().clientmail,
        clientadress: snap.val().clientadress,
        clientrut: snap.val().clientrut,
        clientgiro: snap.val().clientgiro,
      })
      this.setState({clients});
    });
    this.dbproyect.on('child_added', snap => {
      proyect.push({
        proyectId: snap.key,
        idclient:snap.val().idclient,
        proyectName: snap.val().proyectName,
        proyectValue: snap.val().proyectValue,
        proyectDateI: snap.val().proyectDateI,
        proyectDateF: snap.val().proyectDateF,
        proyectBudget: snap.val().proyectBudget,
        proyectComent: snap.val().proyectComent,
      })
      this.setState({proyect});
    });
    this.dbhitoric.on('child_added', snap => {
      hitorics.push({
        Id: snap.key,
        name:snap.val().name,
      })
      this.setState({hitorics});
    });

    this.db.on('child_removed', snap => {
    for(let i = 0; i < notes.length; i++){
      if (notes[i].noteId === snap.key){
        notes.splice(i, 1);
      }
    }
    this.setState({notes});
    });
    this.dbservice.on('child_removed', snap => {
    for(let i = 0; i < services.length; i++){
      if (services[i].serviceId === snap.key){
        services.splice(i, 1);
      }
    }
    this.setState({services});
    });
    this.dbclient.on('child_removed', snap => {
    for(let i = 0; i < clients.length; i++){
      if (clients[i].clientId === snap.key){
        clients.splice(i, 1);
      }
    }
    this.setState({clients});
    });
    this.dbproyect.on('child_removed', snap => {
    for(let i = 0; i < proyect.length; i++){
      if (proyect[i].proyectId === snap.key){
        proyect.splice(i, 1);
      }
    }
    this.setState({proyect});
    });


  }

componentDidMount() {

  const { uerslist } = this.state;




    firebase.database().ref('Usuarios').on('child_added', snap => {
      uerslist.push({
        email:snap.val().email,
        foto:snap.val().foto,
        nombre:snap.val().nombre,
        uid:snap.val().uid,
      })
      this.setState({uerslist});
    });


    let options = {};

    window.addEventListener('DOMContentLoaded', function() {


    M.FormSelect.init(document.querySelectorAll('select'), options);

    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), options);

     M.Modal.init(document.querySelectorAll('.modal'), options);

    M.Sidenav.init(document.querySelectorAll('.sidenav'), options);

    M.Collapsible.init(document.querySelectorAll('.collapsible'), options);


      });
  }

renderuseradmin(admin){
  if(this.state.user){
    if(this.state.user.uid===admin){
      return(
        <li><a href="#modalUser" className='modal-trigger' >Lista de usuarios.</a></li>
            )
    }
  }else{
    return ('')
  }
//  console.log(this.state.user.uid);
//    console.log(admin);
}

changeToAlert(data){

  this.setState({
    contentselected:'',

    api:true,
    calendar:data,


    proyectClientselect:'',
    proyectIdselect:'',
    proyectNameselect:'',
    proyectValueselect:'',
    proyectDateIselect:'',
    proyectDateFselect:'',
    proyectBudgetselect:'',
    proyectComentselect:'',
  });

}

changeTo(data){

    this.setState({
      contentselected:data,

      api:true,
      calendar:'',


      proyectClientselect:'',
      proyectIdselect:'',
      proyectNameselect:'',
      proyectValueselect:'',
      proyectDateIselect:'',
      proyectDateFselect:'',
      proyectBudgetselect:'',
      proyectComentselect:'',
    });

  }

selectId(idselected,contentselected,nombre_1selected,nombre_2selected,nombre_3selected,rutselected,cargoselected,costoselected,bancoselected,cuentaselected,tipocuentaselected,correoselected,fecha_iselected,fecha_tselected,estadoselected,servicioselected,clienteselected,proyectoselected,mongodbselected){

    this.setState({
      idselected:idselected,
      contentselected:contentselected,
      nombre_1selected:nombre_1selected,
      nombre_2selected:nombre_2selected,
      nombre_3selected:nombre_3selected,
      rutselected:rutselected,
      cargoselected:cargoselected,
      costoselected:costoselected,
      bancoselected:bancoselected,
      cuentaselected:cuentaselected,
      tipocuentaselected:tipocuentaselected,
      correoselected:correoselected,
      fecha_iselected:fecha_iselected,
      fecha_tselected:fecha_tselected,
      estadoselected:estadoselected,
      servicioselected:servicioselected,
      clienteselected:clienteselected,
      proyectoselected:proyectoselected,
      mongodbselected:mongodbselected
    })
  }

rstselectId(){
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
      fecha_tselected:moment(),
      estadoselected:'',
      servicioselected:'',
      clienteselected:'',
      proyectoselected:'',
      mongodbselected:'',
    })
  }

proyectSelect(id,proyecto,clientphone,clientmail,clientadress,clientrut,clientgiro){
  this.setState({
    proyectselect:id,
    proyectnameselect:proyecto,
    proyectphone:clientphone,
    proyectmail:clientmail,
    proyectadress:clientadress,
    proyectrut:clientrut,
    proyectgiro:clientgiro,
  })
}

removeNote(noteId){
    this.db.child(noteId).remove();
  }

removeService(id){
  this.dbservice.child(id).remove();
}

removeClient(id){
  this.dbclient.child(id).remove();
  var instance = M.Modal.getInstance(document.getElementById("modalservice"));
  instance.open();

}

handleChangetipopago1(){
  this.setState({
    tipopago:'',
    transversalchecked:false,
    esporadicochecked:true,
  })
}

handleChangetipopago2(){
  this.setState({
    tipopago:'transversal',
    transversalchecked:true,
    esporadicochecked:false,
  })
}

deleteProyect(id,filterForContent,sumEstadoPagado){
  const datedb=moment().format('YYYY-MM');
  const hitoric = this.app.database().ref().child(`Gastos-${datedb}`);

  var consthistoricrep = this.state.hitorics.filter(historicfilter(`Gastos-${datedb}`));

  if(consthistoricrep.length === 0){
    this.dbhitoric.push().set({
        name:`Gastos-${datedb}`
    })
  }
if(sumEstadoPagado>0){
  filterForContent.map( x => {

      const formattedFI = moment(x.fecha_i).format('YYYY-MM-DDTHH')//2FORMATO DE FACHA INICIAL
      const formattedFT = moment(x.fecha_t).format('YYYY-MM-DDTHH')
      return hitoric.push().set({
        noteContent:x.noteContent,
        nombre_1:x.nombre_1,
        nombre_2:x.nombre_2,
        nombre_3:x.nombre_3,
        rut:x.rut,
        cargo:x.cargo,
        costo:x.costo,
        banco:x.banco,
        cuenta:x.cuenta,
        tipocuenta:x.tipocuenta,
        correo:x.correo,
        fecha_i:formattedFI,
        fecha_t:formattedFT,
        estado:x.estado,
        servicio:x.servicio,
        cliente:x.cliente,
        proyecto:x.proyecto,
        mongodb:x.mongodb,
      });


  });
  filterForContent.map( x => {
    return this.db.child(x.noteId).remove();
  });
}
this.dbproyect.child(id).remove();
this.changeTo("");
}

pago(id,content,nombre_1,nombre_2,nombre_3,rut,cargo,costos,banco,cuenta,tipocuenta,correo,fecha_i,fecha_t,estado,servicios,cliente,proyecto,mongodb){

if(estado==="pagado"){
  this.db.child(id).update({
    estado:'',
  });
}else{
  if(proyecto){
    this.setState({
      tipopago:'pagado',
      transversalchecked:false,
      esporadicochecked:false,
      pagoesporadicodisplay:'displaynone',
      pagotransversaldisplay:'displaynone',
    })
  }else{
    if(content==="Gastos generales"){
    if(estado){
        this.setState({
          tipopago:'transversal',
          transversalchecked:true,
          esporadicochecked:false,
        })
    }else{
      this.setState({
        tipopago:'',
        transversalchecked:false,
        esporadicochecked:true,
      })
    }
      this.setState({
        pagoesporadicodisplay:'',
        pagotransversaldisplay:'',
      });
    }


    if(content==="RRHH. Transversal"){
      this.setState({
        tipopago:'transversal',
        transversalchecked:true,
        esporadicochecked:false,
        pagoesporadicodisplay:'displaynone',
        pagotransversaldisplay:'',
      })
    }

    if(content==="RRHH. Eporadico"){
      this.setState({
        tipopago:'',
        transversalchecked:false,
        esporadicochecked:true,
        pagoesporadicodisplay:'',
        pagotransversaldisplay:'displaynone',
      })
    }
  }


    this.setState({
      pagoid:id,
      pagonoteContent:content,
      pagonombre_1:nombre_1,
      pagonombre_2:nombre_2,
      pagonombre_3:nombre_3,
      pagorut:rut,
      pagocargo:cargo,
      pagocosto:costos,
      pagobanco:banco,
      pagocuenta:cuenta,
      pagotipocuenta:tipocuenta,
      pagocorreo:correo,
      pagofecha_i:fecha_i,
      pagofecha_t:moment(fecha_t).subtract(-1, 'months').endOf('month').format('YYYY-MM-DD'),
      pagoexpiracion:fecha_t,
      pagoestado:estado,
      pagoservicio:servicios,
      pagocliente:cliente,
      pagoproyecto:proyecto,
      pagomongodb:mongodb,
    });

    var instance = M.Modal.getInstance(document.getElementById("modalPago"));
    instance.open();
}
}

putpago(event){
event.preventDefault();
const id=this.state.pagoid;
  const datedb=moment().format('YYYY-MM');

  const formattedFI = moment(this.state.pagofecha_i).format('YYYY-MM-DDTHH')//2FORMATO DE FACHA INICIAL
  const formattedFT = moment(this.state.pagoexpiracion).format('YYYY-MM-DDTHH')
  const nwfecha_t= moment(this.state.pagofecha_t).format('YYYY-MM-DDTHH')

  const hitoric = this.app.database().ref().child(`Gastos-${datedb}`);





  if(this.state.tipopago==="pagado"){
    this.db.child(id).update({
      estado:'pagado',
    });
  }else{
    if(this.state.tipopago==="transversal"){
      this.db.child(id).update({
        fecha_t:nwfecha_t,
        estado:'transversal'
      });
    }
    if(this.state.tipopago===""){this.db.child(id).remove();}

    hitoric.push().set({
      noteContent:this.state.pagonoteContent,
      nombre_1:this.state.pagonombre_1,
      nombre_2:this.state.pagonombre_2,
      nombre_3:this.state.pagonombre_3,
      rut:this.state.pagorut,
      cargo:this.state.pagocargo,
      costo:this.state.pagocosto,
      banco:this.state.pagobanco,
      cuenta:this.state.pagocuenta,
      tipocuenta:this.state.pagotipocuenta,
      correo:this.state.pagocorreo,
      fecha_i:formattedFI,
      fecha_t:formattedFT,
      estado:this.state.pagoestado,
      servicio:this.state.pagoservicio,
      cliente:this.state.pagocliente,
      proyecto:this.state.pagoproyecto,
      mongodb:this.state.pagomongodb,
    });
    var consthistoricrep = this.state.hitorics.filter(historicfilter(`Gastos-${datedb}`))


    if(consthistoricrep.length === 0){
      this.dbhitoric.push().set({
          name:`Gastos-${datedb}`
      })
    }

  }


  var instance = M.Modal.getInstance(document.getElementById("modalPago"));
  instance.close();
}

gethistorico(name){
  this.setState({hitoricselect:name});
}

addNote(idselected,contentselected,nombre_1selected,nombre_2selected,nombre_3selected,rutselected,cargoselected,costoselected,bancoselected,cuentaselected,tipocuentaselected,correoselected,fecha_iselected,fecha_tselected,estadoselected,servicioselected,clienteselected,proyectoselected,mongodbselected){
var instance = M.Modal.getInstance(document.getElementById("modal1"));
instance.close();
    const formattedFI = moment(fecha_iselected).format('YYYY-MM-DDTHH')//2FORMATO DE FACHA INICIAL
    const formattedFT = moment(fecha_tselected).format('YYYY-MM-DDTHH')
    if(idselected===""){
      this.db.push().set({
        noteContent:contentselected,
        nombre_1:nombre_1selected,
        nombre_2:nombre_2selected,
        nombre_3:nombre_3selected,
        rut:rutselected,
        cargo:cargoselected,
        costo:costoselected,
        banco:bancoselected,
        cuenta:cuentaselected,
        tipocuenta:tipocuentaselected,
        correo:correoselected,
        fecha_i:formattedFI,
        fecha_t:formattedFT,
        estado:estadoselected,
        servicio:servicioselected,
        cliente:clienteselected,
        proyecto:proyectoselected,
        mongodb:mongodbselected,
      });
    } else {
      this.db.child(idselected).update({
        noteContent:contentselected,
        nombre_1:nombre_1selected,
        nombre_2:nombre_2selected,
        nombre_3:nombre_3selected,
        rut:rutselected,
        cargo:cargoselected,
        costo:costoselected,
        banco:bancoselected,
        cuenta:cuentaselected,
        tipocuenta:tipocuentaselected,
        correo:correoselected,
        fecha_i:formattedFI,
        fecha_t:formattedFT,
        estado:estadoselected,
        servicio:servicioselected,
        cliente:clienteselected,
        proyecto:proyectoselected,
        mongodb:mongodbselected,
      });
    }
  }

addService(event){
  const nwservice =event.target.nwservice.value;
  event.preventDefault()
    this.dbservice.push().set({
      serviceContent:nwservice
    })

    this.setState({nwservice:''})
}

editProyect(nameselect,idselect,proyectphone,proyectmail,proyectadress,proyectrut,proyectgiro){
this.setState({
nwclientid:idselect,
nwclient:nameselect,
nwclientphone:proyectphone,
nwclientmail:proyectmail,
nwclientadress:proyectadress,
nwclientrut:proyectrut,
nwclientgiro:proyectgiro,
})
}

addClient(event){
event.preventDefault()
if(this.state.nwclientid===""){
  this.dbclient.push().set({
    clientContent:this.state.nwclient,
    clientService:this.state.nwclientservice,
    clientphone:this.state.nwclientphone,
    clientmail:this.state.nwclientmail,
    clientadress:this.state.nwclientadress,
    clientrut:this.state.nwclientrut,
    clientgiro:this.state.nwclientgiro
  })
}else {
  this.dbclient.child(this.state.nwclientid).update({
    clientContent:this.state.nwclient,
    clientService:this.state.nwclientservice,
    clientphone:this.state.nwclientphone,
    clientmail:this.state.nwclientmail,
    clientadress:this.state.nwclientadress,
    clientrut:this.state.nwclientrut,
    clientgiro:this.state.nwclientgiro

  })
}
var instance = M.Modal.getInstance(document.getElementById("modalAddProyect"));
var instance2 = M.Modal.getInstance(document.getElementById("modalProyect"));
var instance3 = M.Modal.getInstance(document.getElementById("modalservice"));
instance.close();
instance2.close();
instance3.open();
}

addProyect(idclient,nwproyectName,nwproyectValue,nwproyectDateI,nwproyectDateF,nwproyectBudget,nwproyectComent){
  var instance = M.Modal.getInstance(document.getElementById("modalAddProyect"));
  instance.close();
  const formattedFI = moment(nwproyectDateI).format('YYYY-MM-DDTHH')//2FORMATO DE FACHA INICIAL
  const formattedFT = moment(nwproyectDateF).format('YYYY-MM-DDTHH')
  this.dbproyect.push().set({
    idclient:idclient,
    proyectName:nwproyectName,
    proyectValue:idclient,
    proyectDateI:formattedFI,
    proyectDateF:formattedFT,
    proyectBudget:nwproyectBudget,
    proyectComent:nwproyectComent,
  });

}

rstClient(clientservice){
  this.setState({
  nwclientid:'',
  nwclient:'',
  nwclientservice:clientservice,
  nwclientphone:'',
  nwclientmail:'',
  nwclientadress:'',
  nwclientrut:'',
  nwclientgiro:''
  })
}

rstservicecontent(servicecontent){
    this.setState({
      rstservicecontent:servicecontent,
    })
}

handleLogout(){
  firebase.auth().signOut()
  .then(result => console.log(`${result.user.email} ha iniciado sesìon`))
  .catch(error => console.log(`Error ${error.code}: ${error.message}`));
}

handleAuth(){
   const provider = new firebase.auth.GoogleAuthProvider();

   firebase.auth().signInWithPopup(provider)
   .then(result => console.log(`${result.user.email} ha salido`))
   .catch(error => console.log(`Error ${error.code}: ${error.message}`));
 }

 renderLoginButton(){

   if(this.state.user){
     return(
    <a href="# /" onClick={this.handleLogout} className="chip login z-depth-2">
    <img className="z-depth-2" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
    {this.state.user.displayName}
    </a>

     );
   }else {
    return(
      <a href="# /" className="chip login z-depth-2 " onClick={this.handleAuth}>
       Login !
      </a>
   );
   }
 }

handleFechaInicio(e){
  alert(e.value)
}

handleChange(e){
  const { name, value } = e.target;
  this.setState({
    [name]: value
  });
}

handleChange_fecha_t = (date) => {
if(date!==null){
      this.setState({
        pagoexpiracion:date
      });
    }
    }

searchHandler(event){
  this.setState({ term: event.target.value })
}

searchHandlerService(event){
  this.setState({ termservice: event.target.value })
}

searchHandlerFocus(){
   document.getElementById("searchHandler").focus();
}

searchHandlerServiceFocus(){
  document.getElementById("searchHandlerService").focus();
}

SelectProyect(clientselect,rstservicecontent,proyectId,proyectName,proyectDateI,proyectDateF,proyectBudget,proyectComent){
this.setState({
  contentselected:`${proyectName}`,
  api:true,
  calendar:'',

  proyectClientselect:clientselect,
  proyectIdselect:proyectId,
  proyectNameselect:rstservicecontent,
  proyectDateIselect:proyectDateI,
  proyectDateFselect:proyectDateF,
  proyectBudgetselect:proyectBudget,
  proyectComentselect:proyectComent,
});

}

handleEstartDate = (date) => {
  console.log(date);
  if(date!==null){
      this.setState({
        startDate:date
      });
      }
}

levelSelect(i,id){
  console.log(i);

}


  render() {




const {
  term,
  notes,
  contentselected,
  clients,
  proyectIdselect,
  proyectClientselect,
  proyectNameselect,
  proyectDateIselect,
  proyectDateFselect,
  proyectBudgetselect,
  calendar,
} = this.state;

const alertastardias = notes.filter(searchingFortardias()).map((task) => 1 ).reduce(function (previous, current) {
    return previous + current;
}, 0);

const alertascriticas = notes.filter(searchingForcriticas()).map((task) => 1 ).reduce(function (previous, current) {
    return previous + current;
}, 0);

const alertastempranas = notes.filter(searchingFortemprana()).map((task) => 1 ).reduce(function (previous, current) {
    return previous + current;
}, 0);

const totalalertas = notes.filter(searchingalert()).map((task) => Number(task.costo) ).reduce(function (previous, current) {
    return previous + current;
}, 0);

var filter =notes;
var ulFilter ="";



  if(calendar==="alertastardias"){filter=notes.filter(searchingFortardias());}
  if(calendar==="alertascriticas"){filter=notes.filter(searchingForcriticas());}
  if(calendar==="alertastempranas"){filter=notes.filter(searchingFortemprana());}

if(contentselected && !calendar){
    filter = notes.filter(searchingFor(term,contentselected));
    const filterForContent= notes.filter(serchForContent(contentselected));

    const filterForContentPagados= filterForContent.filter(serchForContentPagado(contentselected));


    const sumFor = filterForContent.map((task) => Number(task.costo) ).reduce(function (previous, current) {
        return previous + current;
    }, 0);

    const sumForFilter = filter.map((task) => Number(task.costo) ).reduce(function (previous, current) {
        return previous + current;
    }, 0);

    const sumForformat = new Intl.NumberFormat("de-DE").format(sumFor);

    var bodyproyect = ""
    var dif=0;
    if(proyectIdselect){
      const sumEstadoPagado = filterForContentPagados.map((task) => task.estado ).reduce(function (previous, current) {
      return previous + 1
      }, 0);

      const sumfilterForContent= filterForContent.map((task) => task.estado ).reduce(function (previous, current) {
      return previous + 1
      }, 0);



      var closepage=""
      if(sumfilterForContent>0){
        if(sumEstadoPagado===sumfilterForContent){
          closepage = (
          <button
          onClick={() =>this.deleteProyect(proyectIdselect,filterForContent,sumEstadoPagado)}
          className="modal-close transparent teal-lighten-text waves-effect waves-red btn-flat btn-small">Guardar en el hitorico
          <i  className="material-icons left teal-lighten-text">assignment_late</i>
          </button>
        )
        }
      }else {
        closepage = (
        <button
        onClick={() =>this.deleteProyect(proyectIdselect,filterForContent,sumEstadoPagado)}
        className="modal-close transparent teal-lighten-text waves-effect waves-red btn-flat btn-small">eliminar
        <i  className="material-icons left">delete</i>
        </button>
      )
      }


      dif=Number(proyectBudgetselect)-Number(sumFor);
      var difformat=new Intl.NumberFormat("de-DE").format(dif);

      var gastox=(parseInt(Number(sumFor))/parseInt(Number(proyectBudgetselect))*100).toFixed(0);
      var margenx=(100-Number(gastox)).toFixed(0)

      bodyproyect = (
        <div className="padding-small white-text">
        <div className="col s6 left-align small"> Presupuesto : {new Intl.NumberFormat("de-DE").format(proyectBudgetselect)} </div>
        <div className="col s6 left-align small"> M : {difformat} / {margenx}% </div>
        <div className="col s6 left-align small"> Area : {proyectNameselect} </div>
        <div className="col s6 left-align small">  Cliente : {proyectClientselect} </div>
        <div className="col s6 left-align small"> desde : {moment(proyectDateIselect).format('LL')}  </div>
        <div className="col s6 left-align small">  hasta : {moment(proyectDateFselect).format('LL')} </div>
        {closepage}
        </div>
      )
    }
    ulFilter=(
      <ul  className="collapsible popout popout-margin padding-none margin-t-b-none">

      <li className="collection-item margin-bottom-medium margin-l-r-none">

        <div className="row padding-t-b-none margin-none white">
        <div className="input-field col s9 m9 l9 padding-t-b-none margin-t-b-none">
        <form action="#" autoComplete="off">
        <input
        placeholder="filtrar"
        className="padding-t-b-none margin-t-b-none"
        id="searchHandler"
        type="text"
        onChange ={this.searchHandler}
        value ={term}
        />
        <span className="helper-text" data-error="wrong" data-success="right">
        {new Intl.NumberFormat("de-DE").format(sumForFilter)} de {new Intl.NumberFormat("de-DE").format(sumFor)}</span>
        </form>
        </div>

        <div className="input-field col s3 m3 l3 valign-wrapper">
        <span className="new badge white-text modal-trigger waves-effect modal-trigger"
        data-target="modal1"
        data-badge-caption=""
        onClick={this.rstselectId}
        >
        AGREGAR
        </span>
        </div>

        <div className="input-field col s12 m6 l6 padding-t-b-none margin-t-b-none">



      </div>

      </div>
      </li>



        <li className="collection-item margin-l-r-small">
        <div className="collection collection-active teal lighten-1 row  margin-none border-radius-none" >
        <a href="# /"  className="collection-item active margin-none bordernone border-radius-none teal lighten-1">
        <div className="max-width-title">{contentselected}.</div>
        <span className="new badge" data-badge-caption={sumForformat}>Total $</span>
        </a>
        {bodyproyect}
        </div>
        <div className="collapsible-body"></div>
        </li>
      </ul>
    )
  }



const stringTG = filter.map((task) => task.proyecto);

const TG = stringTG.filter(function(elem, pos) {
   return stringTG.indexOf(elem) === pos;
});

//console.log(this.state.editar);
//console.log(this.state.leer);

    return (
<div>

<ul className="sidenav collapsible margin-none" id="mobile-demo">
    <li>
      <div className="collection padding-none">
      <a href="#!" className="collection-item padding-medium active margin-none">
      <h4 className="margin-none">{moment().format('LL')}</h4>
      </a>
      </div>

    </li>
    <li>
    <div className="collapsible-header collection padding-none">
    <a href="#!" className="collection-item padding-medium active margin-none">Histórico de pagos</a></div>
    <div className="collapsible-body paddin-none">
    {
      this.state.hitorics.map( x => {
        return(
            <div  className="collection" key={x.Id}>
            <a onClick={() =>this.gethistorico(x.name)} href="#!" className="collection-item padding-none margin-none white">
            {x.name}
            </a>
            </div>
        )
      })
    }
    </div>
    <div className="collapsible-header collection padding-none">
    <a href="#!" className="collection-item padding-medium active margin-none">Histórico de pago en curso</a></div>
    <div className="collapsible-body paddin-none">
    {
      this.state.historicxdata.map( note => {
        return(
            <div  className="collection paddin-none margin-none" key={note.noteId}>
            <a href="#!" className="collection-item padding-none margin-none white">
            <small className="xsmall">{note.nombre_1} {note.nombre_2} {note.nombre_3}</small>
            <span className="right xsmall" >$ .{new Intl.NumberFormat("de-DE").format(note.costo)}</span>
            </a>
            </div>
        )
      })
    }
    </div>
    </li>
    <li>
    <div className="collection padding-none">

    <a href="#!" className="collection-item active margin-none">
    <span className="new badge" data-badge-caption="">$ {new Intl.NumberFormat("de-DE").format(totalalertas)} .-</span>
    Deuda.
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertastardias")}>
    <span className="new badge tardias" data-badge-caption=""><strong>{alertastardias}</strong></span>
    Alertas tardías
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertascriticas")}>
    <span className="new badge criticas" data-badge-caption=""><strong>{alertascriticas}</strong></span>
    Alertas críticas
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertastempranas")}>
    <span className="new badge tempranas" data-badge-caption=""><strong>{alertastempranas}</strong></span>
    Alertas tempranas
    </a>
    </div>
    </li>


    <li><a href="# /" onClick={() => this.changeTo('Gastos generales')}>Gastos generales.</a></li>

    <li><a href="# /" className='dropdown-trigger' data-target='dropdownRRHH2'>RRHH.</a></li>
    <ul id='dropdownRRHH2' className='dropdown-content'>
     <li><a href="# /" onClick={() => this.changeTo('RRHH. Eporadico')}>Eporadico</a></li>
     <li><a href="# /" onClick={() => this.changeTo('RRHH. Transversal')}>Transversal</a></li>
    </ul>

    <li><a className='modal-trigger' href="#modalservice">Servicios.</a></li>

</ul>


<div className="navbar-fixed ">

<nav>
<div className="nav-wrapper ">

  <div className="brand-logo">
   <img src={logo} className="App-logo" alt="logo" />
  </div>

  <ul className="right">
  { this.renderLoginButton() }
  </ul>
<div className={this.state.leer}>
  <a href="# /" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
  <ul className="right hide-on-med-and-down">

    { this.renderuseradmin(this.state.useradmin) }


    <li><a href="# /" onClick={() => this.changeTo('Gastos generales')}>Gastos generales.</a></li>

    <li><a href="# /" className='dropdown-trigger' data-target='dropdownRRHH'>RRHH.</a></li>
    <ul id='dropdownRRHH' className='dropdown-content'>
     <li><a href="# /" onClick={() => this.changeTo('RRHH. Eporadico')}>Eporadico</a></li>
     <li><a href="# /" onClick={() => this.changeTo('RRHH. Transversal')}>Transversal</a></li>
    </ul>

    <li><a className='modal-trigger' href="#modalservice">Servicios.</a></li>

  </ul>
</div>

</div>
</nav>

</div>

<div className={this.state.leer}>
<div id="modalhistoric" className="modal padding-none maxbottom ">
<div className="modal-content padding-none">
{this.state.historicojsx}
</div>
</div>

<div className="row document">

<div>
<div id="contentstaticleft" className="col s12 m12 l3 hide-on-med-and-down">
<div id="contentstaticleftcard" className="col l3">

<div className="contennavstatic">
<div className="col s12 m12 l12 padding-none">



<ul className="collapsible margin-none">
    <li>
      <div className="collapsible-header collection padding-none">
      <a href="#!" className="collection-item padding-medium active margin-none">
      <h4 className="margin-none">{moment().format('LL')}</h4>
      </a>
      </div>

      <div className="collapsible-body padding-medium">
      <div id="carddatepicker" className="card margin-none padding-none">
      <DatePicker
        inline
        name='startDate'

        selected={moment()}
        onChange={this.handleEstartDate}
        selectsStart
        startDate={moment()}
        endDate={moment().add(7,'days')}
        showMonthDropdown
      />
      </div>
      </div>
    </li>
    <li>
    <div className="collapsible-header collection padding-none">
    <a href="#!" className="collection-item padding-medium active margin-none">Histórico de pagos</a></div>
    <div className="collapsible-body paddin-none">
    {
      this.state.hitorics.map( x => {
        return(
            <div  className="collection" key={x.Id}>
            <a onClick={() =>this.gethistorico(x.name)} href="#!" className="collection-item padding-none margin-none white">
            {x.name}
            </a>
            </div>
        )
      })
    }
    </div>
    <div className="collapsible-header collection padding-none">
    <a href="#!" className="collection-item padding-medium active margin-none">Histórico de pago en curso</a></div>
    <div className="collapsible-body paddin-none">
    {
      this.state.historicxdata.map( note => {
        return(
            <div  className="collection paddin-none margin-none" key={note.noteId}>
            <a href="#!" className="collection-item padding-none margin-none white">
            <small className="xsmall">{note.nombre_1} {note.nombre_2} {note.nombre_3}</small>
            <span className="right xsmall" >$ .{new Intl.NumberFormat("de-DE").format(note.costo)}</span>
            </a>
            </div>
        )
      })
    }
    </div>
    </li>
    <li>
    <div className="collection padding-none">
    <a href="#!" className="collection-item padding-medium active margin-none">
    <span className="new badge" data-badge-caption="">$ {new Intl.NumberFormat("de-DE").format(totalalertas)} .-</span>
    Deuda.
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertastardias")}>
    <span className="new badge tardias" data-badge-caption=""><strong>{alertastardias}</strong></span>
    Alertas tardías
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertascriticas")}>
    <span className="new badge criticas" data-badge-caption=""><strong>{alertascriticas}</strong></span>
    Alertas críticas
    </a>

    <a href="#!" className="collection-item padding-medium" onClick={() =>this.changeToAlert("alertastempranas")}>
    <span className="new badge tempranas" data-badge-caption=""><strong>{alertastempranas}</strong></span>
    Alertas tempranas
    </a>
    </div>
    </li>

</ul>









</div>


</div>
</div>


</div>




<div className="col s12 m12 l9 padding-l-r-none">



<div id="modalUser" className="modal padding-none maxbottom ">
<div className="modal-content padding-none">
<Users
list={this.state.uerslist}
levelSelect={this.levelSelect}
/>
</div>
</div>

<div id="modalservice" className="modal padding-none maxbottom ">
<div className="modal-content padding-none">

<ul className="collection margin-none">
  <li className="collection-item active">
  <div>Areas de servicios
  <a href="#!" className="secondary-content modal-trigger" data-target="modalAddService">
  <i className="material-icons">add_circle_outline</i>
  </a>
  </div>
  </li>
</ul>




<ul className="collapsible margin-none">

{
this.state.services.map( service => {
    return(
      <Service
      servicecontent={service.serviceContent}
      serviceid={service.serviceId}
      key={service.serviceId}

      removeService={this.removeService}
      rstClient = {this.rstClient}
      rstservicecontent={this.rstservicecontent}
      proyectSelect = {this.proyectSelect}
      client = {clients}
      />
    )
  })
}
</ul>
</div>
</div>

<div id="modalAddService" className="modal">
<div className="modal-content">
<form action="#" autoComplete="off" onSubmit={this.addService}>
<input
value={this.state.nwservice}
name= "nwservice"
type="text"
placeholder="Nuevo servicio"
onChange={this.handleChange}
/>
<div className="modal-footer">
  <button type="submitsubmit" className="modal-close waves-effect waves-green btn-flat" >Guardar</button>
</div>
</form>
</div>
</div>

<div id="modalPago" className="modal">
<div className="modal-content padding-none">
<form action="#"  autoComplete="off" onSubmit={this.putpago}>

<ul className="collection margin-none">

      <li className="collection-item padding-bottom-big">
      <div className="section">
      <h6>
      {this.state.pagonoteContent}
      <br/>
      {this.state.pagonombre_1} {this.state.pagonombre_2} {this.state.pagonombre_3}
      </h6>

      <p className="grey-text">Total. ${ new Intl.NumberFormat("de-DE").format(this.state.pagocosto)}</p>

      <br/>
      <button type="submit" className="waves-effect waves-light btn-large width100">PAGAR</button>

      </div>
      </li>


      <div className={this.state.pagoesporadicodisplay}>
      <li className="collection-item">
      <label>
        <input name="tipopago" type="radio" checked={this.state.esporadicochecked}   onChange={this.handleChangetipopago1} />
        <span className="width100">
        Pago esporádico<br/>
        <small>( eliminar al pagar )</small>
        </span>
      </label>
      </li>
      </div>

      <div className={this.state.pagotransversaldisplay}>
      <li className="collection-item">
      <label>

        <input name="tipopago" type="radio" checked={this.state.transversalchecked}   onChange={this.handleChangetipopago2}/>
        <span className="width100">
        Pago transversal<br/>
        proxima expiración
        </span>


        <DatePicker
        className="grey-text"
        name='pagofecha_t'
        selected={moment(this.state.pagofecha_t)}
        onChange={this.handleChange_fecha_t}
        dateFormat = "LL"
        peekNextMonth
        dropdownMode="select"
        required
        />

      </label>
      </li>
      </div>

</ul>

</form>

</div>
</div>

<div id="modalAddClient" className="modal">
<div className="modal-content">
<form action="#"  autoComplete="off" onSubmit={this.addClient}>
<input
name="nwclientid"
id="nwclientid"
value={this.state.nwclientid}
type="hidden"
onChange={this.handleChange}
/>
<input
name="nwclient"
id="nwclient"
value={this.state.nwclient}
type="text"
placeholder="Nombre de cliente"
onChange={this.handleChange}
/>
<input
name="nwclientphone"
id="nwclientphone"
value={this.state.nwclientphone}
type="text"
placeholder="Numero de contacto"
onChange={this.handleChange}
/>
<input
name="nwclientmail"
id="nwclientmail"
value={this.state.nwclientmail}
type="text"
placeholder="E-mail de contacto"
onChange={this.handleChange}
/>
<input
name="nwclientadress"
id="nwclientadress"
value={this.state.nwclientadress}
type="text"
placeholder="Direcciòn"
onChange={this.handleChange}
/>
<input
name="nwclientrut"
id="nwclientrut"
value={this.state.nwclientrut}
type="text"
placeholder="RUT"
onChange={this.handleChange}
/>
<input
name="nwclientgiro"
id="nwclientgiro"
value={this.state.nwclientgiro}
type="text"
placeholder="Giro"
onChange={this.handleChange}
/>
<div className="modal-footer">
<button type="submitsubmit" className="modal-close waves-effect waves-green btn-flat" >Guardar</button>
</div>
</form>
</div>
</div>

<Proyect
idselect={this.state.proyectselect}
nameselect={this.state.proyectnameselect}
proyectphone={this.state.proyectphone}
proyectmail={this.state.proyectmail}
proyectadress={this.state.proyectadress}
proyectrut={this.state.proyectrut}
proyectgiro={this.state.proyectgiro}
rstservicecontent={this.state.rstservicecontent}

addProyect={this.addProyect}
proyect={this.state.proyect}
removeClient = {this.removeClient}
editProyect={this.editProyect}
SelectProyect={this.SelectProyect}
/>



<div id="modal1" className="modal modal-fixed-footer">
<NoteForm
TG ={TG}
addNote={this.addNote}
idselected={this.state.idselected}
contentselected={this.state.contentselected}
nombre_1selected={this.state.nombre_1selected}
nombre_2selected={this.state.nombre_2selected}
nombre_3selected={this.state.nombre_3selected}
rutselected={this.state.rutselected}
cargoselected={this.state.cargoselected}
costoselected={this.state.costoselected}
bancoselected={this.state.bancoselected}
cuentaselected={this.state.cuentaselected}
tipocuentaselected={this.state.tipocuentaselected}
correoselected={this.state.correoselected}
fecha_iselected={this.state.fecha_iselected}
fecha_tselected={this.state.fecha_tselected}
estadoselected={this.state.estadoselected}
servicioselected={this.state.servicioselected}
clienteselected={this.state.clienteselected}
proyectoselected={this.state.proyectoselected}
mongodbselected={this.state.mongodbselected}
isproyect={proyectIdselect}
/>
</div>


<div className="feed">
{ulFilter}
{
TG.map( tg => {

return(
  <Prenote
  tg={tg}
  key={this.guid()}
  string={filter.filter(searchingForProyect(tg))}
  removeNote={this.removeNote}
  selectId={this.selectId}
  rstselectId={this.rstselectId}
  pago={this.pago}
  contentselected={contentselected}
  disabled={this.state.editar}
  />
)
})
}






</div>

</div>

</div>


</div>
</div>


</div>

    );
  }
}

export default App;
