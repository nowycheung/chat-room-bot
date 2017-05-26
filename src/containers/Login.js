import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators as bind } from 'redux';
import { login, logout } from "../reducers/profile";
import { Button, Form, Jumbotron, FormGroup, FormControl, InputGroup, Grid, Row, ControlLabel } from 'react-bootstrap';
import Header from "../components/Header";

export default connect(
    (state) => ({
        userName: state.profile.name
    }),
    (dispatch) => ({
        login: bind(login, dispatch),
        logout: bind(logout, dispatch)
    })
)(class Login extends Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    }

    state = {
        userName: ""
    }

    render() {
        const { login } = this.props;
        const onSubmit = (event) => {
            event.preventDefault();
            if (this.state.userName.length > 0) {
                login(this.state.userName);
            }
        };
        const loginView = (
            <Grid>
                <Row>
                    <Header/>
                </Row>
                <Row>
                    <Jumbotron>
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
                                <ControlLabel>Your user ID</ControlLabel>
                                <InputGroup>
                                    <InputGroup>
                                        <FormControl type="text" autoFocus ref="userName" onChange={({target}) => {
                                            this.setState({userName: target.value});
                                        }}/>
                                        <InputGroup.Button>
                                            <InputGroup.Button>
                                                <Button type="submit" bsStyle="primary">Login</Button>
                                            </InputGroup.Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </Jumbotron>
                </Row>
            </Grid>
        );

        return loginView;
    }
});
