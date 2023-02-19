// Reducer "user" qui va interagir avec le "store"

// import "type" "actions"
import { GET_USER, UPDATE_INFOS, UPLOAD_PICTURE } from "../actions/userAction";


// Création reducer "user"
const initialState = {};

export default function userReducer(state = initialState, action) {

    // cas a traiter en fonction de type d'action
    switch(action.type) {
        case GET_USER : 
            return action.payload ;

        case  UPDATE_INFOS : 
            return {
                ...state,
                bio: action.payload.bio,
                job: action.payload.job
            };
            
        case UPLOAD_PICTURE :
            // On récupér ce qu'il y a déjà, et on modifie valeur "picture"
            return {
                ...state,
                avatar: action.payload,
            };

        default: return state;
    }
}