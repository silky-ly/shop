import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress} = cart

	const [address, SetAddress] = useState(shippingAddress.address);
	const [city, SetCity] = useState(shippingAddress.city);
	const [postalCode, SetPostalCode] = useState(shippingAddress.postalCode);
	const [country, SetCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
        console.log('submit')
    }

	return (
		<FormContainer>
            <CheckoutSteps step1 step2 />
			<h2>Shipping</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address}
						required
						onChange={(e) => SetAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city}
						required
						onChange={(e) => SetCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postalCode}
						required
						onChange={(e) => SetPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="country"
						placeholder="Enter country"
						value={country}
						onChange={(e) => SetCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
