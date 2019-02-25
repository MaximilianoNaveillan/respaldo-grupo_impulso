import React, { Component } from 'react';


function searchingClient(clientService){
  return function(x){
      const data = x.clientService;
      return data.includes(clientService);
  }
}
class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {

  }
this.serviceid= props.serviceid;
this.service = props.service;
this.client = props.client;

  }



proyectSelect(id,proyecto,clientphone,clientmail,clientadress,clientrut,clientgiro){
this.props.proyectSelect(id,proyecto,clientphone,clientmail,clientadress,clientrut,clientgiro);
}

  render(){
    const filter=this.client.filter(searchingClient(this.serviceid));


    return(
    <div className="padding-none">

    {
      filter.map( client => {

        return (
          <div className="collection" key={client.clientId}>
          <div className="divider"></div>
          <a href="# /"
          className="collection-item modal-trigger modal-close"
          data-target="modalProyect"
          onClick={() => this.proyectSelect(
            client.clientId,
            client.clientContent,
            client.clientphone,
            client.clientmail,
            client.clientadress,
            client.clientrut,
            client.clientgiro
          )}
          >

          <font>
          <i>.- {client.clientContent}</i>
          </font>

          </a>
          </div>
        )
      } )
    }

    </div>

    )
  }
}

export default Client;
