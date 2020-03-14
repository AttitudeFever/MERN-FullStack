import React from 'react'
import SingleFav from './SingleFav';

//This class has only one parent: Main
//This class has only one child: SingleFav
class FavList extends React.Component {
    constructor() {
        super()
        this.state = {}
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

    render() {
        return (
            <div className="favs" id="favs">
                <button id="btnFavorite" onClick={this.favPopup}>Favorites<i className="fa fa-heart"></i></button>
                {
                    this.props.favList.map((item, index) => {
                        return <SingleFav key={index} id={item.id} title={item.title} poster={item.poster} deleteFavItem={this.props.deleteFavItem} />
                            
                    })                    
                }
            </div>
        )
    }
}

export default FavList
