// Define the initialState
const initialState = {
    // List of heroes.
    heroes: [],
    // Hero detail.
    heroDetail: {},
    // Indicate if the current state is loading some data.
    loading: true,
    // Indicate if the current state is an error.
    errorMessage: '',
    // An string with the list os favorited heroes.
    favoriteList: '',
}

// Define the action types. 
// Gets the list of heroes.
const GET_HEROES = 'GET_HEROES';
// Gets the heroes on api call is fullfilled
const GET_HEROES_FULFILLED = 'GET_HEROES_FULFILLED';
// Return an errror action type. 
const GET_HEROES_REJECTED = 'GET_HEROES_REJECTED';
// Get the hero detail success. 
const GET_HERO_DETAIL_SUCCESS = 'GET_HERO_DETAIL_SUCCESS';
// Get the hero detail error. 
const GET_HERO_DETAIL_ERROR = 'GET_HERO_DETAIL_ERROR';
// Get the status of hero. 
const FAVORITE_HERO_SUCCESS = 'FAVORITE_HERO_SUCCESS';
// Return an errror action type. 
const FAVORITE_HERO_ERROR = 'FAVORITE_HERO_ERROR';

// Define the reducer that will return the initialState by default.
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_HEROES:
            return { ...state, loading: action.payload };
        case GET_HEROES_FULFILLED:
            const newHeroes = state.heroes.length == 0 ? action.payload : state.heroes.concat(action.payload);
            return { ...state, heroes: newHeroes, loading: action.loading };
        case GET_HEROES_REJECTED:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        case GET_HERO_DETAIL_SUCCESS:
            return { ...state, heroDetail: action.payload, loading: action.loading };
        case GET_HERO_DETAIL_ERROR:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        case FAVORITE_HERO_SUCCESS:
            return { ...state, heroDetail: action.payload, loading: action.loading };
        case FAVORITE_HERO_ERROR:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        default:
            return state;
    }
}

// Define the loading state.
export const fetchData = (bool) => {
    // Return a loading state. 
    return {
        type: GET_HEROES,
        payload: bool,
    };
}

// Define the heroes list filled state.
export const fetchDataFulfilled = (data) => {
    //Return a list of heroes filled state.
    return {
        type: GET_HEROES_FULFILLED,
        payload: data,
        loading: false,
    };
}

// Define an error message.
export const fetchDataRejected = (error) => {
    // Return a action type and a payload with a error.
    return {
        type: GET_HEROES_REJECTED,
        payload: error,
        loading: false,
    };
}

// Define a action creator to set the hero detail data.
export const fetchHeroDetailSuccess = (data) => {
    // Return a action type and a loading to false, and the data.
    return {
        type: GET_HERO_DETAIL_SUCCESS,
        payload: data,
        loading: false,
    };
}

// Define an error message.
export const fetchHeroDetailError = (data) => {
    // Return a action type and a loading to false, and the data.
    return {
        type: GET_HERO_DETAIL_ERROR,
        payload: data,
        loading: false,
    };
}

// Define a action creator to update the hero isFavorite data.
export const fetchFavoriteHeroSuccess = (data) => {
    // Return a action type and a loading to false, and the data.
    return {
        type: FAVORITE_HERO_SUCCESS,
        payload: data,
        loading: false,
    };
}

// Define an error message.
export const fetchFavoriteHeroError = (data) => {
    // Return a action type and a loading to false, and the data.
    return {
        type: FAVORITE_HERO_ERROR,
        payload: data,
        loading: false,
    };
}

// Export the reducer as a default export. 
export default reducer;