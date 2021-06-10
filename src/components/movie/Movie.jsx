import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import services from "../../services/services";
import EditMovie from "./EditMovie";
import { CircularProgress } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { datos } = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    setIsLoading(true)
    await services
      .delete(`api/movie/${datos._id}`)
      .then((res) => {
        props.getDatos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid item xs="auto" md="auto" lg="auto" key={datos.id}>
      <Card className={classes.root}>
        <CardHeader title={datos.title} />

        <img src={datos.cover} style={{ width: "100%" }} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {datos.director}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <EditMovie datos={datos} getDatos={props.getDatos} />
          </IconButton>
          <IconButton aria-label="share">
            {isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <DeleteIcon onClick={handleDelete}/>
            )}
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Director: {datos.director}</Typography>
            <Typography paragraph>Titulo: {datos.title}</Typography>
            <Typography paragraph>Duracion: {datos.duration}</Typography>
            <Typography paragraph>Rate: {datos.rate}</Typography>
            <Typography paragraph>Año: {datos.year}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
