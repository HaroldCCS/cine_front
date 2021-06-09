import React, { useEffect, useState } from 'react'
import services from '../services/services'
import Movie from '../components/Movie';

import { Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

export default function Movies(props) {
  // local
  var [isLoading, setIsLoading] = useState(true);
  var [data, setdata] = useState([]);

  const getDataPublish = async () => {
    await services
      .get("api/movie")
      .then((res) => {
        console.log(res);
        setdata(res.data);
        setIsLoading(false);
        console.log(data);
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
      <h1>Peliculas</h1>
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          data.map((x) => <Movie datos={x} key={x._id}/>)

        )}
      </Grid>
      </>
   );

}