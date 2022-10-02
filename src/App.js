import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from './components/Card';
import Popup from './components/Popup';
import Placeholder from './images/placeholder.jpg';

const App = () => {

  const [content, setContent] = useState([]);
  const [popUp, setPopUp] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setContent(response.data)
      });
  }, []);

  const togglePopUp = (name) => {
    setPopUp(name);
  };

  return (

    <div className="main">
      <h1>User information</h1>

      <div className="cards">
        {content.map(person => 
          <div className="card">
            <b>{person.name}</b>
            <div style={{ height:'35%'}}>
              <img src={Placeholder} alt={Placeholder} style={{ height:'100%'}}/>
            </div>
            <i>@{person.username}</i> 
            <br /><br />
            <div> <a href={person.email} onclick="location.href=this.href" target="location.href=this.href">{person.email}</a> </div>
            <br />
            <button onClick={() => togglePopUp(person.name)}>More details</button>
            {popUp === person.name && 
              <Popup 
                content={ <Card person={person} /> } 
                handleClose={togglePopUp} />
            }
          </div>
        )}
      </div>

    </div>

  );

}

export default App;
