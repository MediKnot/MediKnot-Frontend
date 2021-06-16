import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../App.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardComponent() {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} mh mv`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://cdn1.poz.com/6598_Chem-Screen-Test.png_8a8e10d9-46bd-41c7-b230-37d851203941.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Blood Test
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Blood tests help doctors check for certain diseases and conditions. 
          They also help check the function of your organs and show how well treatments are working. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Report
        </Button>
      </CardActions>
    </Card>
  );
}