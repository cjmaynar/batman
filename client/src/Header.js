import { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";

import UserContext from "./context";

function Header() {
    const userContext = useContext(UserContext);

    return (
        <Navbar color="light" light>
            <NavbarBrand href="/">Bat(MAN)</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink href="/animals">Animals</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/experiments">Experiments</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/account">{userContext.user.username}</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default Header;
