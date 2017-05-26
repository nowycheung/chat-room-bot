import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Media, Image } from 'react-bootstrap';

import './Contact.css';

export default class Contact extends Component {
    static propTypes = {
        bot: PropTypes.object.isRequired,
        appendMessage: PropTypes.func.isRequired
    }

    render() {
        const { bot, appendMessage } = this.props;
        const { avatarLink, fullName, status, id } = bot;

        return (
            <Media>
                <Media.Left>
                    <div className="avatar-box">
                        <Image thumbnail src={avatarLink} alt={fullName}/>
                    </div>
                </Media.Left>
                <Media.Body>
                    <Media.Heading>{fullName}</Media.Heading>
                    <p>
                        <span className={`status ${status}`}/>
                        {" "}
                        {status}
                        {" "}
                        <small onClick={()=> appendMessage(id + " ")} className="bot-id">{id}</small>
                    </p>
                </Media.Body>
            </Media>
        );
    }
}