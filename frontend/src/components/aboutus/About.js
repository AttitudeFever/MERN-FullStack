import React from 'react'
import ReactModal from 'react-modal';
import Person from './Person';
import imgHamid from '../../images/hamid.png';
import imgMark from '../../images/mark.jpg';
import bgImg from '../../images/bgAboutus.jpg';
import { Button } from 'antd';

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
                <Button className="aboutusHome" onClick={this.handleOpenModal}>About Us&nbsp;<i className="fa fa-group"></i></Button>
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
                            <p>This SPA MERN FullStack Project is implmented using (MongoDB, Express.js React.js, Node.js), HTML5 and CSS3.</p>
                            <ul>
                                <div className="ul">Backend Architecture</div>
                                <li><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm Version: 6.12.1</a></li>
                                <li><a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">Node.js Version: 12.13.1</a></li>
                            </ul>
                            <ul>
                                <div className="ul">Backend Middlewares</div>
                                <li><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express.js Version: 4.17.1</a></li>
                                <li><a href="https://www.npmjs.com/package/express-flash" target="_blank" rel="noopener noreferrer">Express-Flash Version: 0.0.2</a></li>
                                <li><a href="https://github.com/expressjs/session" target="_blank" rel="noopener noreferrer">Express-Session Version: 1.17.0</a></li>
                                <li><a href="http://www.passportjs.org/" target="_blank" rel="noopener noreferrer">Passport Version: 0.4.1</a></li>
                                <li><a href="http://www.passportjs.org/packages/passport-local/" target="_blank" rel="noopener noreferrer">Passport-Local Version: 1.0.0</a></li>
                                <li><a href="https://www.npmjs.com/package/bcryptjs" target="_blank" rel="noopener noreferrer">Bcrypt Version: 4.0.1</a></li>
                                <li><a href="https://www.npmjs.com/package/cookie-parser" target="_blank" rel="noopener noreferrer">Cookie-Parser Version: 1.4.4</a></li>
                                <li><a href="https://www.npmjs.com/package/dotenv" target="_blank" rel="noopener noreferrer">Dotenv Version: 8.2.0</a></li>
                                <li><a href="https://mongoosejs.com/" target="_blank" rel="noopener noreferrer">Mongoose Version: 5.9.3</a></li>
                                <li><a href="https://www.npmjs.com/package/nodemon" target="_blank" rel="noopener noreferrer">Nodemon Version: 2.0.2</a></li>
                            </ul>
                            <ul>
                                <div className="ul">Backend Template Engine</div>
                                <li><a href="https://ejs.co/" target="_blank" rel="noopener noreferrer">Ejs Version: 3.0.1</a></li>
                                <li><a href="https://www.npmjs.com/package/express-ejs-layouts" target="_blank" rel="noopener noreferrer">Express-Ejs-Layouts Version: 2.5.0</a></li>
                            </ul>


                            <ul>
                                <div className="ul">NoSql Database</div>
                                <li><a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
                            </ul>

                            <ul>
                                <div className="ul">Frontend Architecture</div>
                                <li><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm Version: 6.12.1</a></li>
                                <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React.js Version: 16.13.0</a></li>
                                <li><a href="https://www.npmjs.com/package/react-modal#installation" target="_blank" rel="noopener noreferrer">react router 5.1.2</a></li>
                                <li><a href="https://www.npmjs.com/package/lodash" target="_blank" rel="noopener noreferrer">lodash 4.17.15</a></li>
                                <li><a href="https://github.com/reactjs/react-transition-group/tree/v1-stable" target="_blank" rel="noopener noreferrer">react-transition-group v1-stable</a></li>
                                <li><a href="https://www.npmjs.com/package/react-modal#installation" target="_blank" rel="noopener noreferrer">react-modal 3.11.1</a></li>
                                <li><a href="https://react.rocks/example/react-rater" target="_blank" rel="noopener noreferrer">react-rater</a></li>
                                <li><a href="https://reactcommunity.org/react-tabs/" target="_blank" rel="noopener noreferrer">react-tabs</a></li>
                            </ul>
                            <ul>
                                <div className="ul">Frontend and Backend Adaptor</div>
                                <li><a href="https://alligator.io/react/axios-react/" target="_blank" rel="noopener noreferrer">Axios Version: 0.19.2</a></li>
                            </ul>
                            <ul>
                                <div className="ul">Frontend Design Frame Work</div>
                                <li><a href="https://ant.design/" target="_blank" rel="noopener noreferrer">Ant-Design Version: 4.0.2</a></li>
                                <li><a href="https://www.w3.org/Style/CSS/Overview.en.html" target="_blank" rel="noopener noreferrer">CSS3</a></li>
                            </ul>

                            <p>Project's Open Source <a href="https://github.com/AttitudeFever/MERN-FullStack" target="_blank" rel="noopener noreferrer">Repository</a></p>
                            <p>Project Depolyment via <a href="https://heroku.com/" target="_blank" rel="noopener noreferrer">Heroku Server</a></p>
                            <ul>
                                <div className="ul">Data API's</div>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/movies" target="_blank" rel="noopener noreferrer">Retrive complete details about all movies</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/movies/914" target="_blank" rel="noopener noreferrer">Retrive details about a single movie with movie id, i.e movie id=914</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/brief" target="_blank" rel="noopener noreferrer">Retrive brief details about all movies</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/find/title/car" target="_blank" rel="noopener noreferrer">Retrive all movies whose title contains substring, i.e substring=car</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/find/year/1999/2001" target="_blank" rel="noopener noreferrer">Retrive all movies whose year is between y1 and y2, i.e y1=1999 and y2=2001</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/find/rating/4/8" target="_blank" rel="noopener noreferrer">Retrive all movies whose average rating is between r1 and r2, i.e r1=4 and r2=8</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/login" target="_blank" rel="noopener noreferrer">Login Page</a></li>
                                <li><a href="https://hms-mern-backend.herokuapp.com/api/users/1" target="_blank" rel="noopener noreferrer">Retrive particular user info with userid i.e userid=1</a></li>
                            </ul>
                            <h1 className="pih">Credits</h1>
                            <ul>
                                <div className="ul">We would like to give credits to these awesome people</div>
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
