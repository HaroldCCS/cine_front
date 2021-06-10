import React, { useEffect, useState } from 'react'
import services from '../services/services'
import Movie from '../components/movie/Movie';
import AddMovie from '../components/movie/AddMovie';
import { Grid , CircularProgress} from "@material-ui/core";

export default function Movies(props) {
  let [isLoading, setIsLoading] = useState(true);
  let [data, setdata] = useState([]);

  const getDataPublish = async () => {
    await services
      .get("api/movie")
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
      <h1>Peliculas</h1>
      <AddMovie getDatos={getDataPublish}/>
      <Grid container spacing={4} direction="row" justify="space-evenly">
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          data.map((x) => <Movie datos={x} key={x._id} getDatos={getDataPublish}/>)

        )}
      </Grid>
      </>
   );

}