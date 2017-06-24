import React, { Component }         from 'react';
import autoBind                     from "react-autobind"
import TinyMCE                      from 'react-tinymce';
import { flatener }                 from "./lib/flatener";
import { restructuration }          from "./lib/restructuration";
import {
  Button, 
  Dimmer, 
  Loader
}                                   from 'semantic-ui-react'

import { exemple }                  from "./exemple"
export default class Editor extends Component {

    constructor(props){
        super(props)
        autoBind(this)
        this.state = {
            content: exemple
        }
        this.alertOptions = {
            offset: 14,
            position: 'bottom left',
            theme: 'dark',
            time: 5000,
            transition: 'scale'
        };
    }

    handleEditorChange(e) {
        let content = e.target.getContent()
        const flatenedContent = flatener({content})
        this.props.getContent(flatenedContent)
        this.setState({content: flatenedContent.content})
    }

    formatSrc(){
        const { content } = this.state
        this.setState({ loading: true })
        setTimeout(() => {
            restructuration({ content })
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
                    themes: "inlite",
                    plugins: [
                        'lists image charmap print preview anchor',
                        'searchreplace visualblocks fullscreen',
                        'paste'
                        ],
                    branding: false,
                    toolbar: 'undo redo | styleselect | bullist numlist | image',
                    content_css: [
                        '//www.tinymce.com/css/codepen.min.css'
                    ],
                      style_formats: [
                            {title: 'Titre 1', format: 'h1'},
                            {title: 'Titre 2', format: 'h2'},
                            {title: 'Titre 3', format: 'h3'},
                            {title: 'Titre 4', format: 'h4'},
                            {title: 'Titre 5', format: 'h5'},
                            {title: 'Titre 6', format: 'h6'}
                        ]
                }}
                onChange={this.handleEditorChange}
            />

            <Button onClick={ this.formatSrc } content="Rendre accessible" color="teal" style={{marginTop:15}}/>

        </div>
        );
    }
}