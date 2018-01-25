import React, { Component } from 'react';

import Header from './Header/Header';
import Search from './Search/Search';
import Details from './Details/Details';

class App extends Component {
  constructor(props){
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    // keeping initial state simple
    this.state = {
      searchTerm : "",
      itemID : "",
      searchMode : true
    }
  }

  onSearch(term){
    this.setState({
      searchMode : true,
      searchTerm : term
    });
    // sets search
  }
  
  onItemClick(itemID){
    this.setState({
      searchMode : false,
      itemID : itemID
    });
    // sets item ID
  }

  render() {
    return (
      <div className="App">
        <Header onSearch={this.onSearch}/>
        { this.state.searchMode ?
          <Search onItemClick={this.onItemClick} searchTerm={this.state.searchTerm}/>
            : <Details onItemClick={this.onItemClick} itemID={this.state.itemID}/>
        }
      </div>
    );
  }
}

export default App;