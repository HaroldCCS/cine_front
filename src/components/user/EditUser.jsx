import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress, Fade, Typography } from "@material-ui/core";
import services from "../../services/services";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

export default function EditUser(props) {
  const { datos } = props;

  const initState = {
    "name": datos.name,
    "email": datos.email,
    "username": datos.username,
    "password": datos.password
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", message: "" });
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({ ...initState });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await services
      .put(`api/user/${datos._id}`, form)
      .then((res) => {
        console.log(res);
        if (res.statusCode === 400) {
          setIsLoading(false)
          setMessage({ type: "error", message: "Error al modificar la productora" })
        } else {
          setIsLoading(false)
          setMessage({ type: "success", message: "Productora modificada correctamente" })
          props.getDatos()
          setOpen(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage({
          type: "error",
          message: "Error al modificar la publicacion",
        });
        console.error(err);
      });
  };

  return (
    <div>
      <IconButton aria-label="share" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modificar Productora</DialogTitle>
        <DialogContent>
          <Fade in={message.type === "error"}>
            <Typography color="secondary">{message.message}</Typography>
          </Fade>

          <Fade in={message.type === "success"}>
            <Typography style={{ color: "green" }}>
              Publicacion realizada correctamente.
            </Typography>
          </Fade>
          <form id="formSend" onSubmit={handleSubmit}>
          <TextField
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              autoFocus
              margin="dense"
              id="name"
              label="Nombre del name"
              type="text"
              fullWidth
            />
            <TextField
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              autoFocus
              margin="dense"
              id="email"
              label="Ingrese su email"
              type="email"
              fullWidth
            />
            <TextField
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              autoFocus
              margin="dense"
              id="username"
              label="Ingrese su nombre de usuario"
              type="text"
              fullWidth
            />
            <TextField
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              autoFocus
              margin="dense"
              id="password"
              label="Cree su contraseña"
              type="password"
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
