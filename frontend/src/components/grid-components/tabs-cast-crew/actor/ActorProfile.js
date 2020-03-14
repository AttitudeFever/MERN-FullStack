import React from 'react'
import unknown_cast from '../../../../images/unknown_cast.jpg'
import ReactModal from 'react-modal';
import bgImg from '../../../../images/bgAboutus.jpg';

//This class has onyl one parent: ActorProfileContainer
//this is responsible to create Actor Profile 

//react modal style 
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

let actorPoster;
let place_of_birth;
let birthday;
let biography;
let imdb_link;

class ActorProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCleanData = this.handleCleanData.bind(this);
    }

    //handle popup open request
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    //handle popup close request
    handleCloseModal() {
        this.setState({ showModal: false });
    }

    //handle if any null, undefined, "", display unknown if any occur
    handleCleanData() {

        if (this.props.actorData.profile_path !== undefined && this.props.actorData.profile_path !== null) {
            actorPoster = "https://image.tmdb.org/t/p/w780" + this.props.actorData.profile_path;
        } else {
            actorPoster = unknown_cast;
        }

        if (this.props.actorData.place_of_birth === null || this.props.actorData.place_of_birth === undefined || this.props.actorData.place_of_birth === "") {
            place_of_birth = "Unknown";
        } else {
            place_of_birth = this.props.actorData.place_of_birth;
        }

        if (this.props.actorData.birthday === null || this.props.actorData.birthday === undefined || this.props.actorData.birthday === "") {
            birthday = "Unknown";
        } else {
            birthday = this.props.actorData.birthday;
        }

        if (this.props.actorData.biography === null || this.props.actorData.biography === undefined || this.props.actorData.biography === "") {
            biography = "Unknown";
        } else {
            biography = this.props.actorData.biography;
        }

        imdb_link = "https://www.imdb.com/name/" + this.props.actorData.imdb_id;
    }


    render() {
        this.handleCleanData();
        return (
            <div className="card-actor">
                <div className="card-header-actor">
                    <img className="card-img-actor" src={actorPoster} alt={this.props.actorData.name} onClick={this.handleOpenModal}/></div>
                <ReactModal //resubale React Modal for poster popup
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    closeTimeoutMS={2000}>
                    <img src={actorPoster} alt={this.props.actorData.name} />
                    <button id="close" className="fa fa-close" onClick={this.handleCloseModal}></button>
                </ReactModal>

                <div className="card-body-actor">
                    <h1 className="card-title-actor">{this.props.actorData.name}
                        <a className="trailer-preview-actor" href={imdb_link} target="_blank" rel="noopener noreferrer">
                            IMDB Profile
                    </a>
                    </h1>
                    <div className="container-actor">
                        <div className="row-actor">
                            <div className="col-4 metadata-actor"><p>Place of Birth: {place_of_birth}</p></div>
                            <div className="col-8 metadata-actor"><p>Birthday: {birthday} </p></div>
                        </div>
                    </div>
                    <span>Biography</span>
                    <p className="card-text-actor">{biography}</p>
                </div>
            </div>
        )
    }

}

export default ActorProfile
