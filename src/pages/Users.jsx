import React, { useEffect, useState } from 'react'
import services from '../services/services'
import User from '../components/User';


export default function Users(props) {
  // local
  var [isLoading, setIsLoading] = useState(true);
  var [data, setdata] = useState([]);

  const getDataPublish = async () => {
    await services
      .get("api/user")
      .then((res) => {
        setdata(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDataPublish()
  }, [])

  return (
    <div>
        {isLoading ? (
          <b>Estoy cargando chaval..</b>
        ) : (
          data.map((x) => <User datos={x} key={x._id}/>)
        )}
    </div>
   );

}