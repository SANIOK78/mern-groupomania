import React, { useContext } from 'react';
import { UserIdContext } from '../context/AppContext';
import Login from '../composants/Login';
import UpdateProfil from '../composants/profil/UpdateProfil';
import LeftNav from '../LeftNav';


const Profil = () => {

    // stockage de "user.id " s'il est connecté
    const userId = useContext(UserIdContext);

    return (       
        <div className='profil-page'>
            <LeftNav /> 

            { 
                userId ? <UpdateProfil /> : <Login />                                                 
            }           
        </div>
    
    );
};

export default Profil;