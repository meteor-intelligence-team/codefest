import React, { Component } from 'react';
import autoBind                     from "react-autobind"
import TinyMCE                      from 'react-tinymce';
import {flatener}                   from "./lib/flatener" 
import {
  Button, 
  Dimmer, 
  Loader
}                           from 'semantic-ui-react'

export default class Editor extends Component {

    constructor(props){
        super(props)
        autoBind(this)
        this.state = {
            content: null
        }
    }

    handleEditorChange(e) {
        const content = e.target.getContent()
        const flatenedContent = flatener({content})
        this.props.getContent(flatenedContent)
        console.log(e, flatenedContent)
        this.setState({content: flatenedContent.content})
    }

    formatSrc(){
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500);
    }


    render() {

        const { content, loading } = this.state

        if(loading){
            return(
                <Dimmer active style={{ position: "absolute" }}>
                    <Loader/>
                </Dimmer>
            )
        }

        return (
        <div>
            <TinyMCE
                content={this.state.content || ""}
                config={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'lists image charmap print preview anchor',
                        'searchreplace visualblocks fullscreen',
                        'paste'
                        ],
                    block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
                    removeformat: [
                        {selector: 'a,b,strong,em,i,font,u,strike,div,td,th,table,br,span', remove : 'all', split : true, expand : false, block_expand: true, deep : true},
                        {selector: '*', attributes : ['style', 'class'], remove : 'all', split : false, expand : false, deep : true}
                    ],
                    toolbar: 'undo redo | styleselect | bullist numlist | image',
                    //textcolor_map: textcolors,
                    content_css: [
                        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                        '//www.tinymce.com/css/codepen.min.css'
                    ],
                      style_formats: [
                            {title: 'Headers', items: [
                            {title: 'Header 1', format: 'h1'},
                            {title: 'Header 2', format: 'h2'},
                            {title: 'Header 3', format: 'h3'},
                            {title: 'Header 4', format: 'h4'},
                            {title: 'Header 5', format: 'h5'},
                            {title: 'Header 6', format: 'h6'}
                        ]}
                    ]
                }}
                onChange={this.handleEditorChange}
            />

            <Button onClick={ this.formatSrc } content="Rendre accessible" color="teal" style={{marginTop:15}}/>

        </div>
        );
    }
}