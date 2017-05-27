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
        botList: state.profile.botList
    }),
    (dispatch) => ({
        refreshBot: bind(refreshBot, dispatch),
        appendMessage: bind(appendMessage, dispatch),
        sendMessage: bind(sendMessage, dispatch)
    })
)(class ContactList extends Component {
    static propTypes = {
        botList: PropTypes.array.isRequired,
        refreshBot: PropTypes.func.isRequired,
        appendMessage: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired
    }

    componentDidMount() {
        setInterval(() => {
            this.props.refreshBot();
        }, REFRESH_BOT_INTERVAL);

        setInterval(() => {
            const { sender , message} = getRandomTalkBot(this.props.botList);

            if (sender && sender) {
                this.props.sendMessage(sender, message);
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