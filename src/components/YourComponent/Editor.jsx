import React, { Component } from 'react';
import { Wysiwyg, ConvertToHTML } from "./lib/Wysiwyg";

export default class Editor extends Component {

  constructor(){
    super()
    this.state = {
      content: null
    }
  }

  updateValue(content){
    this.setState({content})
    console.log(content)
  }

  render() {

    const { content } = this.state

    return (
      <div>
      <Wysiwyg
        onChange={this.updateValue.bind(this)}
        value={content}
      />

      <ConvertToHTML
        html={content}
      />
      </div>
    );
  }
}