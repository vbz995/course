import { Row, Col, Dropdown} from "react-bootstrap";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
const Header = () => {
    var user = null;
    if(localStorage.getItem("user")){
     user = JSON.parse(localStorage.getItem("user"))
    }
    const isLogged = user? true: false

    const logout = ()=>{
      localStorage.setItem("user", "")
    }
    return (
        <Row  className="justify-content-between header" >
            <Col xs = {1} className="d-flex justify-content-between" >
              <a href="https://www.facebook.com/" className="text-white"><FaFacebook /></a>
              <a href="https://www.instagram.com/" className="text-white"><FaInstagram /></a>
              <a href="https://github.com/login" className="text-white"><FaGithub /></a>
            </Col>
            <Col xs = {3} className = "text-end">
            <Dropdown className="dropdownMenu">
     
        {isLogged? <Dropdown.Toggle  className="bg-blue" id="dropdown-basic"> {user.korisnicko_ime}  </Dropdown.Toggle>: <a href="/login" className="text-white p-2"> Prijavi se </a>}
     

      <Dropdown.Menu style={{zIndex:10000000}}>
        <Dropdown.Item href="/" onClick={logout}>Odjavi se</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        </Row>
    
    )
}

export default Header;