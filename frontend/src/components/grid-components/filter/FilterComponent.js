import React from 'react'

//This component has only one parent: Main
//This component has only one child: FilterComponent
//This is responsible to create a Controlled Form 
function FilterComponent(props) {
    return (
        <div className="filter" id="filter">
            <button id="btnFilter" onClick={props.filterPopup}>Filter<i className="fa fa-filter"></i></button>
            
            <form id="form">
            <h1>Title</h1>
                <input type="text" placeholder="Key Word"
                    name="titleSearch"
                    value={props.titleSearch}
                    onChange={props.handleChange} />
                <br />
                <div className="yearBox">
                    <label>Year</label>
                    <br />
                    <input type="radio"
                        className="option-input radio"
                        name="dateSearch"
                        value="before"
                        checked={props.beforeRadio}
                        onChange={props.handleChange}
                    /> <label>Before:</label> &nbsp;
                        <input type="number" min="1900" max="2020" id="beforeYearSearch" name="beforeYearSearch" onChange={props.handleChange} value={props.beforeYear} />
                    &nbsp;
                <input type="radio"
                        className="option-input radio"
                        name="dateSearch"
                        value="after"
                        checked={props.afterRadio}
                        onChange={props.handleChange}
                    /> <label>After:</label> &nbsp;
                        <input type="number" min="1900" max="2020" id="afterYearSearch" name="afterYearSearch" onChange={props.handleChange} value={props.afterYear} disabled />
                    <br />
                    <br />
                    <input type="radio"
                        className="option-input radio"
                        name="dateSearch"
                        value="between"
                        checked={props.betweenRadio}
                        onChange={props.handleChange}
                    /> <label>Between:</label> &nbsp;
                        <input type="number" min="1900" max="2020" id="betweenStartingYearSearch" name="betweenStartingYearSearch" onChange={props.handleChange} value={props.betweenStartYear} disabled />
                    &nbsp;&nbsp;&nbsp;&nbsp;<label>And</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="number" min="1900" max="2020" id="betweenEndingYearSearch" name="betweenEndingYearSearch" onChange={props.handleChange} value={props.betweenEndYear} disabled />
                </div>
                <br />
                <div className="ratingBox">
                <label>Ratings</label>
                <br />
                <input type="radio"
                    className="option-input radio"
                    name="ratingSearch"
                    value="below"
                    checked={props.belowRadio}
                    onChange={props.handleChange}
                /> <label>Below: {props.belowSlider}</label>
                &nbsp;&nbsp;
                <input type="range" min="1" max="10" name="belowRating" value={props.belowSlider} onChange={props.handleChange} className="slider" id="belowRating"></input>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <br/>
                    <input type="radio"
                        className="option-input radio"
                        name="ratingSearch"
                        value="above"
                        checked={props.aboveRadio}
                        onChange={props.handleChange}
                    /><label>Above: {props.aboveSlider}</label>
                    &nbsp;&nbsp;
                        <input type="range" min="1" max="10" name="aboveRating" value={props.aboveSlider} onChange={props.handleChange} className="slider" id="aboveRating" disabled></input>
                    <br/>
                    <input type="radio"
                        className="option-input radio"
                        name="ratingSearch"
                        value="betweenRatings"
                        checked={props.betweenRatingRadio}
                        onChange={props.handleChange}
                    /> <label>Between: {props.betweenStartSlider} And {props.betweenEndSlider}</label>&nbsp;
                        <input type="range" min="1" max="10" name="betweenStartRating" value={props.betweenStartSlider} onChange={props.handleChange} className="slider" id="betweenStartRating" disabled></input>
                    &nbsp;&nbsp;
                        <input type="range" min="1" max="10" name="betweenEndRating" value={props.betweenEndSlider} onChange={props.handleChange} className="slider" id="betweenEndRating" disabled></input>
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
