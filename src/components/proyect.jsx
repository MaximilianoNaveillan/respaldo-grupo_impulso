import React, { Component } from 'react';

import 'materialize-css/dist/css/materialize.min.css'

import DatePicker from 'react-datepicker';
import moment from 'moment';

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

function searchingProyect(idselect){
  return function(x){
      const data = x.idclient;
      return data.includes(idselect);
  }
}

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


class Proyect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nwproyectName: '',
      nwproyectValue: '',
      nwproyectDateI:moment(),
      nwproyectDateF:moment().add( 1 , 'months' ),
      nwproyectBudget: '',
      nwproyectComent: '',

  }
  this.idselect= props.idselect;
  this.nameselect= props.nameselect;
  this.proyectphone= props.proyectphone;
  this.proyectmail= props.proyectmail;
  this.proyectadress= props.proyectadress;
  this.proyectrut= props.proyectrut;
  this.proyectgiro= props.proyectgiro;
  this.handleChange = this.handleChange.bind(this);
  this.addProyect = this.addProyect.bind(this);

  this.handleChange_fecha_i = this.handleChange_fecha_i.bind(this);
  this.handleChange_fecha_t = this.handleChange_fecha_t.bind(this);
  }

  editProyect(nameselect,idselect,proyectphone,proyectmail,proyectadress,proyectrut,proyectgiro){
   this.props.editProyect(nameselect,idselect,proyectphone,proyectmail,proyectadress,proyectrut,proyectgiro)
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleChange_fecha_i = (date) => {
  if(date!=null){
      this.setState({
        nwproyectDateI:date
      });
    }
    }

  handleChange_fecha_t = (date) => {
    if(date!=null){
        this.setState({
        nwproyectDateF:date
        });
      }
      }

  addProyect(event){
      event.preventDefault()
      this.props.addProyect(
      this.props.idselect,
      this.state.nwproyectName,
      this.state.nwproyectValue,
      this.state.nwproyectDateI,
      this.state.nwproyectDateF,
      this.state.nwproyectBudget,
      this.state.nwproyectComent
    );
    this.setState({
      nwproyectName: '',
      nwproyectValue: '',
      nwproyectDateI:moment(),
      nwproyectDateF:moment().add( 1 , 'months' ),
      nwproyectBudget: '',
      nwproyectComent: '',
    })
  }

  handleRemove(id){
      this.props.removeClient(id);
  }

  SelectProyect(clientselect,rstservicecontent,proyectId,proyectName,proyectDateI,proyectDateF,proyectBudget,proyectComent){
    this.props.SelectProyect(clientselect,rstservicecontent,proyectId,proyectName,proyectDateI,proyectDateF,proyectBudget,proyectComent);
  }

  returnfalse(){
    return false;
  }

  render(){
    const {nameselect, proyect,idselect,proyectphone,proyectmail,proyectadress,proyectrut,proyectgiro,rstservicecontent} = this.props;
    const {nwproyectName, nwproyectBudget, nwproyectComent} = this.state;
    const filter=proyect.filter(searchingProyect(idselect));
    const lenght=filter.map((task) => task.estado ).reduce(function (previous, current) {
    return previous + 1
    }, 0);
    var delet="";
    if(lenght===0){
      delet=(
        <i
        onClick={() => this.handleRemove(idselect)}
        className="modal-close material-icons Tiny-medium "
        data-target="modalProyect"
        >
        delete
        </i>
      );
    }




    moment.locale('tr') //Turkey
    return(
      <div>

      <div id="modalAddProyect" className="modal modal-fixed-footer ">
      <form  action="#"  autoComplete="off" onSubmit={this.addProyect}>
      <div className="modal-content padding-l-r-none">
      <div className="row padding-none margin-none">


      <div className="row padding-medium margin-none">

      <div className="input-field col s12 m6 l6 content-react-dp">
      <DatePicker
      customInput={<DesdeCustomInput />}
      todayButton={"Hoy"}
      selected={moment(this.state.nwproyectDateI)}
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
      todayButton={"Hoy"}
      selected={moment(this.state.nwproyectDateF)}
      onChange={this.handleChange_fecha_t}
      dateFormat = "LL"
      peekNextMonth
      dropdownMode="select"
      required
      />
      <label className="active">Fecha de expiraciòn</label>
      </div>


        <div className="input-field col s12 m6 l6 content-react-dp">
        <input
        type="text"
        placeholder="Nombre de preyecto"
        name="nwproyectName"
        value={nwproyectName}
        id="nwproyectName"
        onChange={this.handleChange}
        required
        />
        <label className="active">Nombre de preyecto</label>
        </div>

        <div className="input-field col s12 m6 l6 content-react-dp">
        <input
         className="campo-numerico" type="number" min="1" pattern="^[0-9]+" onPaste={() => this.returnfalse} onDrop={() => this.returnfalse} autoComplete="off"
        placeholder="Presupuesto"
        name="nwproyectBudget"
        value={nwproyectBudget}
        id="nwproyectBudget"
        onChange={this.handleChange}
        required
        />
        <label className="active">Presupuesto</label>
        <span className="helper-text" data-error="wrong" data-success="right">$ {new Intl.NumberFormat("de-DE").format(nwproyectBudget)}</span>
        </div>

        <div className="input-field col s12 content-react-dp">
        <input
        type="text"
        placeholder="comentario"
        name="nwproyectComent"
        value={nwproyectComent}
        id="nwproyectComent"
        onChange={this.handleChange}
        />
        <label className="active">Comentario</label>
        </div>
        </div>
        </div>
        </div>
        <div className="modal-footer grey lighten-4 margin-none">
        <button type="submitsubmit" className="waves-effect waves-blue btn-flat">Guardar</button>
        </div>
        </form>
      </div>

      <div id="modalProyect" className="modal padding-none maxbottom ">
        <div className="modal-content padding-none">

        <ul className="collection collapsible margin-none  teal lighten-1">
          <li className="collection-item active margin-none ">

          <div className="row">
          <div className="col s12 m12 l12 ">
          <font className="modal-trigger modal-close" href="#modalservice">
          <i className="material-icons left padding-none margin-none">chevron_left</i>
          Area / {rstservicecontent}
          </font> / {nameselect} {lenght}
          <a href="#!" className="secondary-content modal-trigger" data-target="modalAddProyect">
          <i className="material-icons">add_circle_outline</i>
          </a>
          </div>

          <div className="col s6 m6 l6 center-align margin-none padding-none">
          {delet}
          </div>

          <div className="col s6 m6 l6 left-align">
          <span className="new badge white-text modal-trigger waves-effect"
          data-badge-caption=""
          data-target="modalAddClient"
          onClick={() => this.editProyect(nameselect,idselect,proyectphone,proyectmail,proyectadress,proyectrut,proyectgiro)}
          >
          EDITAR
          </span>
          </div>



          <div className="col s12 m12 l12 margin-none">
          <div className="input-field col s12 m6 l6 padding-none margin-none small">
          Fono : {proyectphone}
          </div>

          <div className="col s6 m6 l6 padding-none margin-none small">E-mail : {proyectmail}</div>

          <div className="col s6 m6 l6 padding-none margin-none small">Direcciòn : {proyectadress}</div>

          <div className="col s6 m6 l6 padding-none margin-none small">Rut : {proyectrut}</div>

          <div className="col s6 m6 l6 padding-none margin-none small">Giro : {proyectgiro}</div>
          </div>


          </div>


          </li>
        </ul>
</div>

      <div className="collection margin-none" >
      {
        filter.map( proyect => {
          return (

            <a
            onClick={() => this.SelectProyect(
              nameselect,
              rstservicecontent,
              proyect.proyectId,
              proyect.proyectName,
              proyect.proyectDateI,
              proyect.proyectDateF,
              proyect.proyectBudget,
              proyect.proyectComent,
            )}
            key={proyect.proyectId}
            href="#!"
            className="collection-item modal-close"
            >


            <i>{proyect.proyectName}</i>
            </a>

          )
        })
      }
      </div>


      </div>

      </div>
    )
  }
}

export default Proyect;
