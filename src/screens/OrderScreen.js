import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	console.log('ORDER ', orderDetails);

	const { order, loading, error } = orderDetails;
	console.log('faith ', order);

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.qty,
				0
			)
		);
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, []);

	return (
			loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> 
			:<>
					{/* <h1>Order</h1> */}
					<h1>Order {order._id}</h1>

					<p>
						<strong>Name:</strong> {order.user.name}
					</p>
					<p>
						<a href={`mailto: ${order.user.email}`}>
							{order.user.email}
						</a>
					</p>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Address</strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city},{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>

									{order.isDelivered ? (
										<Message variant="success">
											Paid on {order.deliveredAt}
										</Message>
									) : (
										<Message variant="danger">
											Not Delivered
										</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method</strong>
										{order.paymentMethod},{' '}
									</p>

									{order.isPaid ? (
										<Message variant="success">
											Paid on {order.paidAt}
										</Message>
									) : (
										<Message variant="danger">
											Not Paid
										</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{order.orderItems.length === 0 ? (
										<Message>Order is empty</Message>
									) : (
										<ListGroup variant="flush">
											{order.orderItems.map(
												(item, index) => (
													<ListGroup.Item key={index}>
														<Row>
															<Col md={1}>
																<Image
																	src={
																		item.image
																	}
																	alt={
																		item.name
																	}
																	fluid
																	rounded
																/>
															</Col>

															<Col>
																<Link
																	to={`/product/${item.product}`}
																>
																	{item.name}
																</Link>
															</Col>

															<Col md={4}>
																{item.qty} x $
																{item.price} = $
																{item.qty *
																	item.price}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h2>Order summary</h2>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>${order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${order.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item></ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
	);
};

export default OrderScreen;