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
    maxWidth: 500,
    minWidth: 300
  },
  media: {
    height: 140,
  },
});

export default function CardComponent({ data }) {
  const classes = useStyles();


  const handleClick = () => {
    window.open(data.reportUrl);
  }

  return (
    <Card className={`${classes.root} mh mv`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.reportUrl}
          title={data.name}
        />
        <CardContent>
          <div className="row ai-c jc-sb">
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.date}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          View Report
        </Button>
      </CardActions>
    </Card>
  );
}