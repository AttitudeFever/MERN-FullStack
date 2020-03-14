import React from 'react'

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
    }

    //Pss to parent, movie id upon view request
    captureViewID() {
        this.props.getViewID(this.props.id)
    }

    
    render() {
        const poster = "https://image.tmdb.org/t/p/w780/" + this.props.poster;
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
                    <div className="trailer-preview">
                        <i className="fa fa-eye" aria-hidden="true" onClick={this.captureViewID}></i>
                    </div>
                </div>
            </div>
        )
    }
}
                        
                        export default SingleMovieBrief
