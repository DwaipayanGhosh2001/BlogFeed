
import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { TbNotes } from "react-icons/tb";
import {AiFillCaretDown} from "react-icons/ai"
import { Link } from "react-router-dom";
import { useUserRecord } from "../context/context";
function Header() {
     const {user, token, logout} = useUserRecord();
    const [isOpen, setIsOpen] = useState(false);
    const [ishover, setIshover] = useState(false);
    const [active,setActive] = useState(1);

    const navActive = (id) => {
      setActive(id);
    }
    const onHover = () => {
      setIshover(true);
    };
    const outHover = () => {
      setIshover(false);
    };
    const toggle = () => setIsOpen(!isOpen);

 
    return (
      <div>
        <Navbar expand="md" className="shadow mb-5 bg-transparent rounded" >
          <NavbarBrand
            tag={Link}
            to="/"
            className="fs-3 text-danger"
            style={{
              letterSpacing: ".3rem",
              fontFamily: "fantasy",
            }}
          >
            <TbNotes className="fs-4 me-2" />
            BlogFeed
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/"className={`ms-md-5 pr-md-3 text-dark fw-semibold text-uppercase zoom ${ active === 1 ? 'text-decoration-underline': ''}`} onClick={()=> navActive(1)}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className={`px-md-3 text-dark fw-semibold text-uppercase zoom ${ active === 2 ? 'text-decoration-underline': ''}`} onClick={()=> navActive(2)}>Category</NavLink>
              </NavItem>
              {token && (
                <>
                 <NavItem>
                <NavLink tag={Link} to="/my-blogs" className={`px-md-3 text-dark fw-semibold text-uppercase zoom ${ active === 3 ? 'text-decoration-underline': ''}`} onClick={()=> navActive(3)}>My Blogs</NavLink>
              </NavItem>
              <NavItem>
              <NavLink tag={Link} to="/add-blog" className={`px-md-3 text-dark fw-semibold text-uppercase zoom ${ active === 4 ? 'text-decoration-underline': ''}`} onClick={()=> navActive(4)}>Add Blog</NavLink>
            </NavItem>
                </>
               
              ) }
              
            </Nav>
            {token? (
              <div>
                 <UncontrolledDropdown className="me-5">
                <DropdownToggle nav>
                  <div className=" text-dark rounded-pill p-1 text-uppercase">
                    Hi, {user ? user.username : ""} <AiFillCaretDown/>
                  </div>
                </DropdownToggle>
                <DropdownMenu end>
                  {/* <DropdownItem>Profile</DropdownItem> */}
                  <DropdownItem onClick={logout} >Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </div>
            ) : (<>
            <Button
              className={`border-0 text-uppercase rounded-pill px-md-5 fs-5 ${ishover ? 'text-white':'text-dark '}`}
              outline
              style={{ backgroundColor: ishover ? `#D22B2B` : "" , letterSpacing: "3px"}}
              onMouseEnter={onHover}
              onMouseLeave={outHover}
              tag={Link}
              to="/auth"
            >
              Login
            </Button>
            </>)
            }
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
export default Header;