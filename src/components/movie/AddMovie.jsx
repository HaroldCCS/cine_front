import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, Fade, Typography } from '@material-ui/core';
import services from '../../services/services'

export default function AddMovie(props) {

  const initState = {
    "title": "",
    "year": "",
    "director": "",
    "duration": "",
    "rate": "",
    "cover": ""
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", "message": "" })
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({ ...initState })
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setMessage({ type: "", "message": "" })
    setForm({ ...initState })
    setOpen(false);
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    setIsLoading(true)
    await services
    .post("api/movie", form)
    .then((res) => {
      if (res.statusCode === 400) {
        setIsLoading(false)
        setMessage({ type: "error", message: "Error al crear la publicacion" })
      } else {
        setIsLoading(false)
        setMessage({ type: "success", message: "Publicacion hecha correctamente" })
        props.getDatos()
        setOpen(false);
      }

    })
    .catch((err) => {
      setIsLoading(false)
      setMessage({ type: "error", message: "Error al crear la publicacion" })
      console.error(err);
    });

  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Agrega tu publicacion!
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear publicacion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa estos datos para crear tu publicacion!
          </DialogContentText>
          <Fade in={message.type === "error"}>
            <Typography color="secondary" >
              {message.message}
            </Typography>
          </Fade>

          <Fade in={message.type === "success"}>
            <Typography style={{ color: "green" }} >
              Publicacion realizada correctamente.
            </Typography>
          </Fade>
          <form id="formSend" onSubmit={handleSubmit}>
            <TextField
              value={form.director}
              onChange={e => setForm({ ...form, director: e.target.value })}
              autoFocus
              margin="dense"
              id="director"
              label="Nombre del director"
              type="text"
              fullWidth
            />
            <TextField
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              autoFocus
              margin="dense"
              id="title"
              label="Titulo de la pelicula"
              type="text"
              fullWidth
            />
            <TextField
              value={form.duration}
              onChange={e => setForm({ ...form, duration: e.target.value })}
              autoFocus
              margin="dense"
              id="duration"
              label="Duración"
              type="text"
              fullWidth
            />
            <TextField
              value={form.rate}
              onChange={e => setForm({ ...form, rate: e.target.value })}
              autoFocus
              margin="dense"
              id="rate"
              label="Rate"
              type="number"
              fullWidth
            />
            <TextField
              value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              autoFocus
              margin="dense"
              id="year"
              label="Año"
              type="number"
              fullWidth
            />
            <TextField
              value={form.cover}
              onChange={e => setForm({ ...form, cover: e.target.value })}
              autoFocus
              margin="dense"
              id="cover"
              label="link de la imagen"
              type="text"
              fullWidth
            />
          </form>
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button form="formSend" type="submit" color="primary">
              Añadir publicacion
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}