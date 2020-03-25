import React from 'react'
import FilterComponent from './FilterComponent'
//import Axios from 'axios';
import AxiosConfig from '../../utils/AxiosConfig'

//This class has only one parent: FilterContainer
//this is responsible to provide filter data/result

const INITALSTATE = {
    betweenTitleRadio:false,
    titleSearch : "",
    betweenYearRadio:false,
    betweenStartYear:"1900",
    betweenEndYear:"2020",
    betweenRatingRadio:false,
    betweenStartSlider:1,
    betweenEndSlider:10,
    foundTitle:[],
    foundYear:[],
    foundRating:[]
}
class FilterContainer extends React.Component {
    constructor(){
        super()
        this.state=INITALSTATE;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

//handle change on Form Elements
    handleChange(e){
        const {name, value} = e.target;
        const titleSearchBox = document.getElementById("titleSearchBox");
        const betweenStartingYearSearch = document.getElementById("betweenStartingYearSearch");
        const betweenEndingYearSearch = document.getElementById("betweenEndingYearSearch");
        const betweenStartRating = document.getElementById("betweenStartRating");
        const betweenEndRating = document.getElementById("betweenEndRating");

        if (value === "betweenTitleRadioValue") {
            this.setState( {betweenTitleRadio: true, betweenYearRadio : false, betweenRatingRadio: false} )
            titleSearchBox.disabled = false;
            betweenStartingYearSearch.disabled= true;
            betweenEndingYearSearch.disabled= true;
            betweenStartRating.disabled = true;
            betweenEndRating.disabled = true;
        }

        if (name === "titleSearch")
        {
            this.setState( {titleSearch : value} )
        }

        if (value === "betweenYear") {
            this.setState( {betweenTitleRadio: false, betweenYearRadio : true, betweenRatingRadio: false} )
            titleSearchBox.disabled = true;
            betweenStartingYearSearch.disabled= false;
            betweenEndingYearSearch.disabled= false;
            betweenStartRating.disabled = true;
            betweenEndRating.disabled = true;
        }

        if(name === "betweenStartingYearSearch") {
            this.setState( {betweenStartYear : value} )
        }

        if(name === "betweenEndingYearSearch") {
            this.setState( {betweenEndYear : value} )
        }

        if (value==="betweenRatings"){
            this.setState( {betweenTitleRadio: false, betweenYearRadio : false, betweenRatingRadio: true} )
            titleSearchBox.disabled = true;  
            betweenStartingYearSearch.disabled= true;
            betweenEndingYearSearch.disabled= true;
            betweenStartRating.disabled=false;
            betweenEndRating.disabled=false;
        }

        if (name==="betweenStartRating"){
            this.setState( {betweenStartSlider : value} )
        }

        if (name==="betweenEndRating"){
            this.setState( {betweenEndSlider : value} )
        }

    }

    //handle submit on From and provide filtered result
    handleSubmit(e) {
        e.preventDefault();

        AxiosConfig.get('/api/find/title/' + this.state.titleSearch).then(resp => {
            this.setState({ foundTitle: resp.data }, () => {
                this.props.getFilterResult(this.state.foundTitle)
            })
        })

        if (this.state.betweenYearRadio){
            AxiosConfig.get('api/find/year/' + this.state.betweenStartYear + "/"+ this.state.betweenEndYear).then(resp => {
                this.setState({ foundYear: resp.data }, ()=>{
                    this.props.getFilterResult(this.state.foundYear)
                })
            })
        }

        if (this.state.betweenRatingRadio){
            AxiosConfig.get('api/find/rating/' + this.state.betweenStartSlider  + "/"+ this.state.betweenEndSlider).then(resp => {
                this.setState({ foundRating: resp.data }, ()=>{
                    this.props.getFilterResult(this.state.foundRating)
                })
            })
        }
    }

    //handle clear request
    handleClear(e){
        const titleSearchBox = document.getElementById("titleSearchBox");
        const betweenStartingYearSearch = document.getElementById("betweenStartingYearSearch");
        const betweenEndingYearSearch = document.getElementById("betweenEndingYearSearch");
        const betweenStartRating = document.getElementById("betweenStartRating");
        const betweenEndRating = document.getElementById("betweenEndRating");

        e.preventDefault();
        this.props.setListAllFLAG();
        this.setState(INITALSTATE);

        titleSearchBox.disabled=true;
        betweenStartingYearSearch.disabled= true;
        betweenEndingYearSearch.disabled= true;
        betweenStartRating.disabled=true;
        betweenEndRating.disabled=true;
    }
    
    render() {
        return (
            <FilterComponent titleSearch={this.state.titleSearch} handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} betweenTitleRadio={this.state.betweenTitleRadio}
            betweenYearRadio={this.state.betweenYearRadio}
            betweenStartYear={this.state.betweenStartYear} betweenEndYear={this.state.betweenEndYear}
            betweenRatingRadio={this.state.betweenRatingRadio}
            betweenStartSlider={this.state.betweenStartSlider}
            betweenEndSlider={this.state.betweenEndSlider} handleClear={this.handleClear}/>
        )
    }
}

export default FilterContainer
