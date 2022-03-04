import React from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'


const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header>
            <nav>
                <Container>
                    <LinkContainer to='/'>
                        <div className="brand-logo">Silky</div>
                    </LinkContainer>

                    <ul>
                        <LinkContainer to='/cart'>
                            <li><i className='fas fa-shopping-cart'></i>Cart</li>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title = {userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : 
                        <LinkContainer to='/login'>
                            <li><i className='fas fa-user'></i>Sign In</li>
                        </LinkContainer>}
                    </ul>
                </Container>
            </nav>
        </header>
    )
}

export default Header
