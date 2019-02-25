import React, { Component } from 'react';
import Note from './note'


class Prenote extends Component {
  constructor(props) {
    super(props);
    this.state = {

  }

  }





  render(){
var li="";

  if(this.props.tg && this.props.contentselected){
    li =(<li className="collection-item margin-l-r-small ">
      <div className="collection collection-active row margin-none border-radius-none">
        <a href="# /"  className="collection-item teal lighten-2 white-text">
      {this.props.tg}
        </a>
      </div>

    </li>);
  }




    return(
      <ul className="collapsible popout popout-margin padding-none margin-t-b-none">
      {li}
          {
            this.props.string.map( note => {
                      return(
                      <Note
                      noteContent={note.noteContent}
                      noteId={note.noteId}
                      nombre_1={note.nombre_1}
                      nombre_2={note.nombre_2}
                      nombre_3={note.nombre_3}
                      rut={note.rut}
                      cargo={note.cargo}
                      costo={note.costo}
                      banco={note.banco}
                      cuenta={note.cuenta}
                      tipocuenta={note.tipocuenta}
                      correo={note.correo}
                      fecha_i={note.fecha_i}
                      fecha_t={note.fecha_t}
                      estado={note.estado}
                      servicio={note.servicio}
                      cliente={note.cliente}
                      proyecto={note.proyecto}
                      mongodb={note.mongodb}

                      key={note.noteId}
                      removeNote={this.props.removeNote}
                      selectId={this.props.selectId}
                      rstselectId={this.props.rstselectId}
                      pago={this.props.pago}
                      contentselected={this.props.contentselected}
                      tg={this.props.tg}
                      disabled={this.props.disabled}

                       />
                      )
                    })
          }
          </ul>


    )
  }
}

export default Prenote;
