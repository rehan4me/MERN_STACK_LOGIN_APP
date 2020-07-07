import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { setUserSession } from './Utils/Common';
import Errors from './Errors'

function Login(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        
        axios.post('http://localhost:5000/users/login', qs.stringify({ email: username.value, password: password.value}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            setLoading(false);
            setUserSession(response.data.data);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401 || error.response.status === 400) setError([{ msg: "Invalid Username / Password"}]);
            else setError([{msg: "Something went wrong. Please try again later."}]);
        });
    }

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                    {error ? <Errors errors={error} /> : null}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                            {...username}
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                            {...password}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                            />
                        </div>
                    <button type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} className="btn btn-primary btn-block">Login</button>
                    <p className="lead mt-4">
                        No Account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => setValue(e.target.value);

    return {
        value,
        onChange: handleChange
    }
}

export default Login;