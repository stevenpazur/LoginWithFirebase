import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function ForgotPassword() {
    const emailRef = useAuth();
    const passwordRef = useAuth();
    const { resetPassword, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('');
            setError('');
            if(emailRef.current.value === currentUser.email) {
                setLoading(true);
                await resetPassword(emailRef.current.value);
                setMessage('Check your inbox for further instructions');
            } else {
                setError('Unable to verify identity');
            }
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="Submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center wt-2">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account?  <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
