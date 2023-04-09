import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import "../index.css"

function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
      <Navbar  variant='dark' expand="lg" collapseOnSelect className='nav-color'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='hover-underline-animation'>Mimikostudio</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="nav-items-container">
              <LinkContainer to='/biddings'>
                <Nav.Link><i className="fa-solid fa-hammer"></i>Bidding</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/events'>
                <Nav.Link><i className="fa-regular fa-calendar-check"></i> Event</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              </LinkContainer>
              { userInfo  ?(
                <NavDropdown title={userInfo.name} id='username' className='nav-item-custom'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ): (
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='nav-item-custom'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/biddinglist'>
                    <NavDropdown.Item>Bids</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/eventlist'>
                    <NavDropdown.Item>Events</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>        
    </header>
  )
}

export default Header
