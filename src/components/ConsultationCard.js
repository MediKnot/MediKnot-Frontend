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
    width:550
  },
  media: {
    height: 140,
  },
});

export default function ConsultationCard({details}) {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} mh mv`}>
      <CardActionArea>
        <CardContent>
          <div className="row ai-c jc-sb">
            <Typography gutterBottom variant="h5" component="h2">
              {details.concerns[0]}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h4">
              {details.consultationDate}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="h4" style={{marginTop:-10,marginBottom:10}}>
              {details.doctor.name}
            </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {details.notes[0]}
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          View Consultation
        </Button>
      </CardActions>
    </Card>
  );
}