import React from 'react'

//This component has only one parent component: About
//functional component for creating member's contact card
function Person(props) {
    return (
        <div className="persons">
            <div className="cardP">
                <img src={props.item.img} alt={props.item.name} />
                <div className="containerP">
                    <h4><b>{props.item.name}</b></h4>
                    <div className="git"><a href={props.item.githubRepo} >GitHub Profile</a>
                        <a href={props.item.linkedIn}> LinkedIn Profile</a>
                    </div>
                    <p>{props.item.desc}</p>
                </div>
            </div>
        </div>
    )
}

export default Person
