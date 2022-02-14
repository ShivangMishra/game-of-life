import React, { Component } from 'react';
import { Button, Navbar, NavbarBrand, NavDropdown, Nav, NavLink } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class ControlsNavBar extends React.Component {

  render() {
    return (
      <div id="control">
        <Navbar bg="custom" variant="custom">
          <Navbar.Brand>
            Conway's Game Of Life
          </Navbar.Brand>
          <Nav>
            <NavDropdown title="Pattern" disabled={this.props.running ? 'true' : ''}>
              <NavDropdown.Item onClick={() => this.props.setPattern(0)}>
                Random
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.setPattern(1)}>
                P1
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.setPattern(2)}>
                P2
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Item>
              <Button variant="custom" onClick={!this.props.running ? this.props.play : this.props.pause}>
                {!this.props.running ? 'Start Simulation!' : 'Stop Simulation!'}
              </Button>
            </Nav.Item>

            <Nav.Item>
              <NavLink href="#" onClick={this.props.clear} disabled={this.props.running ? 'true' : ''}>
                Clear Board
              </NavLink>
            </Nav.Item>

            <NavDropdown title="Speed">
              <NavDropdown.Item onClick={() => this.props.setSpeed(3)}>
                Fast
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.setSpeed(2)}>
                Average
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.setSpeed(1)}>
                Slow
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar>
      </div >
    );
  }
}

export default ControlsNavBar