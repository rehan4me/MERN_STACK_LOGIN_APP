
import React from 'react';

const Errors = props => {
    const errors = props.errors.map((error, idx) => <div key={idx}>{error.msg}</div>);
    return (
        <div className="alert alert-danger fade show" role="alert">
            {errors}
        </div>
    );
}

export default Errors;