import React, { Component } from 'react';
import Editor             from "./components/Epreuve2/Editor"

import './App.css';
import { Header, Image, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import autoBind                     from "react-autobind"

class App extends Component {
  constructor(props){
    super(props);
    autoBind(this)
    this.state = {
      loading: true,
      content: null
    }
  }

  componentDidMount(){
      this.setState({ loading: false })
  }

  getContent({content}){
    this.setState({content})
  }

  render() {

    const { content } = this.state
    return (
      <div className="App">
      <Header textAlign="center" style={{ marginTop: 50 }}>Le staff</Header>
      <Header textAlign="center">
        <Image src="/jimmy.png" shape="circular"/>
        <Image src="/logoNoir.png" shape="circular"/>
        <Image src="/txm.png" shape="circular"/>
      </Header>

      <Grid>
        <Grid.Column width={8}>
          <Editor getContent={ this.getContent } />
        </Grid.Column>
        <Grid.Column width={8}>
          <div dangerouslySetInnerHTML={{ __html: content}}></div>
        </Grid.Column>
      </Grid>
        
          
        
      </div>
    );
  }
}

export default App;
