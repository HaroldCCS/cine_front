import React, { useEffect, useState } from 'react'
import services from '../../services/services'


export default function Movie(props) {
  let datos = props.datos;

  return (
    <div>
      <br/>email: {datos.email}
      <br/>name: {datos.name}
      <br/>username: {datos.username}
    </div>
   );

}