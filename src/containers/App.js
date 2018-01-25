import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);

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
        { this.state.searchMode ?
          <div>Details needed</div>
            : <div>test</div>
        }
      </div>
    );
  }
}

export default App;

//          <Header onSearch={this.onSearch}/>
//          <Details itemID={this.itemID}/>