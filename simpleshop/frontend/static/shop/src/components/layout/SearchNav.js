import React, { Component } from 'react'

class Search extends Component {
    render() {
        return (
            <form className='form-inline my-2 my-log-0'>
                <input className='form-control mr-sm-2' type='text' placeholder='Search'/>
                <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
            </form>
        )
    }
}

export default Search