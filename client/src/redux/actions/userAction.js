// Les Actions "user"
import axios from "axios";

// Le  type de l'action
export const GET_USER = "GET_USER"; 
export const UPDATE_INFOS = "UPDATE_INFOS ";

// "getUser" => action  recupérer le "user"
export const getUser = (userId) => {

    // Ce qu'on veut envoyer au reducer
    return (dispatch) => {

        // on veut récup les donné de user dans BD
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
            .then(res => {
                console.log(res.data);

                //envois resultat recupéré vers "dispatch"
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch(err => console.log(err));        
    }
}

// mise a jour des infos BIO, JOB dans BD et Store
export const updateInfos = (userId, bio, job) =>{
    return (dispatch) => {
        // envois info a BD
        return axios({
            method: "put",
            // on envois "userId" dans les paramétre de la requete
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            // les "data" => dans "req.body"
            data: {bio, job}
        })
        .then((res) => {
            console.log(res);
            // dispatch infos vers le reducer
            dispatch({ type: UPDATE_INFOS, payload : {bio, job} })
        })
        .catch((err) => console.log("erreur UPDATE_INFOS :", err))
    }
}
