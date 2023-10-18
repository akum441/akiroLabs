import React, { useState } from 'react';
import './TokenManager.css';
import axios from 'axios';
import {options} from '../../Constants/Values';
import { ButtonGroup, Button, Row, Col, Card, Form } from 'react-bootstrap';


function TokenManager() {
    const [allowedDigits, setAllowedDigits] = useState([]);
    const [token, setToken] = useState('');
    const [isValid, setIsValid] = useState(null);

    const [isGenerated, setIsGenerated] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    const handleDigitToggle = (digit) => {
        const newDigits = [...allowedDigits];
        if (newDigits.includes(digit)) {
            setAllowedDigits(newDigits.filter(d => d !== digit));
        } else {
            newDigits.push(digit);
            setAllowedDigits(newDigits);
        }
    };

    const generateToken = async() => {
        try {
            const response = await axios.post('http://localhost:8080/generateToken', { options: allowedDigits });
            setToken(response.data);
            setIsGenerated(true);
            setIsValidated(false);
        } catch (error) {
            console.error("Error generating token:", error);
        }
    };

    const validateToken = async() => {
        try {
            const response = await axios.post('http://localhost:8081/validate', { token });
            setIsValid(response.data);
            setIsValidated(true);
        } catch (error) {
            console.error("Error validating token:", error);
        }
    };


    const handleReset = () => {
        setAllowedDigits([]);
        setIsGenerated(false);
        setIsValidated(false);
        setToken('');
    };

    return (
        <div>
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <Card.Title>Choose numbers to generate the token</Card.Title>
                        <ButtonGroup>
                            {options.map((_, idx) => (
                                <Button 
                                    key={idx} 
                                    variant={allowedDigits.includes(idx) ? 'primary' : 'outline-primary'}
                                    onClick={() => handleDigitToggle(idx)}
                                >
                                    {idx}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <Card>
                    <Card.Body>
                    <Card.Title>Token Output</Card.Title>

                        <Form.Control 
                            type="text" 
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            placeholder="Generated Token"
                        />
                    </Card.Body>
                </Card>
            </Col>
           
          
                <div id="flag" className={isValid === true ? 'text-success' : 'text-danger'}>
                    {isValid === null ? '' : isValid ? 'Valid Token' : 'Invalid Token'}
                </div>
        
        </Row>
        <Row className="mt-3">
            <Col>
                <ButtonGroup>
                    <Button 
                        variant={isGenerated ? 'primary' : 'outline-primary'}
                        onClick={generateToken}
                    >
                        Generate
                    </Button>
                    <Button 
                        variant={isValidated ? 'primary' : 'outline-primary'}
                        onClick={validateToken}
                        disabled={!isGenerated}
                    >
                        Validate
                    </Button>
                    <Button 
                        variant="outline-danger"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    </div>
    );
}

export default TokenManager;
