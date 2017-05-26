import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatRoom from './ChatRoom';
import Login from './Login';

export default connect(
    (state) => ({
        userName: state.profile.name
    })
)(class App extends Component {
    static propTypes = {
        userName: PropTypes.string.isRequired
    }

    render() {
        const { userName } = this.props;

        return userName.length > 0 ? <ChatRoom userName={userName}/> : <Login/>;
    }
});
