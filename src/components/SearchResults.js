import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import '../App.css';
import DiseaseCard from './DiseaseCard';
import axios from '../utils/BaseUrl'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SearchResults({ setShow, show }) {
  const classes = useStyles();
  const handleClose = () => {
    setShow(false);
  };
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    axios.get(`/disease/search?name=${e.target.value}`)
      .then(res => {
        if(res.status === 200) setData(res.data.content);
      })
  }
  const body = (
    <div style={{ height: '80%', width: '80%', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0, overflowY: 'scroll', backgroundColor: '#e3e3e3', borderWidth: 0, borderRadius: 15}} className={`${classes.paper} mh`}>
      <h2>Enter a symptom or disease or medicine</h2>
      <form className="row ai-c">
        <h3>Search: </h3>
        <input value={keyword} onChange={handleSearch} type="text" className="input-large shadow mh" placeholder="Symptom or disease or medicine .."/>
      </form>
      <div>
        {data.map((dis, i) => (
          <div key={i}><DiseaseCard data={dis}/></div>
        ))}
        {data.length===0 ? <h2>Start your search</h2> : null}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
