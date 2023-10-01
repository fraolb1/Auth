import { Outlet } from "react-router-dom"
import Home from "./pages/Home"
import { Container } from "react-bootstrap"
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
}

export default App