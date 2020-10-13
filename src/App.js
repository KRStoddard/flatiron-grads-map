import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer'
import Form from './Form'

class App extends React.Component{

  //sets initial state of graduates to empty array
  constructor(){
    super()
    this.state = {
      graduates: []
    }
  }
  
  //after initial render runs fetch request to database and resets graduate state
  componentDidMount(){
    fetch('http://localhost:3000/graduates')
    .then(resp => resp.json())
    .then(graduates => this.setState({graduates: graduates}))
  }

  //handles submission of new graduate form
  handleSubmit = e => {
    //prevents automatic form submission
    e.preventDefault()
    //sets variables equal to form values
    const child = e.target.children
    const name = child[0].value
    const company = child[2].value
    const geourl = `${child[4].value}+${child[6].value.split(" ").join("+")},+${child[8].value.split(" ").join("+")},+${child[10].value}`
    const salary = child[12].value
    //runs findURL with the values
    this.findURL(name, company, geourl, salary)
    //resets form
    document.querySelector('form').reset()
  }
  //async function to save form submission to database
  //uses google geolocator api to save lat/long to database in place of street address
  async findURL(name, company, geourl, salary){
    const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geourl}&key=${process.env.REACT_APP_MAP_API_KEY}`)
    const json = await resp.json()
    const location = {lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng}
    const reqObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, company, location, salary})
    }

    
    //resets the state of graduates with the newly added graduate
    fetch('http://localhost:3000/graduates', reqObj)
    .then(newresp => newresp.json())
    .then(graduate => this.setState({graduates: [...this.state.graduates, graduate]}))
  }
  
  //renders the map and form to page 
  render(){
  return (
    <div className="App">
      <h1>Flatiron Grads: Where Are They Now?</h1>
      <section className="center">
        <MapContainer graduates={this.state.graduates} removeMarker={this.removeMarker}/>
        <Form handleSubmit={this.handleSubmit}/>
    </section>
    </div>
  )};
}

export default App;
