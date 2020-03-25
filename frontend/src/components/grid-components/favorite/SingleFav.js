import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
//import { CSSTransitionGroup } from 'react-transition-group'

//this class has only one parent: FavList
//responsible to display fav items in fav bar
class SingleFav extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.deleteFavItem = this.deleteFavItem.bind(this);
        this.captureFavViewID = this.captureFavViewID.bind(this);
    }

    //delete item request
    deleteFavItem(){
        this.props.deleteFavItem(this.props.id)
    }

    //Pass to parent, movie id upon view request
    captureFavViewID() {
        this.props.getFavViewID(this.props.id)
    }

    render() {
        const poster = "https://image.tmdb.org/t/p/w154" + this.props.poster;
        return (
            //React CSS Transition group effect upon adding and deleting Items
            <CSSTransitionGroup
                transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={true}
                transitionEnterTimeout={1000}
                transitionLeave={true}
                transitionLeaveTimeout={300}>

                <div className="singleFav">

                    <img src={poster} alt={this.props.title} onClick={this.captureViewID}/>
                    <button id="btnDelete" className="fa fa-close" onClick={this.deleteFavItem} ></button>
                </div>
            </CSSTransitionGroup>
        )
    }
}

export default SingleFav
