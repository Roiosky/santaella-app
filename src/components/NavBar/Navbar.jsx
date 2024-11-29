import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbar.css';

const Navbar = () => {
    return (
        <NavbarBs bg="dark" variant="dark">
            <Container fluid>
                <Nav
                    className="nav-container"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Botón de inicio en la izquierda */}
                    <Nav.Item>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button variant="primary" style={{ fontSize: '18px' }}>
                                Inicio
                            </Button>
                        </Link>
                    </Nav.Item>

                    {/* Botones "Crear", "Listar" y "Salir" alineados a la derecha */}
                    <Nav
                        className="ml-auto"
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Nav.Item>
                            <Link
                                to="/create"
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    marginRight: '20px',
                                }}
                            >
                                Crear
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link
                                to="/show"
                                style={{ color: '#fff', textDecoration: 'none' }}
                            >
                                Listar
                            </Link>
                        </Nav.Item>

                        {/* Botón rojo para salir */}
                        <Nav.Item>
                            <Button
                                variant="danger"
                                style={{ marginLeft: '20px' }}
                                onClick={() => window.location.reload()}
                            >
                                Salir
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Nav>
            </Container>
        </NavbarBs>
    );
};

export default Navbar;
