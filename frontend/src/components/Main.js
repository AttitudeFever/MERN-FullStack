import React from 'react'
//import CustomHeader from './grid-components/CustomHeader';
import { Link } from 'react-router-dom';
import logo from '../images/logo2.png';
import About from './aboutus/About';
import AllMovieList from './grid-components/movie-list/AllMovieList';
import FavList from './grid-components/favorite/FavList';
import FilterContainter from './grid-components/filter/FilterContainer';
import UserInfo from './grid-components/UserInfo';
import * as cloneDeep from 'lodash/cloneDeep';
import CastCrewContainer from './grid-components/tabs-cast-crew/CastCrewContainer';
//import Axios from 'axios';
import AxiosConfig from './utils/AxiosConfig'
import { Layout, Menu, Breadcrumb, Button, Badge } from 'antd';
import { LogoutOutlined, FilterOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../static/responsive.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

//This is the main class container, that is the manager to what should be displayed upon different button clicks
//Parent of this class is: App
//This class has 5 child components: Header, FavList, FilterContainer, AllMovieList and CastCrewContainer

const LOCAL_STORAGE_KEY = 'movieData';
let FN;
class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: false,
            isLoading: false,
            movieData: [],
            favList: [],
            filterResult: [],
            production: [],
            ActorID: 0,
            userInfo: [],
        }
        this.storeMainAPILocally = this.storeMainAPILocally.bind(this);
        this.intialSortBytitle = this.intialSortBytitle.bind(this);
        this.sortByYear = this.sortByYear.bind(this);
        this.sortByTitle = this.sortByTitle.bind(this);
        this.sortByRatings = this.sortByRatings.bind(this);
        this.addToFav = this.addToFav.bind(this);
        this.deleteFavItem = this.deleteFavItem.bind(this)
        this.getFilterResult = this.getFilterResult.bind(this);
        this.setFilterFLAG = this.setFilterFLAG.bind(this);
        this.setListAllFLAG = this.setListAllFLAG.bind(this);
        this.doSort = this.doSort.bind(this);
        this.getProduction = this.getProduction.bind(this);
        this.getActorID = this.getActorID.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    //When componet first formed
    componentDidMount() {
        this.setState({ isLoading: true })
        this.storeMainAPILocally();
        this.getUserInfo();
    }

    //get user info and populate fav list from db -- nested call backs
    getUserInfo() {
        AxiosConfig.get('/api/users/' + this.props.currentUserID).then(resp => {
            this.setState({ userInfo: resp.data }, () => {
                this.state.userInfo.map(item => {
                    return this.setState({ favList: item.favorites })
                })
            })
        })
    }

    //fetch api and and use local storage 
    storeMainAPILocally() {
        let storedItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if (storedItemList) {
            this.intialSortBytitle(storedItemList);
            this.setState({ isLoading: false })
        }
        else {
            try {
                AxiosConfig.get('/api/movies').then(resp => {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resp.data));
                    storedItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
                    this.intialSortBytitle(storedItemList);
                    this.setState({ isLoading: false })
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    //first sort upon display by title
    intialSortBytitle(storedItemList) {
        storedItemList.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (b.title > a.title) {
                return -1;
            }
            return 0;
        });

        this.setState({ movieData: storedItemList });
    }

    //sort by year request, on filter result as awell
    //request coming from child: AllMovieList
    sortByYear() {
        this.state.movieData.sort(function (a, b) {
            if (a.release_date > b.release_date) {
                return -1;
            }
            if (b.release_date > a.release_date) {
                return 1;
            }
            return 0;
        });

        this.state.filterResult.sort(function (a, b) {
            if (a.release_date > b.release_date) {
                return -1;
            }
            if (b.release_date > a.release_date) {
                return 1;
            }
            return 0;
        });

        this.forceUpdate()
    }

    //sort by title request, on filter reult as well
    //request coming from child: AllMovieList
    sortByTitle() {
        this.state.movieData.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (b.title > a.title) {
                return -1;
            }
            return 0;
        });

        this.state.filterResult.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            }
            if (b.title > a.title) {
                return -1;
            }
            return 0;
        });

        this.forceUpdate()
    }

    //sort by rating request, on filter result as well
    //request coming from child: AllMovieList
    sortByRatings() {
        this.state.movieData.sort(function (a, b) {
            if (a.ratings.average > b.ratings.average) {
                return -1;
            }
            if (b.ratings.average > a.ratings.average) {
                return 1;
            }
            return 0;
        });

        this.state.filterResult.sort(function (a, b) {
            if (a.ratings.average > b.ratings.average) {
                return -1;
            }
            if (b.ratings.average > a.ratings.average) {
                return 1;
            }
            return 0;
        });

        this.forceUpdate()
    }

    //handle add to fav request in local state and db 
    //check if not dulicate item request
    //request coming from child: AllMovieList
    addToFav(title, poster, id) {
        var itemToAdd = { id: id, title: title, poster: poster }
        const copyFavs = cloneDeep(this.state.favList);

        if (this.state.favList.length === 0) {
            copyFavs.push({ id: id, title: title, poster: poster })

            //adding item to mongoDB
            AxiosConfig.post('/api/add/favorite/' + this.props.currentUserID, itemToAdd);
        }
        else {
            const found = copyFavs.some(item => {
                return item.title === title
            })

            if (!found) {
                copyFavs.push({ id: id, title: title, poster: poster })

                //adding item to mongoDB
                AxiosConfig.post('/api/add/favorite/' + this.props.currentUserID, itemToAdd);
            }
        }

        this.setState({ favList: copyFavs })
    }

    //handle delete item from fav request
    //request coming from child: FavList
    deleteFavItem(id) {
        const copyFavs = cloneDeep(this.state.favList);
        const remainigItems = copyFavs.filter(item => {
            return item.id !== id
        })

        this.setState({ favList: remainigItems })
        //deleteing fav item from mongoDB
        var itemToDel = { id: id }
        AxiosConfig.post('/api/delete/favorite/' + this.props.currentUserID, itemToDel);
    }

    //geting filter results from filtercontainter
    //request coming from child: FilterContainer
    getFilterResult(result) {
        this.setState({ filterResult: result })
        this.setFilterFLAG();
    }

    //if Filter request coming from child: FilterContainer
    setFilterFLAG() {
        let searchFLAG = false;
        let listAllFLAG = false;
        let filterFLAG = true;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, filterFLAG, viewFLAG, ActorProfileFLAG)
    }

    //dislay all movies request coming from child: filterContainer
    setListAllFLAG() {
        let searchFLAG = false;
        let listAllFLAG = true;
        let FilterFLAG = false;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG)
    }

    //manger for calling different sort methods, request coming from child: AllMovieList
    doSort(e) {
        const value = e.target.value;
        if (value === "sortByTitle") { this.sortByTitle() }
        else if (value === "sortByYear") { this.sortByYear() }
        else if (value === "sortByRating") { this.sortByRatings() }
    }

    //Production result coming from child: CastCrewContainer
    getProduction(production) {
        this.setState({ production: production })
    }

    //Actor Id coming from child: CastCrewContainer
    getActorID(ActorID) {
        this.setState({ ActorID: ActorID })
    }

    handleSignOut() {
        AxiosConfig.get('/logout').then(resp => {
            window.location = "https://hms-mern-backend.herokuapp.com/login"
        })
    }

    render() {
        FN = this.state.userInfo.map(item => item.details.firstname)
        return (
            <div className="mainDiv">
                <Layout style={{ minHeight: '100vh', width: 'auto' }}>
                    <Sider className="sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Link to='/'>
                            <img className="logoOnMain" src={logo} alt="HM's Logo" />
                        </Link>
                        <Menu className="Menu" defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub2"
                                title={
                                    <span className="filterOutlined">
                                        <FilterOutlined />
                                        <span>Filter</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="6" style={{ height: '530px', width: '200px' }}>
                                    <FilterContainter movieData={this.state.movieData} getFilterResult={this.getFilterResult}
                                        setListAllFLAG={this.setListAllFLAG} />
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span className="filterOutlined" >
                                        <UserOutlined />
                                        <span>My Account</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="3" style={{ height: '200px', width: '200px' }}>
                                    {
                                        this.state.userInfo.map((item, index) => {
                                            return <UserInfo key={index} firstName={item.details.firstname} lastName={item.details.lastname}
                                                country={item.details.country} city={item.details.city} thumbnail={item.picture.thumbnail}
                                                dateJoined={item.membership.date_joined} favorites={item.favorites} email={item.email}
                                            />
                                        })
                                    }
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <LogoutOutlined onClick={this.handleSignOut} className="filterOutlined" />
                                <Button onClick={this.handleSignOut} className="signout">Logout</Button>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} >
                            <h1 className="heading2">Hi&nbsp;{FN},&nbsp;&nbsp;WELCOME TO HM's MOVIE COLLECTION</h1>
                            <Menu style={{ backgroundColor: "transparent" }}>
                                <Link to='/'>
                                    <Button className="homeOnMain">Home <i className="fa fa-home"></i></Button>
                                </Link>
                            </Menu>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>
                                    <FavList favList={this.state.favList} deleteFavItem={this.deleteFavItem} />
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                                <AllMovieList isLoading={this.state.isLoading} movieData={this.state.movieData} searchValue={this.props.searchValue}
                                    searchFLAG={this.props.searchFLAG} listAllFLAG={this.props.listAllFLAG}
                                    sortByYear={this.sortByYear} sortByTitle={this.sortByTitle} sortByRatings={this.sortByRatings}
                                    doSort={this.doSort} addToFav={this.addToFav}
                                    filterResult={this.state.filterResult} filterFLAG={this.props.filterFLAG}
                                    viewFLAG={this.props.viewFLAG} ActorProfileFLAG={this.props.ActorProfileFLAG}
                                    getFLAGS={this.props.getFLAGS} getProduction={this.getProduction}
                                    ActorID={this.state.ActorID} />
                                <CastCrewContainer production={this.state.production} viewFLAG={this.props.viewFLAG}
                                    getFLAGS={this.props.getFLAGS} ActorProfileFLAG={this.props.ActorProfileFLAG}
                                    getActorID={this.getActorID} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>HM'S ©2020 Created with MERN FullStack <About /></Footer>
                    </Layout>
                </Layout>
    );
            </div>
        )
    }
}

export default Main
