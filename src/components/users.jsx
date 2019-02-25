import React, { Component } from 'react';



class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {

  }

  }





  render(){

    return(

<div className="collection margin-none padding-none row white">

{
  this.props.list.map( usr => {
            return(
              <div key={usr.uid} className="col s12 m12 l12 margin-none padding-none">

              <div className="col s12 m12 l12 margin-none padding-none">
              <a href="#!" className="collection-item avatar userlist white userlist">
              <img src={usr.foto} alt="" className="circle"/>
              <span  className="black-text">{usr.nombre}</span ><br/>
              <small>{usr.email}</small>
              </a>
              </div>



              <div className="col s12 m12 l12 margin-none userlist-content-btn">
              <span className="new badge " data-badge-caption="leer y editar"></span>
              <span className="new badge " data-badge-caption="solo leer"></span>
              <span className="new badge " data-badge-caption="denegado"></span>
              <div className="divider"></div>
              </div>


              </div>

            )
          }
        )
      }



</div>
    )
  }
  }


export default Users;
