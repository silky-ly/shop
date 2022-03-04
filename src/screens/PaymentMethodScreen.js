import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';


const PaymentMethodScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, SetPaymentMethod] = useState('Paypal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h2>Payment Method</h2>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="Paypal or Credit Card"
							id="Paypal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => SetPaymentMethod(e.target.value)}
						></Form.Check>

						{/* <Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={(e) => SetPaymentMethod(e.target.value)}
						></Form.Check> */}
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentMethodScreen;
