import React from 'react'
import loader from '../../../../images/loader2.gif';
import ActorProfile from './ActorProfile';

//This class has only one parent: AllMovieList
//This class has one child: ActorProfile
//This is responsible to Set and Send FLAGS regarding actor profile to parent

const AIKEY = "65c5e6c3fe25133b5ae1e6fde0e71cb6"; //API KEY from IMDB
let renderThis;
class ActorProfileContainer extends React.Component {
    constructor() {
        super()
        
        this.state = {
            isLoading : false, 
            ActorID :0,
            actorData:[]
        }
        this.setViewFLAG= this.setViewFLAG.bind(this);
        this.conditionalRendering = this.conditionalRendering.bind(this);
    }

    //Compment will always remount because we have set child key ints parent: AllMovieList
    async componentDidMount(){
        this.setState( {isLoading : true,  ActorID : this.props.ActorID} )
        try {
            let viewAPI = "https://api.themoviedb.org/3/person/" + this.props.ActorID + "?api_key=" + AIKEY;
            const response = await fetch(viewAPI);
            const jsonData = await response.json();
            this.setState( {actorData : jsonData} )
            this.setState( {isLoading : false } )
        }
        catch (error) {
            console.error(error);
        }
    }

    //if view movie si requested, send to parent
    setViewFLAG(){
        let searchFLAG = false;
        let listAllFLAG = false;
        let FilterFLAG = false;
        let viewFLAG = true;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG)
    }

    //conditional rendering if busy
    conditionalRendering(){
        
        renderThis = this.state.isLoading ? <p className="isLoading" ><img src={loader} alt="Loading" height="80" width="80"/>Loading API....</p>
        :
        <ActorProfile actorData={this.state.actorData}/>
    }
    
    render() {
        
        this.conditionalRendering();
        return (
            <div>
                <button id="closeM" className="fa fa-close" onClick={this.setViewFLAG} alt="Back To Movie" ></button>
                { renderThis }
            </div>
        )
    }
}

export default ActorProfileContainer
