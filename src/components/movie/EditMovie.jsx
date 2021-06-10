import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, Fade, Select, Typography } from '@material-ui/core';
import services from '../../services/services'
import { formatDiagnostic } from 'typescript';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function EditMovie(props) {
  const { datos } = props;

  const initState = {
    "title": datos.title,
    "year": datos.year,
    "director": datos.director,
    "duration": datos.duration,
    "rate": datos.rate,
    "cover": datos.cover
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", "message": "" })
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({ ...initState })
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    setIsLoading(true)
    await services
    .put(`api/movie/${datos._id}`, form)
    .then((res) => {
      setIsLoading(false)
      setMessage({ type: "success", message: "Publicacion Modificada Correctamente" })
      props.getDatos()
    })
    .catch((err) => {
      setIsLoading(false)
      setMessage({ type: "error", message: "Error al modificar la publicacion" })
      console.error(err);
    });

  }

  return (
    <div>
      <IconButton aria-label="share" onClick={handleClickOpen}>
            <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear publicacion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa estos datos para crear tu publicacion!
          </DialogContentText>
          <Fade in={message.type == "error"}>
            <Typography color="secondary" >
              {message.message}
            </Typography>
          </Fade>

          <Fade in={message.type == "success"}>
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
              Modificar publicacion
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}