import { Row, Col, Dropdown} from "react-bootstrap";
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
            <Col xs = {3} >
            </Col>
            <Col xs = {3} className = "text-end">
            <Dropdown className="dropdownMenu">
     
        {isLogged? <Dropdown.Toggle  id="dropdown-basic"> {user.korisnicko_ime}  </Dropdown.Toggle>: <a href="/login" className="text-white p-2"> Prijavi se </a>}
     

      <Dropdown.Menu>
        <Dropdown.Item href="/" onClick={logout}>Odjavi se</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        </Row>
    
    )
}

export default Header;