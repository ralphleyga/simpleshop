import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { addressUpdate, addressDelete } from '../../actions/products'

const AddressModal = (props) => {
    const handleClose = props.onHide
    const address = props.address
    const { register, handleSubmit, errors } = useForm()

    return (
        <Modal show={props.show} onHide={handleClose}>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <Modal.Header closeButton>
                <Modal.Title>{address ? 'Update Address': 'Add New Address'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="hidden" name='id' defaultValue={address ? address.id : null} ref={register}/>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control type="text" ref={register({ required: true })} name='street_address' defaultValue={address ? address.street_address : null}/>
                        {errors.street_address && (<Form.Text className="text-muted">
      This field is required
    </Form.Text>)}

                        <Form.Label className='mt-3'>Apartment Address</Form.Label>
                        <Form.Control type="text" ref={register({ required: true })} name='apartment_address' defaultValue={address ? address.apartment_address : null}/>
                        {errors.apartment_address && (<Form.Text className="text-muted">
      This field is required
    </Form.Text>)}

                        <Form.Label className='mt-3'>Postal Code</Form.Label>
                        <Form.Control type="text" ref={register({ required: true })} name='postal_code' defaultValue={address ? address.postal_code : null}/>
                        {errors.postal_code && (<Form.Text className="text-muted">
      This field is required
    </Form.Text>)}

                        <Form.Label className='mt-3'>Set as default address</Form.Label>
                            <Form.Control type="checkbox" ref={register} name='default' className='' defaultChecked={address ? address.default : null}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>
                    Save Changes
                </Button>
                </Modal.Footer>
            </form>
        </Modal>
        )
} 

class AddressList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            setShow: false,
            addressForm: {}
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleUpdateAddress = this.handleUpdateAddress.bind(this)
        this.handleAddAddress = this.handleAddAddress.bind(this)
        this.handleDeleteAddress = this.handleDeleteAddress.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleClose() {
        this.setState({
            ...this.state,
            show: false
        })
    }

    handleUpdateAddress(addressForm) {
        this.setState({
            ...this.state,
            show: true,
            addressForm: addressForm
        })
    }

    onSubmit(address) {
        this.props.addressUpdate({
            ...address
        })
        this.handleClose()
    }

    handleAddAddress() {
        this.setState({
            ...this.state,
            show: true,
            addressForm: null
        })
    }

    handleDeleteAddress(address) {
        this.props.addressDelete({
            ...address
        })
        this.handleClose()
    }

    render() {

        const { addresses } = this.props
        const addressList = addresses ? (
                addresses.map(address => {
                    return (
                    <tr key={address.id}>
                        <td>
                            <Button onClick={() => this.handleUpdateAddress(address)}>Edit</Button>
                            <Button className='btn-danger ml-2 mr-2' onClick={() => this.handleDeleteAddress(address)}>Delete</Button>
                            
                            {address.full_address}
                        </td>
                    </tr>)
            })
        ) : null

        return (
            <div className='col-md-12'>
                <h3>My Address List</h3>

                <Button className='mb-2' onClick={this.handleAddAddress}>Add New Address</Button>

                <Table responsive>
                    <tbody>
                        {addressList}
                    </tbody>
                </Table>
                <AddressModal show={this.state.show} onHide={this.handleClose} onSubmit={this.onSubmit} address={this.state.addressForm}/>
            </div>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        addresses: state.productReducer.addresses
    }
}

const mapDispatchToProps = dispatch => ({
    addressUpdate: address => dispatch(addressUpdate(address)),
    addressDelete: address => dispatch(addressDelete(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)