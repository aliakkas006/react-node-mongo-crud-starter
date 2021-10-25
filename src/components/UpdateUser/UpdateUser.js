import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    // Update user:
    const handleNameChange = (e) => {
        const updateName = e.target.value;
        const updateUser = { ...user, name: updateName };
        setUser(updateUser);
    }

    const handleEmailChange = (e) => {
        const updateEmail = e.target.value;
        const updateUser = { ...user, email: updateEmail };
        setUser(updateUser);
    }

    const handleUpdateUser = (e) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated successfully!');
                    setUser({});
                }
            });
        
        e.preventDefault();
    }

    return (
        <div>
            <h2>Update name: {user.name} </h2>
            <h2>Update email: {user.email} </h2>
            <p>User id: <small> {id} </small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;