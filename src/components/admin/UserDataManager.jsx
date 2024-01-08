import React from 'react';
import UserRow from './UserRow';

const UserDataManager = ({userData}) => {
    return (
        <UserRow 
        name={userData.fullname ? userData.fullname : ""} 
        email={userData.email ? userData.email : ""} 
        registerDate={userData.createdAt ? userData.createdAt : ""} />
    );
};

export default UserDataManager;