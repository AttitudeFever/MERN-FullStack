import React from 'react'

//this class has only one parent: TabCastCrew
//this is responsible to create Crew 
let renderThis;
class Cast extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.conditionalRendering = this.conditionalRendering.bind(this);
    }

    //conditional rendering when coming data is not undefined
    conditionalRendering(){
        if (this.props.name !== undefined) {
            renderThis =
                <div className="personsCast">
                    <div className="cardCast">
                        <div className="containerCast">
                            <h4><b>Department: {this.props.department}</b></h4>
                            <div className="profileCast"><span>Job: {this.props.job}</span>
                            </div>
                            <p>Name: {this.props.name}</p>
                        </div>
                    </div>
                </div>
        }
    }

render(){
    this.conditionalRendering()
    return (
        <div>
            {renderThis}
        </div>
    )
}
}

export default Cast
