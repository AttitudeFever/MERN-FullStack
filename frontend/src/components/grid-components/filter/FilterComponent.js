import React from 'react'

//This component has only one parent: Main
//This component has only one child: FilterComponent
//This is responsible to create a Controlled Form 
function FilterComponent(props) {
    return (
        <div className="filter" id="filter">            
            <form id="form">
                <input type="radio"
                    className="option-input radio"
                    name="titleSearchRadioName"
                    value="betweenTitleRadioValue"
                    checked={props.betweenTitleRadio}
                    onChange={props.handleChange}
                /> <label>Filter by Title</label>
                <br/>
                <input type="text" placeholder="Key Word"
                    name="titleSearch"
                    value={props.titleSearch}
                    id="titleSearchBox"
                    onChange={props.handleChange} 
                    disabled/>
                <br />
                <div className="yearBox">
                    <input type="radio"
                        className="option-input radio"
                        name="dateSearch"
                        value="betweenYear"
                        checked={props.betweenYearRadio}
                        onChange={props.handleChange}
                    /> <label>Filter by Year</label>
                    <br/>
                    <label>Between:</label> &nbsp;
                        <input type="number" min="1900" max="2020" id="betweenStartingYearSearch" name="betweenStartingYearSearch" onChange={props.handleChange} value={props.betweenStartYear} disabled />
                    <br/>                    
                    <label>And</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                        <input type="number" min="1900" max="2020" id="betweenEndingYearSearch" name="betweenEndingYearSearch" onChange={props.handleChange} value={props.betweenEndYear} disabled />
                </div>
                <div className="ratingBox">
                    <input type="radio"
                        className="option-input radio"
                        name="ratingSearch"
                        value="betweenRatings"
                        checked={props.betweenRatingRadio}
                        onChange={props.handleChange}
                    /> <label>Filter By Ratings</label>
                    <br/>
                    <label>Between: {props.betweenStartSlider}&nbsp;<input type="range" min="1" max="10" name="betweenStartRating" value={props.betweenStartSlider} onChange={props.handleChange} className="slider" id="betweenStartRating" disabled></input></label>
                    <br/>
                    <label>And: {props.betweenEndSlider}&nbsp;<input type="range" min="1" max="10" name="betweenEndRating" value={props.betweenEndSlider} onChange={props.handleChange} className="slider" id="betweenEndRating" disabled></input></label>
                    <br/>
                </div>
                <div className="actionButtons">
                    <button className="search" onClick={props.handleSubmit}>Search</button>
                    <button className="clear" onClick={props.handleClear}>Clear</button>
                </div>
            </form>

        </div>
    )
}

export default FilterComponent
