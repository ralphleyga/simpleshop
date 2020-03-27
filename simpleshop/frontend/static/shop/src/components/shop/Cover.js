import React, { Component } from 'react'

class Cover extends Component {
    render() {
        return (
            <section className="jumbotron text-center bg-light">
                <h1>Album example</h1>
                <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                <a href="#" className="btn btn-primary my-2">Main call to action</a>
                <a href="#" className="btn btn-secondary my-2">Secondary action</a>
                </p>
            </section>
        )
    }
}

export default Cover