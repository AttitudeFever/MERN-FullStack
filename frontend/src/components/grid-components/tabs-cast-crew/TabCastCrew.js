import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import Cast from './Cast';
import Crew from './Crew';

//this class has only one parent: CastCrewContainer
//this class has two child components: Cast and Crew
//this is resonsible to render Cast Crew Components by using resubale "react-tab" component
let renderThisCast;
let renderThisCrew;
class TabCastCrew extends React.Component {
    constructor() {
        super()
        this.state = {
        }
        this.conditionRendering = this.conditionRendering.bind(this);
    }

    //handle if any null, undefined, "", clean Regex and display number of items with Algorithm
    conditionRendering(){
        if (this.props.cast !== undefined && this.props.cast[0].name !== "Not Found"){
            renderThisCast = this.props.cast.map( (item, index)=>{
                return <Cast key={index} id={item.id} character={item.character} name={item.name} 
                            getFLAGS={this.props.getFLAGS} getActorID={this.props.getActorID} />
            })
        }else{
            renderThisCast = <p>No Cast Info Found</p>
        }

        if (this.props.crew !== undefined && this.props.crew[0].name !== "Not Found"){
            renderThisCrew = this.props.crew.map( (item, index)=>{
                return <Crew key={index} department={item.department} job={item.job} name={item.name} />
            })
        }else{
            renderThisCrew = <p>No Crew Info Found</p>
        }
    }

    render() {
        this.conditionRendering();
        return (
            //create reusable Tabs compoents
            <Tabs className="tabcastcrew" defaultIndex={0} > 
                <TabList>
                    <Tab >Movie Cast</Tab>
                    <Tab>Movie Crew</Tab>
                </TabList>

                <TabPanel>
                    {
                        renderThisCast
                    }
                </TabPanel>
                <TabPanel>
                    {
                        renderThisCrew
                    }
                </TabPanel>
            </Tabs>
        )
    }
}

export default TabCastCrew
