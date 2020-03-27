import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategoryList extends Component {
    handleClick(event) {
        console.log(event.target.classList.add)
    }

    render() {
        const { categories } = this.props
        const categoryList = categories ? (
            categories.map(category => {
                return (
                    <Link className='list-group-item list-group-item-action' to={'?category=' + category.id} onClick={this.handleClick} key={category.id}>{category.name}</Link>
                )
            })
        ) : (
            <p>No Category</p>
        )
        return (
            <div className="list-group category-filter">
                <Link to='/products/' className='list-group-item list-group-item-action' onClick={this.handleClick}>All</Link>
                {categoryList}
            </div>
        )
    }
}

export default CategoryList
