import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import './navbar.css';

const Navbar = () => {
    return (
        <NavbarBs bg="dark" variant="dark">
            <Container fluid>
                <Nav className="nav-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo en la izquierda */}
                    <Nav.Item>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <img
                                src="../src/assets/descarga.jpeg" 
                                alt="Logo de la empresa"
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    borderRadius: '50%', 
                                    objectFit: 'cover',
                                }}
                            />
                        </Link>
                    </Nav.Item>

                    {/* Enlaces "Crear" y "Listar" alineados a la derecha */}
                    <Nav className="ml-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Nav.Item>
                            <Link to='/create' style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}> Crear </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/show' style={{ color: '#fff', textDecoration: 'none' }}> Listar </Link>
                        </Nav.Item>
                    </Nav>
                </Nav>
            </Container>
        </NavbarBs>
    );
}

export default Navbar;
