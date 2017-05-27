import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators as bind } from 'redux';
import { onMessageChange, sendMessage, setActiveBot, activeBotReply } from '../reducers/chatRoom'
import { Button, Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import { REPLY_TIMEOUT } from "../bot/config";

import './ChatRoom.css';

export default connect(
    (state) => ({
        chatRoomState: state.chatRoom,
        profileState: state.profile
    }),
    (dispatch) => ({
        onMessageChange: bind(onMessageChange, dispatch),
        sendMessage: bind(sendMessage, dispatch),
        setActiveBot: bind(setActiveBot, dispatch),
        activeBotReply: bind(activeBotReply, dispatch)
    })
)(class InputArea extends Component {
    static propTypes = {
        chatRoomState: PropTypes.object.isRequired,
        onMessageChange: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        setActiveBot: PropTypes.func.isRequired,
        activeBotReply: PropTypes.func.isRequired
    }

    // TODO: Decouple this from Contact List
    botHandler = (message) => {
        const { setActiveBot, activeBotReply, chatRoomState, profileState } = this.props;
        const { activeBot} = chatRoomState;
        const { name, botList } = profileState;

        // Find the bot by macthing the message and the bot ID.
        const macthedBot = botList.find((bot) => message.toLowerCase().indexOf(bot.id.toLowerCase()) >= 0);

        // If there is active BOT
        if (activeBot) {
            // If the new BOT does not same with active BOT
            if (macthedBot && macthedBot.fullName !== activeBot.fullName) {
                setActiveBot(macthedBot);
            }

            setTimeout(() => {
                activeBotReply(name);
            }, REPLY_TIMEOUT);
        }

        else {
            if (macthedBot) {
                setActiveBot(macthedBot);
                setTimeout(() => {
                    activeBotReply(name);
                }, REPLY_TIMEOUT);
            }
        }
    }

    sendMessageHandler = (trimedText) => {
        const { name } = this.props.profileState;
        this.botHandler(trimedText);
        this.props.sendMessage(name, trimedText);
    }

    render() {
        const { onMessageChange, chatRoomState } = this.props;
        const { lastInput } = chatRoomState;

        const onSubmit = (event) => {
            event.preventDefault();
            const trimedText = lastInput.trim();
            if (trimedText.length) {
                this.sendMessageHandler(trimedText);
            }
        };

        return (
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" value={lastInput} onChange={({target}) => onMessageChange(target.value)} autoFocus/>
                        <InputGroup.Button>
                            <Button type="submit" bsStyle="primary">Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        );
    }
});