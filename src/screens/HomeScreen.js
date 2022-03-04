import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])


    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='info'>{ error }</Message> : 
            <div>
                {products.map((product) => (
                    <Product key={ product._id } product={ product }/>
                ))}
            </div>}
        </>
    )
} 

export default HomeScreen
