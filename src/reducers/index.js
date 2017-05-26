import { combineReducers } from 'redux';
import chatRoom from './chatRoom';
import profile from './profile';

export default combineReducers({
    chatRoom,
    profile
});
