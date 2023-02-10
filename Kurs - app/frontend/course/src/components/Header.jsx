import { Row, Col, Dropdown} from "react-bootstrap";
const Header = () => {
    var user = null;
    if(localStorage.getItem("user")){
     user = JSON.parse(localStorage.getItem("user"))
    }
    const isLogged = user? true: false
    return (
        <Row  className="justify-content-between header" >
            <Col xs = {3} >
            </Col>
            <Col xs = {3} className = "text-end">
            <Dropdown className="dropdownMenu">
      <Dropdown.Toggle  id="dropdown-basic">
        {isLogged?user.korisnicko_ime:"Prijavi se"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        </Row>
    
    )
}

export default Header;