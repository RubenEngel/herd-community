import {Navbar, NavDropdown, Nav, Form, Button} from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import Link from 'next/link'

 export default function NavigationBar() {

    return (
        <Navbar
        expand="md" 
        variant="dark" 
        bg="dark" 
        fixed="top">
            <Navbar.Brand>
                <h1>HERD</h1>
            </Navbar.Brand>
            <Navbar.Toggle 
            aria-controls="responsive-navbar-nav" 
            />
            <Navbar.Collapse
            id="responsive-navbar-nav"
            >
                <Nav className="ml-auto">
                    <Nav.Link><Link href="/"><a>Home</a></Link></Nav.Link>
                    <NavDropdown title="Categories" id="categories-nav-dropdown">
                        <NavDropdown.Item>Current Affairs</NavDropdown.Item>
                        <NavDropdown.Item>Culture</NavDropdown.Item>
                        <NavDropdown.Item>Lifestyle</NavDropdown.Item>
                        <NavDropdown.Item>Sport</NavDropdown.Item>
                        <NavDropdown.Item>Climate</NavDropdown.Item>
                    </NavDropdown>
                    
                    <Nav.Link>Authors</Nav.Link>
                    <Nav.Link>Write</Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                    <NavDropdown title="Info" id="info-nav-dropdown">
                        <NavDropdown.Item><Link href="/about"><a>About Us</a></Link></NavDropdown.Item>
                        <NavDropdown.Item><Link href="/contact"><a>Contact</a></Link></NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
                <Form inline>
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    <Button variant="dark" type="submit"><Search/></Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )

}