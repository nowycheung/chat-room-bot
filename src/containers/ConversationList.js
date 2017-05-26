import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

import './ConversationList.css';

export default connect(
    (state) => ({
        userName: state.profile.name,
        conversationList: state.chatRoom.conversationList
    })
)(class ConversationList extends Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        conversationList: PropTypes.array.isRequired
    }

    scrollToBottom = () => {
        const node = findDOMNode(this.lastMessage);
        if (node) {
            node.scrollIntoView();
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const { conversationList, userName } = this.props;
        return (
            <Panel header="Conversation List" bsStyle="primary">
                <div className="conversation-panel">
                    {conversationList.map(({sender, message}, idx) => {
                        if (sender === userName) {
                            return (
                                <Panel key={idx} ref={(elem) => { this.lastMessage = elem; }} header={"me"} bsStyle="info" className="my-message">
                                    {message}
                                </Panel>
                            );    
                        }
                        return (
                            <Panel key={idx} ref={(elem) => { this.lastMessage = elem; }} header={sender} bsStyle="success">
                                {message}
                            </Panel>
                        );
                    })}
                </div>
            </Panel>
        );
    }
});