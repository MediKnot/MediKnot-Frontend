import React, { useState } from 'react'
import '../App.css';
import axios from '../utils/BaseUrl';

function AutoComplete({ value, setValue, endpoint, suggest, list, setList, placeholder, listOptions }) {
  const [result, setResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setValue(e.target.value)
    await axios.get(`${endpoint}${e.target.value}`)
      .then(res => {
        if (res.status === 200) {
          setResult(res.data.content);
        }
      })
      .catch(e => console.log(e));
  }

  const handleSelect = (res) => {
    var ans = list;
    var temp = {};
    for(var i = 0; i<listOptions.length;i++){
      temp[listOptions[i]] = res[listOptions[i]];
    }
    ans.push(temp);
    setList(ans);
    setValue("");
    setResult([]);
  }

  return (
    <div>
      <input value={value} onChange={handleSearch} type="text" placeholder={placeholder} className="input-large shadow" />
      <div style={{ width: 300, overflowY: 'scroll', height: '100%', maxHeight: 200 }} className="shadow ">
        {result.length !== 0 ? result.map((res, i) => (
          <ul key={i} style={{ listStyle: 'none', cursor: 'pointer' }} onClick={() => handleSelect(res)}>
            <li>{`${res[suggest[0]]}`}</li>
          </ul>
        )) : null}
      </div>
    </div>
  )
}

export default AutoComplete
