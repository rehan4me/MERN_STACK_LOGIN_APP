import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Dashboard(props) {
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto text-center">
                <h1 className="mb-3">
                    Welcome {user.name}!
                </h1><br></br>
                <input type="button" onClick={handleLogout} value="Logout" className="btn btn-primary btn-block" />
            </div>
        </div>
    );
}

export default Dashboard;