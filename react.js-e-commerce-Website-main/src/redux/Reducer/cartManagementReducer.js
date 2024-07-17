const cartManagementReducer = (state="",action) => {
    switch(action.type){
        case "ADDITION_SUCCESSFULL":
            return action.payload;
        case "Fetch_Successfull":
            return action.payload;
        case "REMOVE_SUCCESSFULL":
            return action.payload;
        case "ADDITION_FAILED":
            return "";
        case "Fetch_Unsuccessfull":
            return "";
        case "REMOVE_UNSUCCESSFULL":
            return "";
        default:
            return state;
    }
};

export default cartManagementReducer;