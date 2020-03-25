import React from 'react'
import SingleFav from './SingleFav';

//This class has only one parent: Main
//This class has only one child: SingleFav
class FavList extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.getFavViewID = this.getFavViewID.bind(this);
        this.setFavViewFLAG = this.setFavViewFLAG.bind(this);
    }


    //handle reuest to expand or close Fav bar
    favPopup() {
        const btnFavorite = document.querySelector('#btnFavorite');
        const favs = document.querySelector('#favs');

        if (btnFavorite.textContent === "Favorites") {
            btnFavorite.innerHTML = "Close<i class='fa fa-close'></i>";
            favs.style.width = "auto";
            favs.style.height = 160 + "px";
            favs.style.overflowX = "scroll";
        }

        else if (btnFavorite.textContent === "Close") {
            btnFavorite.innerHTML = "Favorites<i class='fa fa-heart'></i>";
            favs.style.width = 120 + "px";
            favs.style.height = 52 + "px";
            favs.style.overflow = "hidden";
        }
    }
    //capture id of that particular movie, request coming from child: MovieView
    getFavViewID(id) {
        this.props.getFavViewID(id);
        document.getElementById('sort').style.display = "none";
        document.getElementById('castcrewcontainer').style.display = "inline-block";
        this.setViewFLAG()
    }

    //if movie detail view is request
    setFavViewFLAG() {
        let searchFLAG = false;
        let listAllFLAG = false;
        let FilterFLAG = false;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        let FavViewFlag = true;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG, FavViewFlag)
    }

    render() {
        return (
            <div className="favs" id="favs">
                <button id="btnFavorite" onClick={this.favPopup}>Favorites<i className="fa fa-heart"></i></button>
                {
                    this.props.favList.map((item, index) => {
                    return <SingleFav key={index} id={item.id} title={item.title} poster={item.poster} deleteFavItem={this.props.deleteFavItem} getFavViewID={this.getFavViewID}/> })
                }
            </div>
        )
    }
}

export default FavList
