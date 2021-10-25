import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    // delete an user:
    const handleDeleteUser = id => {
        const procceed = window.confirm('Are you sure, you want to delete!');
        if (procceed) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        alert('Successfully deleted!');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    } else {
                        alert('No document matched the query!');
                    }
                });
        }
    }

    return (
        <div>
            <ul>
                {
                    users.map(user => <li
                        key={user._id}>
                        Name: {user.name}, Email: {user.email}
                        <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;