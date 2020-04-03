import React, { Component } from 'react'
import history from '../../history'

class Search extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = {
            search: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const params = new URLSearchParams(this.state).toString()
        this.setState({
            ...this.state,
            search: ''
        })
        window.location.href = `/products/?${params}`;
        
    }

    onChange(e) {
        this.setState({
            ...this.state,
            search: e.target.value
        })
    }

    render() {

        return (
            <form className='form-inline my-2 my-log-0' onSubmit={this.onSubmit}>
                <input className='form-control mr-sm-2' type='text' placeholder='Search' name='search' onChange={this.onChange} value={this.state.search} />
                <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
            </form>
        )
    }
}

export default Search