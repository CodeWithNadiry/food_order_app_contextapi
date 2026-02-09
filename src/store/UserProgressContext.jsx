import { createContext, useReducer } from "react";

const UserProgressContext = createContext({
    progress : '',
    showCart: () =>  {},
    hideCart() {},
    showCart() {},
    hideCheckout() {},
});

function userProgressReducer(state, action) {
    if (action.type === 'SHOW_CART') {
        return { progress: 'cart' };
    }
    if (action.type === 'HIDE_CART') {
        return { progress: '' };
    }
    if (action.type === 'SHOW_CHECKOUT') {
        return { progress: 'checkout' };
    }
    if (action.type === 'HIDE_CHECKOUT') {
        return { progress: '' };
    }

    return state;
}

// function userProgressReducer(state, action) {
//     switch(action.type) {
//         case 'SHOW_CART': 
//             return {progress: 'cart'};

//             case 'HIDE_CART':
//                 return {progress: ''};

//                 case 'SHOW_CHECKOUT': 
//                 return {progress: 'checkout'};

//                 case 'HIDE_CHECKOUT': 
//                     return {progress: ''};
                    

//                     default: 
//                     return state;
//     }
// }
export function UserProgressContextProvider({ children }) {
    const [userProgress, dispatchUserProgressAction] = useReducer(userProgressReducer, { progress: '' });

    function showCart() {
        dispatchUserProgressAction({ type: 'SHOW_CART' });
    }

    function hideCart() {
        dispatchUserProgressAction({ type: 'HIDE_CART' });
    }

    function showCheckout() {
        dispatchUserProgressAction({ type: 'SHOW_CHECKOUT' });
    }

    function hideCheckout() {
        dispatchUserProgressAction({ type: 'HIDE_CHECKOUT' });
    }

    const userProgressContext = {
        progress: userProgress.progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return <UserProgressContext.Provider value={userProgressContext}>
        {children}
    </UserProgressContext.Provider>;
}

export default UserProgressContext;