import React, { useState } from 'react';
import './TokenManager.css';
import {options} from '../../Constants/Values';

function TokenManager() {
    const [selectedDigits, setSelectedDigits] = useState([]);
    const [token, setToken] = useState('');

    const toggleDigit = (digit) => {
        const newDigits = selectedDigits.includes(digit)
            ? selectedDigits.filter(d => d !== digit)
            : [...selectedDigits, digit];
        setSelectedDigits(newDigits);
    };

    const generateToken = () => {
        setToken('XXXX-XXXX-XXXX-XXXX');
    };

    const validateToken = () => {
        console.log("Validating token:", token);
    };

    return (
        <div className="token-manager">
            <div className="digits-selection mt-4">
                {options.map((_, i) => (
                    <button
                        key={i}
                        className={`btn btn-${selectedDigits.includes(i) ? 'primary' : 'secondary'} m-2`}
                        onClick={() => toggleDigit(i)}
                    >
                        {i}
                    </button>
                ))}
            </div>
            <button className="btn btn-success mt-4" onClick={generateToken}>Generate Token</button>
            {token && (
                <div className="token-display mt-4">
                    <h2>Generated Token: {token}</h2>
                    <button className="btn btn-info" onClick={validateToken}>Validate Token</button>
                </div>
            )}
        </div>
    );
}

export default TokenManager;
