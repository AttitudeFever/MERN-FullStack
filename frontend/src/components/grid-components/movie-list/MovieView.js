import React from 'react';
import SingleMovieDetail from './SingleMovieDetail';
import loader from '../../../images/loader2.gif';
import Axios from 'axios';

//This Class has only one parent: AllMovieList
//This class has only one child: SingleMovieDetail
//this is responsible to open close SingleMovieDetail
let renderThis;
class MovieView extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData : [],
            isLoading : false
        }
        this.handleCloseMovieView=this.handleCloseMovieView.bind(this);
        this.setListAllFLAG=this.setListAllFLAG.bind(this);
        this.conditionalRendering = this.conditionalRendering.bind(this);
        this.getProduction = this.getProduction.bind(this);
    }

    //Close request for SingleMovieDetail
    handleCloseMovieView(){
        document.getElementById('filter').style.display = "inline-block";
        document.getElementById('sort').style.display = "inline-block";
        document.getElementById('castcrewcontainer').style.display = "none";
        this.setListAllFLAG();
    }

    //if request to list all
    setListAllFLAG(){
        let searchFLAG = false;
        let listAllFLAG = true;
        let FilterFLAG = false;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG)
    }

    async componentDidMount(){
        this.setState( {isLoading : true } )
        try {
            Axios.get('/api/movies/' + this.props.viewID).then(resp => {
                this.setState({ viewData: resp.data }, ()=>{
                    this.setState({ isLoading: false })
                })
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    //get production result from SingleMovieDetail
    getProduction(production){
        this.props.getProduction(production)
    }

    //conditonal rendering if busy
    conditionalRendering() {
        console.log(this.state.viewData)
        renderThis = this.state.isLoading ? <p className="isLoading" ><img src={loader} alt="Loading" height="80" width="80" />Loading API....</p>
            :
            renderThis = this.state.viewData.map((item, index) => {
                return <SingleMovieDetail key={index} poster={item.poster} title={item.title} release_date={item.release_date} ratings={item.ratings.average} 
                    id={item.id} tagline={item.tagline} imdb_id={item.imdb_id} tmdb_id={item.tmdb_id} runtime={item.runtime} revenue={item.revenue}
                    genres={item.details.genres} keywords={item.details.keywords} countries={item.production.countries} companies={item.production.companies}
                    count={item.ratings.count} popularity={item.ratings.popularity} overview={item.details.overview}
                    addToFav={this.props.addToFav} getProduction={this.getProduction} />
            })
    }

    render() {
        this.conditionalRendering();
        return (
            <div>
                <button id="closeM" className="fa fa-close" onClick={this.handleCloseMovieView} alt="Back To Main"></button>
                { renderThis }
            </div>
        )
    }
}

export default MovieView
