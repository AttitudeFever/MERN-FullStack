import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import Main from './components/Main'
import Axios from 'axios';
import AxiosConfig from './components/utils/AxiosConfig.js'

//This class is responsile to handle Search and diplay FLAGS
//Has 2 child compoments Home and Main
//Parent of this class is Index
class App extends React.Component {
    constructor(){
        super()
        this.state={
            searchValue : "",
            searchFLAG:false,
            listAllFLAG:false,
            filterFLAG:false,
            viewFLAG:false,
            ActorProfileFLAG:false,
            currentUserID:0
        }
        this.getSearchValue = this.getSearchValue.bind(this);
        this.getFLAGS = this.getFLAGS.bind(this);
    }

    //search value coming from child component: home
    getSearchValue(searchValue){
        this.setState( {searchValue : searchValue} )
    }

    //FLAGS coming from child components: Home and Main
    getFLAGS(searchFLAG, listAllFLAG, filterFLAG, viewFLAG, ActorProfileFLAG){
        this.setState( {searchFLAG : searchFLAG, listAllFLAG : listAllFLAG, filterFLAG : filterFLAG, viewFLAG: viewFLAG, ActorProfileFLAG: ActorProfileFLAG} );
    }

    componentDidMount() {
        AxiosConfig.get('/api/userID').then(resp => {
            this.setState({ currentUserID: resp.data }, () => {
                console.log(this.state.currentUserID)
            })
        })
    }

    //Rounting is set for SPA
    render(){
        return (
            <main id="main">
                <Switch>
                    <Route path="/" exact render={(props) => <Home getSearchValue={this.getSearchValue} getFLAGS={this.getFLAGS} />} />

                    <Route path="/main" exact render={(props) => <Main searchValue={this.state.searchValue}
                        searchFLAG={this.state.searchFLAG} listAllFLAG={this.state.listAllFLAG}
                        filterFLAG={this.state.filterFLAG} viewFLAG={this.state.viewFLAG}
                        ActorProfileFLAG={this.state.ActorProfileFLAG} getFLAGS={this.getFLAGS}
                        currentUserID={this.state.currentUserID} />} />

                </Switch>
            </main>
        )
    }
}

export default App










