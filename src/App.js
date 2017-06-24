import React, { Component } from 'react';
import Editor             from "./components/YourComponent/Editor"

import './App.css';
import {Container, Header, Image} from 'semantic-ui-react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  render() {
    return (
      <div className="App">
      <Header textAlign="center" style={{ marginTop: 50 }}>Le staff</Header>
      <Header textAlign="center">
        <Image src="/jimmy.png" shape="circular"/>
        <Image src="/logoNoir.png" shape="circular"/>
        <Image src="/txm.png" shape="circular"/>
      </Header>
        <Container>
          <Editor />
        </Container>
      </div>
    );
  }
}

export default App;
