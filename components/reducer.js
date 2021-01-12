export const initialState = {
    displayedPosts: 10
    // , user: null
}

const reducer = (state, action) => {

    console.log(state, action)

    switch(action.type) {
        case 'DISPLAY_MORE_POSTS':
            return {
                ...state,
                displayedPosts: state.displayedPosts+10
            };

        // case 'SET_USER':
        //     return {
        //         ...state,
        //         user: action.user
        //     }

        default:
            return state;
    }

}

export default reducer