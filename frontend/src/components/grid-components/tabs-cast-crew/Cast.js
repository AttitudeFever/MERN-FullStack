import React from 'react'

//this class has only one parent: TabCastCrew
//this is responsible to create Cast 
let renderThis;
class Cast extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.conditionalRendering = this.conditionalRendering.bind(this);
        this.setActorProfileFLAG = this.setActorProfileFLAG.bind(this);
        this.ActorProfileRequest = this.ActorProfileRequest.bind(this);
    }

    //if actor profile view is requested, send to ID of actor to parent
    ActorProfileRequest(){
        this.setActorProfileFLAG()
        this.props.getActorID(this.props.id)
    }

   //if actor profile view is requested, send FLAG to parent
    setActorProfileFLAG(){
        let searchFLAG = false;
        let listAllFLAG = false;
        let FilterFLAG = false;
        let viewFLAG = false;
        let ActorProfileFLAG = true;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG)
    }

    //conditonal rendering if data coming is not undefined
    conditionalRendering(){
        if (this.props.name !== undefined) {
            renderThis =
                <div className="personsCast">
                    <div className="cardCast">
                        <div className="containerCast">
                            <h4><b>Actor Name: {this.props.name}</b></h4>
                            <div className="profileCast"><span className="actorprofile" onClick={this.ActorProfileRequest}>Actor's Profile</span>
                            </div>
                            <p>Character Name: {this.props.character}</p>
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
