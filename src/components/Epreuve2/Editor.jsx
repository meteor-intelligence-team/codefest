import React, { Component }         from 'react';
import autoBind                     from "react-autobind"
import TinyMCE                      from 'react-tinymce';
import { flatener }                 from "./lib/flatener";
import { restructuration }          from "./lib/restructuration";
import {
  Button, 
  Dimmer, 
  Loader, 
  Message
}                                   from 'semantic-ui-react'

import { exemple }                  from "./exemple"
import 'semantic-ui-css/semantic.min.css';

export default class Editor extends Component {

    constructor(props){
        super(props)
        autoBind(this)
        this.state = {
            content: exemple
        }
    }

    handleEditorChange(e) {
        let content = e.target.getContent()

        //lancement de la fonction d'applatissement du DOM HTML
        const flatenedContent = flatener({content})

        //Envoi du resultat au composant parent pour affichage
        this.props.getContent(flatenedContent)

        //Mise du résultat dans le state afin de fournir l'éditeur en data
        this.setState({content: flatenedContent.content})
    }

    formatSrc(){
        const { content } = this.state
        this.setState({ loading: true })
        setTimeout(() => {
            const result = restructuration({ content })
            if(result.error){
                this.setState({ error : result.error.reason, loading: false, content: result.content })
            } else {
                this.setState({ loading: false, content: result.content })
            }
        }, 500);
    }


    render() {

        const { content, loading, error } = this.state

        //Si le texte est en restructuration, montrer un loader
        if(loading){
            return(
                <Dimmer active style={{ position: "absolute", minHeight: 200 }}>
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
            { error ? 
                <Message error content={ error } header="Il y a une erreur"/>
            : null }


            <Button onClick={ this.formatSrc } content="Rendre accessible" color="teal" style={{marginTop:15}}/>

        </div>
        );
    }
}