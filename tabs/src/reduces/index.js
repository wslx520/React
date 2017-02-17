const tab = (state = {}, action) => {
    switch (action.type) {
        case 'SWITCH':
            return {
                index: action.index
            }
        default: 
            return state;
    }
}

export default tab;