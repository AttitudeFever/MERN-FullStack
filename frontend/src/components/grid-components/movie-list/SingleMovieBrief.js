import React from 'react'
//import Axios from 'axios'

//This Class has only one parent: AllMovieList
//this is responsible to create Movie Brief Cards
class SingleMovieBrief extends React.Component {

    constructor() {
        super()
        this.state = {}
        this.addToFav = this.addToFav.bind(this);
        this.captureViewID = this.captureViewID.bind(this);
    }

    //Pass to parent, Add to Fav request
    addToFav() {
        this.props.addToFav(this.props.title, this.props.poster, this.props.id);
        // const id = 568
        // const title = "req.body.title"
        // const poster = ".jpg"

        // var itemToAdd = {id: id, title: title, poster: poster}

        // Axios.post('/api/add/favorite/1', itemToAdd);
    }

    //Pass to parent, movie id upon view request
    captureViewID() {
        this.props.getViewID(this.props.id)
    }

    
    render() {
        let poster;
        if (this.props.poster !== null && this.props.poster !== undefined) {
            poster = "https://image.tmdb.org/t/p/w780/" + this.props.poster;
        }
        return (
            <div className="card">
                <div className="card-header">
                    <img className="card-img" src={poster} alt={this.props.title} />
                </div>
                <div className="card-body">
                    <h1 className="card-title">{this.props.title}</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-4 metadata"><p>{this.props.ratings}/10</p></div>
                            <div className="col-8 metadata"><p>{this.props.release_date} </p></div>
                            <div className="heart" onClick={this.addToFav}><i className="fa fa-heart" ></i></div>
                        </div>
                    </div>
                    <p className="card-text">{this.props.tagline}</p>
                    <div className="trailer-preview" onClick={this.captureViewID}>
                        <i className="fa fa-eye" aria-hidden="true" ></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleMovieBrief
