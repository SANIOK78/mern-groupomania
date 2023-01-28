import React from 'react';

const AjoutPost = () => {

    const handlePost = () => {
        window.location = "/profil"
    }

    return (
        <div>            
            <button className='btn' onClick={handlePost}>
                Créer un post
            </button>
                               
        </div>
    );
};

export default AjoutPost;