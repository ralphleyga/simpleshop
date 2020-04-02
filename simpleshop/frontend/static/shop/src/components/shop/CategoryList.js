import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

class CategoryList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { categories } = this.props
        const search = window.location.search
        const params = new URLSearchParams(search)

        const categoryList = categories ? (
            categories.map((category) => {
                return (
                        <ListGroup.Item action href={"?category=" + category.id} as={Link} to={'/products/?category=' + category.id} className={(params.get('category') == category.id) ? 'active': null}>
                            {category.name}
                        </ListGroup.Item>
                )
            })
        ) : (
            <p>No Category</p>
        )

        return categories ? (
            <ListGroup>
                <ListGroup.Item action href="#link1" as={Link} to='/products/' className={(params.get('category') == null) ? 'active': null}>
                All</ListGroup.Item>
                {categoryList}
            </ListGroup>
        ) : null
    }
}

export default CategoryList
