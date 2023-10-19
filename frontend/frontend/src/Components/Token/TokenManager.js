import React, { useState } from 'react';
import './TokenManager.css';
import axios from 'axios';
import { options } from '../../Constants/Values';
import { ButtonGroup, Button, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the icons stylesheet


function TokenManager() {
    const [allowedDigits, setAllowedDigits] = useState([]);
    const [token, setToken] = useState('');
    const [isValid, setIsValid] = useState("Flag Unavailable");

    const [isGenerated, setIsGenerated] = useState(false);
    const [isValidated, setIsValidated] = useState(false);

    const [checking, setChecking] = useState(false);

    const handleDigitToggle = (digit) => {
        setIsGenerated(true);
        const newDigits = [...allowedDigits];
        if (newDigits.includes(digit)) {
            setAllowedDigits(newDigits.filter(d => d !== digit));
        } else {
            newDigits.push(digit);
            setAllowedDigits(newDigits);
        }
    };

    const generateToken = async () => {
        try {
            const response = await axios.post('http://localhost:8080/generateToken', { options: allowedDigits });
            setToken(response.data);
            // setIsGenerated(true);
            setIsValidated(false);
        } catch (error) {
            console.error("Error generating token:", error);
        }
    };

    const validateToken = async () => {
        try {
            const response = await axios.post('http://localhost:8081/validate', { token });
            setIsValid(response.data);
            setChecking(true);
            setTimeout(() => setChecking(false), 500);
        } catch (error) {
            console.error("Error validating token:", error);
        }
    };


    const handleReset = () => {
        setAllowedDigits([]);
        setIsGenerated(false);
        setIsValidated(false);
        setIsValid("Flag Unavailable");
        setToken('');
    };

    return (
        <div>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className='Ctitle'>Choose numbers to generate the token</Card.Title>
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
                <Col md={6} className="token-container">
                    <Card>
                        <Card.Body>
                            <Card.Title className='Ctitle'>Generated Token</Card.Title>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={token}
                                    onChange={e => setToken(e.target.value)}
                                    placeholder="Generated Token"
                                />
                                <InputGroup.Text>
                                    <i className="bi bi-pencil"></i>
                                </InputGroup.Text>
                            </InputGroup>

                            <span id="token-flag" className={isValid === true ? 'text-success' : 'text-danger'}>
                                {checking ? 'Checking...' : (isValid === "Flag Unavailable" ? "Token Status unavailabe" : isValid ? 'Valid Token' : 'Invalid Token')}
                            </span>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            <Row className="mt-3">
                <Col>
                    <ButtonGroup>
                        <Button
                            variant={isGenerated ? 'success' : 'outline-primary'}
                            onClick={generateToken}
                            disabled={!isGenerated}
                        >
                            Generate
                        </Button>
                        <Button
                            variant={isValidated ? 'primary' : 'outline-primary'}
                            onClick={validateToken}
                            disabled={!token}
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
