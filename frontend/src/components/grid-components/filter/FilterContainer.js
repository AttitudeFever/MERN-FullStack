import React from 'react'
import FilterComponent from './FilterComponent'

//This class has only one parent: FilterContainer
//this is responsible to provide filter data/result

const INITALSTATE = {
    titleSearch : "",
    beforeRadio:true,
    afterRadio:false,
    betweenRadio:false,
    beforeYear:"2020",
    afterYear:"1900",
    betweenStartYear:"1900",
    betweenEndYear:"2020",
    belowRadio:true,
    aboveRadio:false,
    betweenRatingRadio:false,
    belowSlider:10,
    aboveSlider:1,
    betweenStartSlider:1,
    betweenEndSlider:10
}
class FilterContainer extends React.Component {
    constructor(){
        super()
        this.state=INITALSTATE;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.filterPopup = this.filterPopup.bind(this);
    }

//handle change on Form Elements
    handleChange(e){
        const {name, value} = e.target;
        const beforeYearSearch = document.getElementById("beforeYearSearch");
        const afterYearSearch = document.getElementById("afterYearSearch");
        const betweenStartingYearSearch = document.getElementById("betweenStartingYearSearch");
        const betweenEndingYearSearch = document.getElementById("betweenEndingYearSearch");
        const belowRating = document.getElementById("belowRating");
        const aboveRating = document.getElementById("aboveRating");
        const betweenStartRating = document.getElementById("betweenStartRating");
        const betweenEndRating = document.getElementById("betweenEndRating");

        if (name === "titleSearch")
        {
            this.setState( {titleSearch : value} )
        }

        if (value === "before") {
            this.setState( {beforeRadio : true, afterRadio : false, betweenRadio : false} )       
            beforeYearSearch.disabled= false;
            afterYearSearch.disabled= true;
            betweenStartingYearSearch.disabled= true;
            betweenEndingYearSearch.disabled= true;
        }

        if (value === "after") {
            this.setState( {beforeRadio : false, afterRadio : true, betweenRadio : false} )
            beforeYearSearch.disabled= true;
            afterYearSearch.disabled= false;
            betweenStartingYearSearch.disabled= true;
            betweenEndingYearSearch.disabled= true;
        }

        if (value === "between") {
            this.setState( {beforeRadio : false, afterRadio : false, betweenRadio : true} )
            beforeYearSearch.disabled= true;
            afterYearSearch.disabled= true;
            betweenStartingYearSearch.disabled= false;
            betweenEndingYearSearch.disabled= false;
        }

        if(name === "beforeYearSearch") {
            this.setState( {beforeYear : value} )
        }

        if(name === "afterYearSearch") {
            this.setState( {afterYear : value} )
        }

        if(name === "betweenStartingYearSearch") {
            this.setState( {betweenStartYear : value} )
        }

        if(name === "betweenEndingYearSearch") {
            this.setState( {betweenEndYear : value} )
        }

        if (value==="below"){
            this.setState( {belowRadio : true, aboveRadio : false, betweenRatingRadio : false} )
            belowRating.disabled=false;
            aboveRating.disabled=true;
            betweenStartRating.disabled=true;
            betweenEndRating.disabled=true;
        }

        if (value==="above"){
            this.setState( {belowRadio : false, aboveRadio : true, betweenRatingRadio : false} )  
            belowRating.disabled=true;
            aboveRating.disabled=false;
            betweenStartRating.disabled=true;
            betweenEndRating.disabled=true;
        }

        if (value==="betweenRatings"){
            this.setState( {belowRadio : false, aboveRadio : false, betweenRatingRadio : true} )  
            belowRating.disabled=true;
            aboveRating.disabled=true;
            betweenStartRating.disabled=false;
            betweenEndRating.disabled=false;
        }

        if (name==="belowRating"){
            this.setState( {belowSlider : value} )
        }

        if (name==="aboveRating"){
            this.setState( {aboveSlider : value} )
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

        let filteredByDate;
        let filteredByRating;

        const foundTitle = this.props.movieData.filter(item => {
            return item.title.toUpperCase().includes(this.state.titleSearch.toUpperCase())
        })

        if (this.state.beforeRadio) {
            filteredByDate = foundTitle.filter(item => {
                return item.release_date < this.state.beforeYear
            })
        }
        else if (this.state.afterRadio) {
            filteredByDate = foundTitle.filter(item => {
                return item.release_date > this.state.afterYear
            })
        }
        else if (this.state.betweenRadio){
            filteredByDate = foundTitle.filter(item => {
                return item.release_date >= this.state.betweenStartYear && item.release_date <= this.state.betweenEndYear
            })
        }

        if (this.state.belowRadio){
            filteredByRating = filteredByDate.filter(item => {
                return item.ratings.average < this.state.belowSlider
            })
        }
        else if (this.state.aboveRadio){
            filteredByRating = filteredByDate.filter(item => {
                return item.ratings.average > this.state.aboveSlider
            })
        }
        else if (this.state.betweenRatingRadio){
            filteredByRating = filteredByDate.filter(item => {
                return item.ratings.average >= this.state.betweenStartSlider && item.ratings.average <= this.state.betweenEndSlider 
            })
        }

        this.props.getFilterResult(filteredByRating)
    }

    //handle clear request
    handleClear(e){
        const beforeYearSearch = document.getElementById("beforeYearSearch");
        const afterYearSearch = document.getElementById("afterYearSearch");
        const betweenStartingYearSearch = document.getElementById("betweenStartingYearSearch");
        const betweenEndingYearSearch = document.getElementById("betweenEndingYearSearch");
        const belowRating = document.getElementById("belowRating");
        const aboveRating = document.getElementById("aboveRating");
        const betweenStartRating = document.getElementById("betweenStartRating");
        const betweenEndRating = document.getElementById("betweenEndRating");

        e.preventDefault();
        this.props.setListAllFLAG();
        this.setState(INITALSTATE);

        beforeYearSearch.disabled= false;
        afterYearSearch.disabled= true;
        betweenStartingYearSearch.disabled= true;
        betweenEndingYearSearch.disabled= true;
        belowRating.disabled=false;
        aboveRating.disabled=true;
        betweenStartRating.disabled=true;
        betweenEndRating.disabled=true;
    }

    //handle request on expand and shrink filter area
    filterPopup(){
        const btnFilter = document.querySelector('#btnFilter');
        const filter =document.querySelector('#filter');
        const form =document.querySelector('#form');

        if(btnFilter.textContent === "Filter") {
            btnFilter.innerHTML = "Close<i class='fa fa-close'></i>";
            filter.style.width = 410+"px";
            filter.style.height = 550+"px";
            form.style.opacity =1;
        }

        else if(btnFilter.textContent === "Close"){
            btnFilter.innerHTML = "Filter<i class='fa fa-filter'></i>";
            filter.style.width = 100+"px";
            filter.style.height = 45+"px";
            form.style.opacity =0;
        }
    }

    render() {
        return (
            <FilterComponent titleSearch={this.state.titleSearch} handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} beforeRadio={this.state.beforeRadio} afterRadio={this.state.afterRadio}
            betweenRadio={this.state.betweenRadio} beforeYear={this.state.beforeYear} afterYear={this.state.afterYear}
            betweenStartYear={this.state.betweenStartYear} betweenEndYear={this.state.betweenEndYear}
            belowRadio={this.state.belowRadio} aboveRadio={this.state.aboveRadio} 
            betweenRatingRadio={this.state.betweenRatingRadio} belowSlider={this.state.belowSlider} 
            aboveSlider={this.state.aboveSlider} betweenStartSlider={this.state.betweenStartSlider}
            betweenEndSlider={this.state.betweenEndSlider} handleClear={this.handleClear}
            filterPopup={this.filterPopup}/>
        )
    }
}

export default FilterContainer
