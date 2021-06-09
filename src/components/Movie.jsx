/*
export default function Movie(props) {
  let datos = props.datos;

  return (
    <div>
      <br/>cover: {datos.cover}
      <br/>director: {datos.director}
      <br/>duration: {datos.duration}
      <br/>rate: {datos.rate}
      <br/>title: {datos.title}
      <br/>year: {datos.year}
    </div>
   );

}
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { datos } = props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let defaultImage = "https://static.wikia.nocookie.net/youtubepedia/images/c/c0/Inco.jpg/revision/latest/top-crop/width/360/height/450?cb=20190427181002&path-prefix=es"
  let { datos: { images } } = props;
  let image = ''//images.length === 0 ? defaultImage : images[0].base64;

  function b64toBlob(dataURI) {
    var byteString = window.atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
  try {
    image = URL.createObjectURL(b64toBlob(image))
  } catch (err) {
    image = defaultImage
  }
  return (
    <Grid item xs='auto' md='auto' lg='auto' key={datos.id}>

      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={datos.title}
        />
        {/* <CardMedia square
          className={classes.media}
          imageUrl={image}
          title="Paella dish"
        /> */}
        <img src="https://static.wikia.nocookie.net/youtubepedia/images/c/c0/Inco.jpg/revision/latest/top-crop/width/360/height/450?cb=20190427181002&path-prefix=es" style={{ width: "100%" }} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {datos.director}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>

          <IconButton aria-label="share">
            <ShareIcon />
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
            <Typography paragraph>
              Director: {datos.director}
            </Typography>
            <Typography paragraph>
              Titulo: {datos.title}
            </Typography>
            <Typography paragraph>
              Duracion: {datos.duration}
            </Typography>
            <Typography paragraph>
              Rate: {datos.rate}
            </Typography>
            <Typography paragraph>
              Año: {datos.year}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}