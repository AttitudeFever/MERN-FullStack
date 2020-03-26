import React from 'react';
import '../../../static/singlemoviedetail.css';
import Rater from 'react-rater';
import ReactModal from 'react-modal';
import bgImg from '../../../images/bgAboutus.jpg';


//This class has only one parent: MovieView
//this is resonsible to create single Movie Detail
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '880px',
        height: '100%',
        backgroundImage: 'url(' + bgImg + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    }
};

ReactModal.setAppElement(document.getElementById('root'));

let imgUrl;
let genres;
let keywords;
let countries;
let companies;
let title;
let imdb;
let tmdb;
let runRav;
let tagline;
let ratings;
let count;
let popularity;
let overview;
let id;
let poster;

class Singlemoviedetail extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.addToFav = this.addToFav.bind(this);
        this.handleCleanData = this.handleCleanData.bind(this);
    }

    //handle open for larger poster
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    //handle close after larger poster
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    //pass request to add to fav to parent
    addToFav(){
        this.props.addToFav(title, poster, id);
    }

    //handle if any null, undefined, "", clean Regex and display number of items with Algorithm
    handleCleanData() {
        if (this.props.id !== null && this.props.id !== undefined){        
            id = this.props.id;
        }
        if (this.props.title !== null && this.props.title !== undefined && this.props.release_date !==null && this.props.release_date !== undefined){        
            title = this.props.title + "(" + this.props.release_date + ")";
        }
        if(this.props.imdb_id !== null && this.props.imdb_id !== undefined){
            imdb = "https://www.imdb.com/title/" + this.props.imdb_id;
        }
        if(this.props.tmdb_id !== null && this.props.tmdb_id !== undefined){
            tmdb = "https://www.themoviedb.org/movie/" + this.props.tmdb_id;
        }
        if (this.props.runtime !==null && this.props.runtime !== undefined && this.props.revenue !==null && this.props.revenue !== undefined){
            runRav = "| Runtime: " + this.props.runtime + "mins | | Revenue: " + new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.props.revenue) + " |";
        }
        if (this.props.poster !== null && this.props.poster !== undefined) {
            imgUrl = "https://image.tmdb.org/t/p/w780/" + this.props.poster;
            poster = this.props.poster;
        }
        if (this.props.genres !== null && this.props.genres !== undefined) {
            genres = this.props.genres.map((item, index) => {
                let genresWithoutSpace = item.name.replace(/\s/g, '').replace(/[|&;$%@"<>()+,-]/g, "");
                if (index > 1 && index % 3 === 0) {
                    return <span className="BMtag" key={index}>{genresWithoutSpace}<br /></span>
                } else {
                    return <span className="BMtag" key={index}>{genresWithoutSpace}</span>
                }
            })
        }
        if (this.props.keywords !== null && this.props.keywords !== undefined) {
            keywords = this.props.keywords.map((item, index) => {
                let keywordsWithoutSpace = item.name.replace(/\s/g, '').replace(/[|&;$%@"<>()+,-]/g, "");
                if (index > 1 && index % 3 === 0) {
                    return <span className="BMkeyword" key={index}>{keywordsWithoutSpace}<br /></span>
                } else {
                    return <span className="BMkeyword" key={index}>{keywordsWithoutSpace}</span>
                }
            })
        } else {
            keywords = <span>N/A</span>
        }
        if (this.props.countries !== null && this.props.countries !== undefined) {
            countries = this.props.countries.map((item, index) => {
                return <span key={index}><i className="far fa-flag">&nbsp;{item.name}</i><br /></span>
            })
        } else {
            countries = <span>N/A</span>
        }
        if (this.props.companies !== null && this.props.companies !== undefined) {
            companies = this.props.companies.map((item, index) => {
                return <span key={index}>{item.name}><br /></span>
            })
        } else {
            companies = <span>N/A</span>
        }
        if(this.props.tagline !==null && this.props.tagline !== undefined){
            tagline = this.props.tagline
        }
        if(this.props.ratings !==null && this.props.ratings !==undefined && 
            this.props.count !==null && this.props.count !==undefined &&
            this.props.popularity !==null && this.props.popularity !==undefined){
            ratings = this.props.ratings;
            count = this.props.count;
            popularity = this.props.popularity;
        }
        if(this.props.overview !==null && this.props.overview !==undefined){
            overview = this.props.overview;
        }
    }

    componentDidMount(){
        if (this.props.production !== null && this.props.production !== undefined) {
            this.props.getProduction(this.props.production)
        }
    }

    render() {
        this.handleCleanData();
        return (
            <div>
                <div className="Bmovie-card">
                
                    <div className="BMcontainer">
                    <div className="heartM" onClick={this.addToFav}><i className="fa fa-heart" ></i></div>
                        <div className="BMhero" style={{ backgroundImage: 'url(' + imgUrl + ')' }} onClick={this.handleOpenModal}></div>
                        <ReactModal
                            isOpen={this.state.showModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Minimal Modal Example"
                            closeTimeoutMS={2000}>
                                <img src={imgUrl} alt={title}/>
                            <button id="close" className="fa fa-close" onClick={this.handleCloseModal}></button>
                        </ReactModal>

                        <div className="BMdetails">
                            <div className="BMtitle1">{title}<span><a href={imdb} target="_blank" rel="noopener noreferrer">IMDB</a> <a href={tmdb} target="_blank" rel="noopener noreferrer">TMDB</a></span></div>
                            <div className="BMtitle2">
                                {tagline}
                            </div>
                                <div className="BMrating">
                                    <span>
                                    < Rater rating={ratings} total={10} interactive={false} />
                                        /10
                                        <br/>
                                <span className="popularity">Count: {count} | Popularity: {popularity}</span>
                                    </span>
                                </div>
                                <span className="BMextra">{runRav}</span>
                            </div>
                        <div className="BMdescription">
                            <div className="BMcolumn1">
                            {genres}
                            <p className="flag">Country of Release:
                            <br/>
                            {countries}
                            </p>
                            <p className="companies">Production Companies: <br/>
                                {companies}
                            </p>
                            </div>
                            <div className="BMcolumn2">
                                <span>Overview:
                                    <p>{overview}</p>
                                </span>
                                <p>Keywords:&nbsp;
                                    {keywords}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Singlemoviedetail