import React from 'react';

const UserRow = ({name="", email="", phone=0, registerDate={}, limitDate={}, licenseType="", discountCode=""}) => {

    const getModifiedDate = (date) => {
        if (date) {
            const fireBaseTime = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
            const formattedDate = fireBaseTime.toLocaleDateString("en-GB");
            return formattedDate;
        }
        return "";
    }

    return (
        <tr>
            <td scope="row">{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{getModifiedDate(registerDate)}</td>
            <td>{getModifiedDate(limitDate)}</td>
            <td>{licenseType}</td>
            <td>{discountCode}</td>
            <td><button></button></td>
        </tr>
    );
};

export default UserRow;