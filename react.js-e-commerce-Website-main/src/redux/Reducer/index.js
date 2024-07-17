import {combineReducers} from 'redux';
import loginAndSiginReducer from './loginAndSiginReducer';
import cartManagementReducer from './cartManagementReducer';

const CombineReducer = combineReducers({
    authonication:loginAndSiginReducer,
    cartManagement:cartManagementReducer,
});

export default CombineReducer;