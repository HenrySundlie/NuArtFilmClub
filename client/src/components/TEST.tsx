import React from 'react';

const RandomComponent: React.FC = () => {
    const randomNumber = Math.floor(Math.random() * 100);

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Random Number Generator</h2>
            <p>Your random number is: <strong>{randomNumber}</strong></p>
            <button onClick={() => window.location.reload()}>Generate New</button>
        </div>
    );
};

export default RandomComponent;