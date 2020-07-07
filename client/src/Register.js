import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Errors from './Errors';

const Register = props => {

    const name = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');
    const password2 = useFormInput('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setError(null);
        setLoading(true);

        axios.post('http://localhost:5000/users/register',
            qs.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                password2: password2.value
            }),
            {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                setLoading(false);
                if (response.data.errors) {
                    setError(response.data.errors);
                }  else {
                    props.history.push('/login');
                }
            }).catch(err => {
                setLoading(false);
                setError(err);
            });
    }

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Register
                    </h1>
                    {error ? <Errors errors={error} /> : null}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            {...name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            {...email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Create Password"
                            {...password}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            className="form-control"
                            placeholder="Confirm Password"
                            {...password2}
                        />
                    </div>
                    <button type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleRegister} disabled={loading} className="btn btn-primary btn-block">Register</button>
                    <p className="lead mt-4">Have An Account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue)

    const handleChange = e => setValue(e.target.value);

    return {
        value,
        onChange: handleChange
    }

}
export default Register;