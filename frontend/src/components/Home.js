import React from 'react'
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import About from './aboutus/About';
import logo from '../images/logo2.png';
//import Axios from 'axios'
import AxiosConfig from './utils/AxiosConfig'
import {Button,  Layout, Menu, Breadcrumb } from 'antd';
import { LogoutOutlined, FilterOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

//Parent of this class is App
//This class has only one child component: About
//Main is routed from here
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.setSearchFLAG = this.setSearchFLAG.bind(this);
        this.setListAllFLAG = this.setListAllFLAG.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    //handling change on search field
    handleChange(e) {
        const searching = e.target.value;
        this.setState({ searchValue: searching })
    }

    //if search from home is requested
    setSearchFLAG() {
        let searchFLAG = true;
        let listAllFLAG = false;
        let FilterFLAG = false;
        let viewFLAG = false;
        let FavViewFlag = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, FavViewFlag);
        this.props.getSearchValue(this.state.searchValue);
    }

    //if List All movies is requested
    setListAllFLAG() {
        let searchFLAG = false;
        let listAllFLAG = true;
        let FilterFLAG = false;
        let viewFLAG = false;
        let FavViewFlag = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, FavViewFlag)
    }

    handleSignOut() {
        AxiosConfig.get('/logout').then(resp => {
            window.location = "https://hms-mern-backend.herokuapp.com/logout"
        })
    }

    render() {
        return (
            <div id="myHome">
                <div className="hero-image"></div>    
                <div className="homeMain">
                    <h1 className="heading">HM'S Movie Collection
                        <img className="logo2" src={logo} alt="MRU Theater Logo" />
                    </h1>
                    <div className="buttonPackHome" >
                        <Link to='/main'>
                            <Button className="AllHome" onClick={this.setListAllFLAG}>List All Movies&nbsp;<i className="fa fa-film"></i></Button>
                        </Link>
                        <About />
                    </div>
                    <div className="SBox">
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100">
                                <div className="searchbar">
                                    <input className="search_input" type="text" name="search" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search Movie Title..." />
                                    <Link to='/main'>
                                        <div className="search_icon" onClick={this.setSearchFLAG}><i className="fas fa-search"></i></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Button id="homeLogout" onClick={this.handleSignOut}>Logout</Button>
            </div>
        )
    }
}

export default Home
