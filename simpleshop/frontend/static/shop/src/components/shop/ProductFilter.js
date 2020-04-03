import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'

const FilterForm = (props) => {
    const search = window.location.search
    let params = new URLSearchParams(search)
    const { register, handleSubmit } = useForm()
    const { categories } = props
    const activeFilter = {
            categories: params.get('category') ? params.get('category').split(',') : [],
            search: params.get('search') ?  params.get('search') : ''
        }

    const isDefault = (categoryID) => {
        let isActive = activeFilter.categories.find(category => {
            return parseInt(category) === categoryID
        })
        return isActive ? true : false
    }

    const categoryList = categories ? (
        categories.map((category) => {
            return (
                    <ListGroup.Item key={category.id}>
                        <input type='checkbox' ref={register} name='category' value={category.id} defaultChecked={isDefault(category.id)}/>
                        {category.name}
                    </ListGroup.Item>
            )
        })
    ) : (
        <p>No Category</p>
    )

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <input type='text' className='form-control mb-2' name='search' placeholder='Search...' onChange={props.onChange} ref={register} defaultValue={activeFilter.search}/>
            <Button type='submit' block>Go</Button>
            <ListGroup className='mt-2'>
                {categoryList}
            </ListGroup>
        </form>
    )
}

class ProductFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keywords: '',
            category: '',
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({
            ...this.state,
            keywords: e.target.value
        })
    }

    render() {
        const { categories } = this.props

        return categories ? (
            <FilterForm categories={categories} onSubmit={this.props.onSubmit}/>
        ) : null
    }
}

export default ProductFilter
