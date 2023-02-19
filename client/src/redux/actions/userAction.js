// Les Actions "user"
import axios from "axios";

// Le  type de l'action
export const GET_USER = "GET_USER"; 
export const UPDATE_INFOS = "UPDATE_INFOS ";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

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

// Action qui permet de télécharger un image:
// "formData" => les info a transmetre au backend; "id" de user
export const uploadPicture = (data, id) => {
    return (dispatch) => {
        // On envoit la "data" au backend (DB) qui va créer un nouveau fichier
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)                                               
            .then((res) => { 
                console.log(res)
                // test s'il n'y a pas des erreurs
                if(res.data.errors) {
                    console.log(res.data.errors)
                }             
                //on avertit le reduceur de changer du Store  
                // on va chercher ce qu'on vient d'envoyé a la DB, le chemin de l'image
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)                                   
                    .then((res) => {
                        //dispatch au reduceur : le "type" de l'action et "data"
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
                    })
                   
            })
            .catch((err) => console.log(err))       
    }
};