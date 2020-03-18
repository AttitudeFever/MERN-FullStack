import React from 'react'
import CustomHeader from './grid-components/CustomHeader';
import { Link } from 'react-router-dom';
import logo from '../images/logo2.png';
import About from './aboutus/About';
import AllMovieList from './grid-components/movie-list/AllMovieList';
import FavList from './grid-components/favorite/FavList';
import FilterContainter from './grid-components/filter/FilterContainer';
import UserInfo from './grid-components/UserInfo';
import * as cloneDeep from 'lodash/cloneDeep';
import CastCrewContainer from './grid-components/tabs-cast-crew/CastCrewContainer';
import Axios from 'axios';
import { Layout, Menu, Breadcrumb, Button, Badge  } from 'antd';
import {
    LogoutOutlined,
    FilterOutlined,
    UserOutlined,
  } from '@ant-design/icons';
// import  '../static/antd.css';
import 'antd/dist/antd.css';
import '../static/responsive.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

//This is the main class container, that is the manager to what should be displayed upon different button clicks
//Parent of this class is: App
//This class has 5 child components: Header, FavList, FilterContainer, AllMovieList and CastCrewContainer

const LOCAL_STORAGE_KEY = 'movieData';
const LOCAL_STORAGE_KEY_2 = 'favList';
let FN;
class Main extends React.Component {
    constructor(){
        super()
        this.state={
            collapsed: false,
            isLoading:false,
            movieData : [],
            favList:[],
            filterResult:[],
            production : [],
            ActorID:0,
            userInfo:[],
        }
        this.storeMainAPILocally = this.storeMainAPILocally.bind(this);
        this.storeFavListLocally = this.storeFavListLocally.bind(this);
        this.intialSortBytitle = this.intialSortBytitle.bind(this);
        this.sortByYear = this.sortByYear.bind(this);
        this.sortByTitle = this.sortByTitle.bind(this);
        this.sortByRatings = this.sortByRatings.bind(this);
        this.addToFav= this.addToFav.bind(this);
        this.deleteFavItem=this.deleteFavItem.bind(this)
        this.getFilterResult = this.getFilterResult.bind(this);
        this.setFilterFLAG = this.setFilterFLAG.bind(this);
        this.setListAllFLAG = this.setListAllFLAG.bind(this);
        this.doSort = this.doSort.bind(this);
        this.getProduction=this.getProduction.bind(this);
        this.getActorID = this.getActorID.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    //When componet first formed
    componentDidMount(){
        this.setState( {isLoading : true } )
        this.storeMainAPILocally();
        this.storeFavListLocally();
        this.getUserInfo();
    }

    getUserInfo(){
        Axios.get('/api/users/'+this.props.currentUserID).then(resp=>{
            this.setState({userInfo:resp.data})
        })
    }
    //when refresh button is hit
    componentDidUpdate(){
        localStorage.setItem(LOCAL_STORAGE_KEY_2, JSON.stringify(this.state.favList));
    }

    //fetch api and and use local storage 
    storeMainAPILocally() {
        let storedItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if (storedItemList) {
            this.intialSortBytitle(storedItemList);
            this.setState( {isLoading : false } )
        }
        else {
            try {
                Axios.get('/api/movies').then(resp => {
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

    //store favlist into local storage
    storeFavListLocally() {
        let storedItemList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));

        if (storedItemList) {

            this.setState({ favList: storedItemList })

        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_2, JSON.stringify(this.state.favList));
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

        this.setState( {movieData: storedItemList } );
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

    //handle add to fav request
    //request coming from child: AllMovieList
    addToFav(title, poster, id) {
        const copyFavs = cloneDeep(this.state.favList);

        if (this.state.favList.length === 0) {
            copyFavs.push({ id: id, title: title, poster: poster })
        }
        else {
            const found = copyFavs.some(item => {
                return item.title === title
            })

            if (!found) {
                copyFavs.push({ id: id, title: title, poster: poster })
            }
        }

        this.setState({ favList: copyFavs })
    }

    //handle delete item from fav request
    //request coming from child: FavList
    deleteFavItem(id){
        const copyFavs = cloneDeep(this.state.favList);
        const remainigItems = copyFavs.filter(item => {
            return item.id !== id
        })

        this.setState({ favList: remainigItems })
    }

    //geting filter results from filtercontainter
    //request coming from child: FilterContainer
    getFilterResult(result){
        this.setState( {filterResult : result} ) 
        this.setFilterFLAG();       
    }

    //if Filter request coming from child: FilterContainer
    setFilterFLAG(){
        let searchFLAG = false;
        let listAllFLAG = false;
        let filterFLAG = true;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, filterFLAG, viewFLAG, ActorProfileFLAG) 
    }

    //dislay all movies request coming from child: filterContainer
    setListAllFLAG(){
        let searchFLAG = false;
        let listAllFLAG = true;
        let FilterFLAG = false;
        let viewFLAG = false;
        let ActorProfileFLAG = false;
        this.props.getFLAGS(searchFLAG, listAllFLAG, FilterFLAG, viewFLAG, ActorProfileFLAG) 
    }

    //manger for calling different sort methods, request coming from child: AllMovieList
    doSort(e){
        const value = e.target.value;
        if (value === "sortByTitle") {this.sortByTitle()}
        else if(value === "sortByYear") {this.sortByYear()}
        else if (value === "sortByRating") {this.sortByRatings()}
    }

    //Production result coming from child: CastCrewContainer
    getProduction(production){
        this.setState({production : production})
    }

    //Actor Id coming from child: CastCrewContainer
    getActorID(ActorID){
        this.setState( {ActorID : ActorID} )
    }

    handleSignOut(){
        Axios.get('/logout').then(resp=>{
            window.location = "http://localhost:8080/login"
        })
    }

    render() {
        {FN = this.state.userInfo.map(item => item.details.firstname)}
        return (
            <div className="mainDiv">
                {/* <Header /> */}

                {/* <FavList favList={this.state.favList} deleteFavItem={this.deleteFavItem} />

                <FilterContainter movieData={this.state.movieData} getFilterResult={this.getFilterResult}
                    setListAllFLAG={this.setListAllFLAG} />
                
                <CastCrewContainer production={this.state.production} viewFLAG={this.props.viewFLAG} getFLAGS={this.props.getFLAGS} ActorProfileFLAG={this.props.ActorProfileFLAG} getActorID={this.getActorID}/>

                <AllMovieList isLoading={this.state.isLoading} movieData={this.state.movieData} searchValue={this.props.searchValue}
                    searchFLAG={this.props.searchFLAG} listAllFLAG={this.props.listAllFLAG}
                    sortByYear={this.sortByYear} sortByTitle={this.sortByTitle} sortByRatings={this.sortByRatings}
                    doSort={this.doSort} addToFav={this.addToFav}
                    filterResult={this.state.filterResult} filterFLAG={this.props.filterFLAG} 
                    viewFLAG={this.props.viewFLAG} ActorProfileFLAG={this.props.ActorProfileFLAG} 
                    getFLAGS={this.props.getFLAGS} getProduction={this.getProduction}
                    ActorID={this.state.ActorID}/> */}


                {/* <Layout className="layoutHead">
                    <Header className="HeaderOuter">
                        <CustomHeader/>
                    </Header>
                    <Layout className="LayoutBody">
                        <Sider className="sider" width={400}>
                            <FilterContainter movieData={this.state.movieData} getFilterResult={this.getFilterResult}
                            setListAllFLAG={this.setListAllFLAG} />
                        </Sider>
                        <Content className="content">
                            <AllMovieList isLoading={this.state.isLoading} movieData={this.state.movieData} searchValue={this.props.searchValue}
                                    searchFLAG={this.props.searchFLAG} listAllFLAG={this.props.listAllFLAG}
                                    sortByYear={this.sortByYear} sortByTitle={this.sortByTitle} sortByRatings={this.sortByRatings}
                                    doSort={this.doSort} addToFav={this.addToFav}
                                    filterResult={this.state.filterResult} filterFLAG={this.props.filterFLAG} 
                                    viewFLAG={this.props.viewFLAG} ActorProfileFLAG={this.props.ActorProfileFLAG} 
                                    getFLAGS={this.props.getFLAGS} getProduction={this.getProduction}
                                    ActorID={this.state.ActorID}/> 
                        </Content>
                    </Layout>
                </Layout> */}

                <Layout style={{ minHeight: '100vh', width:'auto' }}>
                    <Sider className="sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Link to='/'>
                            <img className="logoOnMain" src={logo} alt="HM's Logo" />
                        </Link>
                        <Menu defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
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
                            {/* <Menu.Item key="2">
                                <DesktopOutlined />
                                <span>Option 2</span>
                            </Menu.Item> */}
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
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
                                        /> })
                                    }
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
                                <LogoutOutlined onClick={this.handleSignOut}/>
                                <Button onClick={this.handleSignOut}>Sign Out</Button>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} >
                            
                                <h1 className="heading2">Hi&nbsp;{FN},&nbsp;&nbsp;WELCOME TO HM's MOVIE COLLECTION</h1>
                            <div className="buttonPackOnMain">
                                <Link to='/'>
                                    <Button className="homeOnMain">Home <i className="fa fa-home"></i></Button>
                                </Link>
                                <About className="AboutonMain"/>
                            </div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {/* <div>
                                    <Badge count={5}>
                                        <div className="fav-badge" />
                                    </Badge>
                                </div> */}
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
                                    <CastCrewContainer production={this.state.production} viewFLAG={this.props.viewFLAG} getFLAGS={this.props.getFLAGS} ActorProfileFLAG={this.props.ActorProfileFLAG} getActorID={this.getActorID}/>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
    );
            </div>
        )
    }
}

export default Main
