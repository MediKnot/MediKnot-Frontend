import React,{useState} from 'react'
import '../App.css'
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';
import AutoComplete from './AutoComplete';
import axios from '../utils/BaseUrl';
import Popup from './Popup';
  

function MedicalEventModal() {

    const [critical, setcritical] = useState("HOSPITALISATION");
    const [active, setactive] = useState(false);
    const [diseases, setdiseases] = useState([]);
    const [value, setValue] = useState("");
    const [description, setdescription] = useState("");
    const [date, setdate] = useState("");
    const [mess, setMess] = useState("");
    const [error, setError] = useState(false);

    const handleDelete = (id) => {
      setdiseases(diseases.filter(dis => dis.id !== id));
    }

    const addEvent = async () => {
      for(var i=0;i<diseases.length;i++){
        delete diseases[i].links;
      }

      const data={
        critical,
        isActive:active,
        description,
        startDate:date
      }
      var user_data=JSON.parse(localStorage.getItem("user"));
      // console.log(data,user_data.id)
      await axios.post(`/medicalEvent/${user_data.id}`,data)
          .then(res => {
              if (res.status === 200) {
                  setError(false);
                  setMess("Medical Event created successfully !!");

                  axios.put(`/medicalEvent/add/disease/${res.data.id}/${diseases[0].id}`)
                  .then(res => {
                      if (res.status === 200) {
                        //   setError(false);
                      }
                  })
                  .catch(e => {
                    //   setError(true);
                  })
              } else {
                  setError(true);
                  setMess("Medical Event creation failed !!");
              }
          })
          .catch(e => {
              setError(true);
              setMess("Something went wrong. Try again !!");
          })
  }
    return (
        <>
            <div className="column ai-c mt">
                <AutoComplete large
                                    endpoint="/disease/search?name="
                                    value={value}
                                    setValue={setValue}
                                    suggest={["name"]}
                                    placeholder="Search Diseases"
                                    list={diseases}
                                    setList={setdiseases}
                                />
                                <div className='font-s mv'>
                                    {diseases.map((disease, i) => (
                                        <Chip
                                            key={disease.id}
                                            label={disease.name}
                                            onDelete={() => handleDelete(disease.id)}
                                            color="secondary"
                                            style={{ marginRight: 10,marginTop:10 }}
                                        />
                                    ))}
                                </div>
                <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Description" className="input-large shadow mh mv" style={{ backgroundColor: 'white', height: 55, width: 300 }} />
                <div className="row-no-wrap">
                  <div className="mv mh mr font-s" style={{ width: 140 }}>Type</div>
                  <div className="mv font-s" style={{ width: 140 }}>Active</div>
                </div>
                <div className="row ai-c">
                      <select id="critical" value={critical} onChange={(e) => setcritical(e.target.value)} name="critical" className="input-small shadow mh mr" style={{ backgroundColor: 'white', height: 55, width: 140 }} placeholder="Type" >
                          <option value="HOSPITALISATION">Hospitalisation</option>
                          <option value="CLINIC_VISIT">Clinic Visit</option>
                      </select>
                      <select id="active" value={active} onChange={(e) => setactive(e.target.value)} name="gender" className="input-small shadow" style={{ backgroundColor: 'white', height: 55, width: 140 }} placeholder="Active" >
                          <option value={Boolean(true)}>Yes</option>
                          <option value={Boolean(false)}>No</option>
                      </select>
                </div>
                <div>
                  <div className="mv font-s mh mr">Date of Event</div>
                  <input type="date" value={date} onChange={(e) => setdate(e.target.value)} placeholder="dd-mm-yyyy" className="input-large shadow" style={{backgroundColor: 'white'}}/>
                </div>
                <Button variant="contained" color="primary" style={{marginTop: 30, width: '45%',marginBottom:10}}  onClick={addEvent}>
                  Create
                </Button >
                {mess.length !== 0 ? error ? <Popup error message={mess} /> : <Popup message={mess} /> : null}
            </div>
        </>
    )
}

export default MedicalEventModal
