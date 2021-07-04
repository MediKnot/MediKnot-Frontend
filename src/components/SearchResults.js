import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core';
import '../App.css';
import DiseaseCard from './DiseaseCard';
import baseurl from '../utils/BaseUrl'
import axios from 'axios';
import Loader from '../components/Loader'


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
  const [searchby, setSearchby] = useState("disease");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    if (searchby === 'disease') {
      baseurl.get(`/disease/search?name=${keyword}`)
        .then(res => {
          if (res.status === 200) setData(res.data.content);
          setLoading(false)
        })
    } else {
      axios.post(`http://20.198.81.29:5003/symptomsToDiseases?symptoms=${keyword}`)
        .then(res => {
          console.log(res.data.diseases);
          if (res.status === 200) setData(res.data.diseases || []);
          setLoading(false)
        })
    }
  }
  const body = (
    <div style={{ height: '80%', width: '80%', margin: 'auto', left: 0, right: 0, bottom: 0, top: 0, overflowY: 'scroll', backgroundColor: '#e3e3e3', borderWidth: 0, borderRadius: 15 }} className={`${classes.paper} mh`}>
      <h2>Enter a symptom or disease or medicine</h2>
      <form className="row ai-c">
        <h3>Search: </h3>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" className="input-large shadow mh" placeholder="Symptom or disease or medicine .." />
        <h3>Search by: </h3>
        <select value={searchby} onChange={(e) => setSearchby(e.target.value)} name="search_by" className="input-small shadow mh" style={{ backgroundColor: 'white', height: 60, width: 165 }} placeholder="search_by" >
          <option value="symptoms">Symptoms</option>
          <option value="disease">Disease</option>
        </select>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: 10 }}>
          Search
        </Button>
      </form>
      <div>
        {data.length === 0 ? <h2>Start your search</h2> : null}
        {loading  ? <div className="row ai-c jc-c mv-2"><Loader /> </div>: null}
        {data?.map((dis, i) => (
          <div key={i}><DiseaseCard data={dis} /></div>
        ))}
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
