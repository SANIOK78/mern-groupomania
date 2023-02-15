// STORE => BD de l'appli

import { createStore, applyMiddleware, combineReducers } from 'redux'
// "thunk" => middleware => reqêtes asynchrons  avec redux
import thunk from 'redux-thunk';
// Extension => acces au STORE en mod "dev"
import { composeWithDevTools } from 'redux-devtools-extension'
// userReducer
import userReducer from './reducers/userReducer'

// Les Reducers
const rootReducer = combineReducers({
    userReducer
})

// Store
const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

export default store;