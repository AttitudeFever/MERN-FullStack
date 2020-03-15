import React from 'react'
import Header from './grid-components/Header';
import AllMovieList from './grid-components/movie-list/AllMovieList';
import FavList from './grid-components/favorite/FavList';
import FilterContainter from './grid-components/filter/FilterContainer';
import * as cloneDeep from 'lodash/cloneDeep';
import CastCrewContainer from './grid-components/tabs-cast-crew/CastCrewContainer';
import Axios from 'axios';

//This is the main class container, that is the manager to what should be displayed upon different button clicks
//Parent of this class is: App
//This class has 5 child components: Header, FavList, FilterContainer, AllMovieList and CastCrewContainer

const LOCAL_STORAGE_KEY = 'movieData';
const LOCAL_STORAGE_KEY_2 = 'favList';
class Main extends React.Component {
    constructor(){
        super()
        this.state={
            isLoading:false,
            movieData : [],
            favList:[],
            filterResult:[],
            production : [],
            ActorID:0
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
    }

    //When componet first formed
    componentDidMount(){
        this.setState( {isLoading : true } )
        this.storeMainAPILocally();
        this.storeFavListLocally();
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

    render() {
        return (
            <div className="grid-container">
                <Header />

                <FavList favList={this.state.favList} deleteFavItem={this.deleteFavItem} />

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
                    ActorID={this.state.ActorID}/>
            </div>
        )
    }
}

export default Main
