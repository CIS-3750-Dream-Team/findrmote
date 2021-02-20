import React, {useState} from 'react';

const API_URL = process.env.REACT_APP_API_URL;


function Home(props) {
  const [apiURL, setURL] = useState(API_URL);

  const send = (e) => {
    fetch(`${apiURL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(job_data => {
        console.log(job_data);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const setValue = (e) => {
    setURL(e.target.value);
  }

  return (
    <div id='home'>
      <h3> Home </h3>
      <div className="input-group mt-3">
        <input className="form-control" type="text" onChange={setValue} value={apiURL}/>
        <button className="btn btn-outline-primary" type="button" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;
