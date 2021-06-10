import React, { useEffect, useState } from 'react'
import services from '../services/services'
import User from '../components/user/User';
import AddUser from '../components/user/AddUser';
import { Grid , CircularProgress} from "@material-ui/core";

export default function Users(props) {
  let [isLoading, setIsLoading] = useState(true);
  let [data, setdata] = useState([]);

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
      <>
      <h1>Productores</h1>
      <AddUser getDatos={getDataPublish}/>
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          data.map((x) => <User datos={x} key={x._id} getDatos={getDataPublish}/>)

        )}
      </Grid>
      </>
   );

}