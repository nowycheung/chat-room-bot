import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ContactList from "./ContactList";
import ConversationList from "./ConversationList";
import InputArea from "./InputArea";
import Header from "../components/Header";

import './ChatRoom.css';

export default class ChatRoom extends Component {
    render() {
        const body = (
            <Grid>
                <Row>
                    <Col xs={12} md={8}>
                        <ConversationList/>
                        <InputArea/>
                    </Col>
                    <Col xs={12} md={4}>
                        <ContactList/>
                    </Col>
                </Row>
            </Grid>
        );

        return (
            <Grid>
                <Row>
                    <Header {...this.props}/>
                </Row>
                <Row>
                    {body}
                </Row>
            </Grid>
        );
    }
};