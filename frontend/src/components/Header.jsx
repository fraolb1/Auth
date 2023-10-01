import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../feature/authSlice";
import { useLogoutMutation } from "../feature/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Headers = () => {
  const userInfo = useSelector((state) => state.user);
  const[logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() =>{
    if(!userInfo){
      navigate('/login')
    }
  },[navigate,userInfo])
  const handleLogout = async () => {
    console
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate('/login')

    } catch(err) {
      console.log(err.data?.message || err.error)
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt onClick={handleLogout} /> Sign Out
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Headers;
