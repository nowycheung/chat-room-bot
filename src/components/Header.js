import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        const { userName } = this.props;
        return userName ? (
            <PageHeader>
                Gamers' Chat Room <small className="pull-right">Welcome {this.props.userName || ""}</small>
            </PageHeader>
        ) : <PageHeader>Login To Chat Room</PageHeader>;
    }
};