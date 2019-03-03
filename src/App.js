import React, { Component } from 'react';
import './App.css';
import axios from "axios";




class App extends Component {

  state = {
    picker: {
      endopoint: 'public'
    }

  }

  componentDidMount() {
    axios.post(`http://127.0.0.1:3000/user/login`).then(res => {
      console.log(res);

    })
  }

  render() {
    return (
 
        <div>
          <header className="App-header">
            <text> HACKERBAY TEST INTERVIEW </text>
          </header>

          <form onSubmit={this.handleSubmit}
            className="Picker">
            <label>
              Select Endpoint :
          <select value='' >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </label>
          </form>

          <form className="Input-Box">
            <label
              className="Label"
            >
              Enter Username
            <input type="text"
                name="name "
                placeholder=" Username "
                className="Input"
              />

            </label>

            <label
              className="Label"
            >
              Enter Password
  
            <input type="text"
                name="name "
                placeholder=" Username "
                className="Input"
              />
            </label>
            <button
              onSubmit={this.submit}
            >
              LOGIN
          </button>
          </form>
        </div>

     
    );
  }
}

export default App;
