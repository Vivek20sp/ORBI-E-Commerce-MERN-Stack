const loginAndSiginReducer = (state="",action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return action.payload;
        case 'SIGNUP_SUCCESS':
            return action.payload;
        case 'LOGIN_FAILURE':
            return '';
        case 'SIGNUP_FAILURE':
            return '';
        default:
            return state;
    }
};

export default loginAndSiginReducer;