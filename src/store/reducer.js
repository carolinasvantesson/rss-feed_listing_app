export function reducer(state, action) {

    switch (action.type) {
        case 'FETCH_FEEDS':
            return {
                ...state,
                links: action.payload
            };
        default:
            return state;
    }
}


