import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer'
import Form from './Form'

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      graduates: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/graduates')
    .then(resp => resp.json())
    .then(graduates => this.setState({graduates: graduates}))
  }

  handleSubmit = e => {
    e.preventDefault()
    const child = e.target.children
    const name = child[0].value
    const company = child[2].value
    const geourl = `${child[4].value}+${child[6].value.split(" ").join("+")},+${child[8].value.split(" ").join("+")},+${child[10].value}`
    const salary = child[12].value

    let url = this.findURL(name, company, geourl, salary)
  }

  async findURL(name, company, geourl, salary){
    const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${geourl}&key=${process.env.REACT_APP_MAP_API_KEY}`)
    const json = await resp.json()
    const location = {lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng}
    const reqObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, company, location, salary})
    }

    console.log(reqObj)

    fetch('http://localhost:3000/graduates', reqObj)
    .then(newresp => newresp.json())
    .then(graduate => this.setState({graduates: [...this.state.graduates, graduate]}))
  }

  removeMarker = e => {
    console.log(e.target)
  }
   
  render(){
    console.log(this.state.graduates)
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
