import React, { Component } from 'react';
import Client from './clients';


function searchingClient(clientService){
  return function(x){
      const data = x.clientService;
      return data.includes(clientService);
  }
}

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthclient:'',
  }
this.servicecontent = props.servicecontent;
this.serviceid= props.serviceid;
this.client = props.client;

this.removeClient = this.removeClient.bind(this);
this.proyectSelect = this.proyectSelect.bind(this);
this.rstClient = this.rstClient.bind(this);

  }


  handleRemove(id){
    const response = window.confirm('¿estas seguro de eliminar los datos?')
    if (response){
      this.props.removeService(id);
    }
    return;
  }

  proyectSelect(id,proyecto,clientphone,clientmail,clientadress,clientrut,clientgiro){
  this.props.proyectSelect(id,proyecto,clientphone,clientmail,clientadress,clientrut,clientgiro);
  }

  rstClient(service,servicecontent){
    this.props.rstClient(service);
    this.props.rstservicecontent(servicecontent);
  }

  removeClient(id){
    const response = window.confirm('¿estas seguro de eliminar los datos?')
    if (response){
    this.props.removeClient(id);
    }
    return;
  }
  lengthData(length){
    this.setState({lengthclient:length});
  }


  render(){
    const lenght=this.client.filter(searchingClient(this.serviceid)).length
    const spanDelete=(
      <i onClick={() => this.handleRemove(this.serviceid)}
      className="material-icons margin-top-small badge waves-effect transparent waves-red padding-none margin-none Tiny-medium right"
      >
      delete
      </i>
    )
var testdelet=''
    if(lenght === 0){
      testdelet=spanDelete
    }else
    {
      testdelet=(<font className="margin-l-r-medium">{lenght}</font>)
    }

    return(

      <li>
      <div className="collapsible-header" onClick={() => this.rstClient(this.serviceid,this.servicecontent)}>
       <a href="#/" className="collection-item grey-text">
      {this.servicecontent}
      <span className="badge">
      <i
      className="material-icons margin-none right modal-trigger"
      data-target="modalAddClient"
      data-badge-caption=""
      onClick={() => this.rstClient(this.serviceid,this.servicecontent)}
      >
      add_circle_outline</i> {testdelet}
      </span>
      </a>
      </div>
      <div className="collapsible-body padding-none">
      <Client
      serviceid = {this.serviceid}
      service = {this.servicecontent}
      client = {this.client}

      removeClient={this.removeClient}
      proyectSelect={this.proyectSelect}
      rstClient={this.rstClient}
      />
      </div>

      </li>
    )
  }
}

export default Services;
