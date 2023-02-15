import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInfos } from '../../redux/actions/userAction';
import { dateParser } from '../Utils';

const UpdateProfil = () => {
    // data "user" recupéré depuis Store
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // les infos a mettre à jour
    const [bio, setBio] = useState("");
    const [job, setJob] = useState("");  
    // form pour saisir le text
    const [updateForm, setUpdateForm] = useState(false);

    const handleUpdateInfos = () => {
        dispatch(updateInfos(userData._id, bio, job));
        setUpdateForm(false);
    }

    return (
        <div className='profil-container'>
            
            <div className="update-container">
                <div className="left-part">
                    <h1>{userData.pseudo} </h1>
                    <img src={ userData.avatar } alt="profil" />
                    <div className="info-user">
                        <h3>Job : {userData.job}</h3>
                        <h3>mail : {userData.email}</h3>
                    </div>
                </div>

                <div className="right-part">
                    <div className="bio-update">
                        <h3>Mise à jour des infos</h3>
                        { 
                            updateForm ? (
                                <>
                                    <textarea type="text" defaultValue={userData.bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>

                                    <textarea type="text" defaultValue={userData.job}
                                         onChange={(e) => setJob(e.target.value)}
                                    ></textarea>

                                    <button type='submit' onClick={handleUpdateInfos}
                                    >Valider modifications</button>
                                </>
                            ) : (
                                <>
                                    <p value={bio}
                                        onClick={() => setUpdateForm(!updateForm)} >{userData.bio}
                                    </p>
                                    <p value={job}
                                        onClick={() => setUpdateForm(!updateForm)} >{userData.job}
                                    </p>
                                        
                                    <button type='submit' 
                                        onClick={() => setUpdateForm( !updateForm)}
                                    >
                                        Modifier les infos
                                    </button>                                   
                                </>
                            )
                        } 
                        <h4>Memebre depuis le : {dateParser(userData.createdAt)}</h4>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;