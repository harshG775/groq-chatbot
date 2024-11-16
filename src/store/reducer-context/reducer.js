import { ActionTypes } from "./actions";

// Define the initial state
export const initialState = {
    // functions state
    scrollToDiv: null,
    //
    inputValue: "",
    messages: JSON.parse(localStorage.getItem("messages") || "[]"),
    //
    submit_status: "", //initial | pending | success | error
    submit_error: null,
};

// Create a reducer function
export const storeReducer = (state, action) => {
    switch (action.type) {
        // SET_SCROLL_TO_DIV function
        case ActionTypes.SET_SCROLL_TO_DIV:
            return { ...state, scrollToDiv: action?.payload };

        // inputValue
        case ActionTypes.SET_INPUT_VALUE:
            return { ...state, inputValue: action?.payload || "" };

        // messages
        case ActionTypes.SET_MESSAGES:
            localStorage.setItem("messages", "[]");
            return { ...state, messages: action?.payload || [] };
        case ActionTypes.SET_MESSAGE:
            localStorage.setItem("messages", JSON.stringify([...(state?.messages || []), action?.payload]));
            return { ...state, messages: [...(state?.messages || []), action?.payload] };

        //process
        case ActionTypes.SET_SUBMIT_STATUS:
            return { ...state, submit_status: action?.payload };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
