import React from 'react';
import { useNavigate } from 'react-router-dom'

const stylePerso={
    border: "1px solid orange",
    margin: "10px auto",
    padding: "20px",
    textAlign: "center"
}

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={stylePerso}>
            <h1>Wops, cette page n'existe pas !!!</h1>
            <button onClick={() => navigate("/") }>
                Retour a l'accueil
            </button>
        </div>
    );
};

export default NotFound;