import React from 'react'
import TabCastCrew from './TabCastCrew';

//this class has only one parent: Main
//this class has one child: TabCasCrew
//this is responsible to handle requests and redner dsiplaying of cast crew tabs.
let castArray = [];
let crewArray = [];
let renderThis;
class CastCrewContainer extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.conditionalRendering = this.conditionalRendering.bind(this);
    }

    //conditonal rendering when coming data is not undefined or null
    //sort cast based on order num
    //sort crew based on department then name
    //displaying will only happen when Actor View FLAG or MovieView FLAG is True
    conditionalRendering() {
        const cast = {};
        const crew = {};

        if (this.props.production.cast !== null && this.props.production.cast !== undefined) {
            Object.assign(cast, this.props.production.cast);
            castArray = this.props.production.cast;

            castArray.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                if (b.order > a.order) {
                    return -1;
                }
                return 0;
            });

        }
        else {
            castArray = [{ id: 0, name: "Not Found", character: "Not Found" }]

        }

        if (this.props.production.crew !== null && this.props.production.crew !== undefined) {
            Object.assign(crew, this.props.production.crew);
            crewArray = this.props.production.crew;

            crewArray.sort((a, b) => {
                if (a.department > b.department) {
                    return 1;
                }
                if (b.department > a.department) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            });
        }
        else {
            crewArray = [{ department: "Not Found", job: "Not Found", name: "Not Found" }]

        }

        //displaying will only happen when Actor View FLAG or MovieView FLAG is True
        renderThis = this.props.viewFLAG || this.props.ActorProfileFLAG ? <TabCastCrew cast={castArray} crew={crewArray} getFLAGS={this.props.getFLAGS} getActorID={this.props.getActorID}/> : null;
        
    }


    render() {
        this.conditionalRendering();
        return (
            <div className="castcrewcontainer" id="castcrewcontainer">
                {renderThis}
            </div>
        )
    }
}

export default CastCrewContainer
