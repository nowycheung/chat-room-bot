import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators as bind } from 'redux';
import { Panel } from 'react-bootstrap';
import { refreshBot } from '../reducers/profile';
import { appendMessage, sendMessage } from '../reducers/chatRoom';
import { REFRESH_BOT_INTERVAL, RANDOM_TALK_INTERVAL } from "../bot/config";
import { getRandomTalkBot } from "../bot";
import Contact from "../components/Contact";

import './ContactList.css';

export default connect(
    (state) => ({
        botList: state.profile.botList,
        userName: state.profile.name
    }),
    (dispatch) => ({
        refreshBot: bind(refreshBot, dispatch),
        appendMessage: bind(appendMessage, dispatch),
        sendMessage: bind(sendMessage, dispatch)
    })
)(class ContactList extends Component {
    static propTypes = {
        botList: PropTypes.array.isRequired,
        userName: PropTypes.string.isRequired,
        refreshBot: PropTypes.func.isRequired,
        appendMessage: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired
    }

    componentDidMount() {
        // TODO: Decouple this from Contact List
        setInterval(() => {
            this.props.refreshBot();
        }, REFRESH_BOT_INTERVAL);

        // TODO: Decouple this from Contact List
        setInterval(() => {
            const { userName, botList, sendMessage } = this.props;
            const { sender , message} = getRandomTalkBot(botList);

            if (sender && sender) {
                sendMessage(sender, message.replace(/{userName}/g, userName), true);
            }
        }, RANDOM_TALK_INTERVAL);
    }

    render() {
        const { botList, appendMessage } = this.props;

        return (
            <Panel header="Contacts" bsStyle="primary">
                <div className="contact-list-panel">
                    {botList.map((bot, idx) => {
                        return (
                            <Contact key={idx} bot={bot} appendMessage={appendMessage}/>
                        );
                    })}
                </div>
            </Panel>
        );
    }
});