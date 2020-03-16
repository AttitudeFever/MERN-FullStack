import React from 'react'

function UserInfo(props) {
    return (
        <div className="userInfo">
            <img src={props.thumbnail} alt=''/>
            <p>Hello {props.firstName + " " + props.lastName}</p>
            <p>Member Since: {props.dateJoined}</p>
            <p>{props.city}, {props.country}</p>
        </div>
    )
}

export default UserInfo
