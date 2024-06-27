import React, { useEffect } from 'react';
import { mySwal } from '../../../layout/small_components/Alert';
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        mySwal.fire({
            title: 'Are you sure you want to logout?',
            showDenyButton: true,
            confirmButtonText: `Logout`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('x-auth-token');
                navigate('/login');
            }
        });
    }, []);
    return (
        <div>
            
        </div>
    );
}

export default Logout;