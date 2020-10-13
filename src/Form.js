import React from 'react'

export default class Form extends React.Component{

    render(){
        return(
            <div className="form">
                <h2>Add A Graduate</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" placeholder="name"/><br/>
                    <input type="text" placeholder="company name"/><br/>
                    <input type="number" placeholder="street number"/><br/>
                    <input type="text" placeholder="street name"/><br/>
                    <input type="text" placeholder="city"/><br/>
                    <input type="text" placeholder="state (ex: IL)"/><br/>
                    <input type="number" placeholder="salary"/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}