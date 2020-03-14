import React from 'react'
import ReactModal from 'react-modal';
import Person from './Person';
import imgHamid from '../../images/hamid.png';
import imgMark from '../../images/mark.jpg';
import bgImg from '../../images/bgAboutus.jpg';

//style for modal popup
const customStyles = {
    content: {
        backgroundImage: 'url(' + bgImg + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    }
};

ReactModal.setAppElement(document.getElementById('root'));

//This class has only one child component: "Person"
//Parent of this class is Home
class About extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            people: [
                {
                    name: "Hamid Hemani",
                    img: imgHamid,
                    githubRepo: "https://github.com/AttitudeFever",
                    linkedIn: "https://www.linkedin.com/in/hamid-hemani-a5a4781a/",
                    desc: "Loves to drink tea !"
                },
                {
                    name: "Mark Carvalho",
                    img: imgMark,
                    githubRepo: "https://github.com/mcarv838",
                    linkedIn: "https://www.linkedin.com/in/mark-carvalho-95721815a/",
                    desc: "Loves to day dream !"
                }
            ]
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div className="aboutUs">
                <button className="aboutusHome" onClick={this.handleOpenModal}>About Us <i className="fa fa-group"></i></button>
                <ReactModal     //Reusable React Modal to create popup effect handling and style is defined on the opening tag
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Minimal Modal Example"
                    closeTimeoutMS={2000}
                >
                    <div className="aboutBody">
                        <h1 className="heading3">HM's Team Members</h1>
                        {
                            this.state.people.map((item, index) => { //member's contact cards
                                return <Person key={index} item={item} />
                            })
                        }

                        <div className="projectInfo">
                            <h1 className="pih">Project Info</h1>
                            <p>This SPA Project is implmented using HTML5, CSS3 and React.js Frame Work version 16.12.0 and npm version 6.12.1</p>
                            <p>Data APIs provided by MRU Prof: <a href="https://github.com/rconnolly" target="_blank" rel="noopener noreferrer">Randy Connolly</a></p>
                            <ul>npm dependencies include:
                            <li><a href={"https://www.npmjs.com/package/react-modal#installation"} target="_blank" rel="noopener noreferrer">react router 5.1.2</a></li>
                                <li><a href="https://www.npmjs.com/package/lodash" target="_blank" rel="noopener noreferrer">lodash 4.17.15</a></li>
                                <li><a href="https://github.com/reactjs/react-transition-group/tree/v1-stable" target="_blank" rel="noopener noreferrer">react-transition-group v1-stable</a></li>
                                <li><a href="https://www.npmjs.com/package/react-modal#installation" target="_blank" rel="noopener noreferrer">react-modal 3.11.1</a></li>
                                <li><a href="https://react.rocks/example/react-rater" target="_blank" rel="noopener noreferrer">react-rater</a></li>
                                <li><a href="https://reactcommunity.org/react-tabs/" target="_blank" rel="noopener noreferrer">react-tabs</a></li>
                            </ul>
                            <p>Project's Open Source: <a href="https://github.com/AttitudeFever/reactlearn" target="_blank" rel="noopener noreferrer">Repository</a></p>
                            <p>Project Depolyment via <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Server</a></p>
                            <h1 className="pih">Credits</h1>
                            <ul>We would like to give credits to these awesome people:
                            <li><a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Awesome Backgroud Image</a></li>
                            <li><a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">HTML5 Icons</a></li>
                            <li><a href="https://realfavicongenerator.net/" target="_blank" rel="noopener noreferrer">FavIcon Generate</a></li>
                                <li><a href="https://bootsnipp.com/snippets/GaeQR" target="_blank" rel="noopener noreferrer">Search Box on Home Page Design</a></li>
                                <li><a href="https://www.freelogodesign.org/" target="_blank" rel="noopener noreferrer">Free Logo Design</a></li>
                                <li><a href="https://loading.io/" target="_blank" rel="noopener noreferrer">Free Loading gif</a></li>
                                <li><a href="https://freefrontend.com/css-cards/" target="_blank" rel="noopener noreferrer">Contact Card Ideas</a></li>
                                <li><a href="https://www.youtube.com/watch?v=BZRyIOrWfHU&t=773s" target="_blank" rel="noopener noreferrer">React CSS Transition Tutorial</a></li>
                            </ul>
                        </div>
                        <button id="close" className="fa fa-close" onClick={this.handleCloseModal}></button>
                    </div>
                </ReactModal>
            </div>
        )
    }
}
export default About
