import React, { Component } from 'react';
import autoBind                     from "react-autobind"
import TinyMCE                      from 'react-tinymce';
import {flatener}                   from "./lib/flatener" 

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
        this.setState({content})
        const flatenedContent = flatener({content})
        this.props.getContent(flatenedContent)
        console.log(e, flatenedContent)
    }


    render() {

        const { content } = this.state

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

        </div>
        );
    }
}

  const textcolors = [
    "000000", "Black",
    "993300", "Burnt orange",
    "333300", "Dark olive",
    "003300", "Dark green",
    "003366", "Dark azure",
    "000080", "Navy Blue",
    "333399", "Indigo",
    "333333", "Very dark gray",
    "800000", "Maroon",
    "FF6600", "Orange",
    "808000", "Olive",
    "008000", "Green",
    "008080", "Teal",
    "0000FF", "Blue",
    "666699", "Grayish blue",
    "808080", "Gray",
    "FF0000", "Red",
    "FF9900", "Amber",
    "99CC00", "Yellow green",
    "339966", "Sea green",
    "33CCCC", "Turquoise",
    "3366FF", "Royal blue",
    "800080", "Purple",
    "999999", "Medium gray",
    "FF00FF", "Magenta",
    "FFCC00", "Gold",
    "FFFF00", "Yellow",
    "00FF00", "Lime",
    "00FFFF", "Aqua",
    "00CCFF", "Sky blue",
    "993366", "Red violet",
    "FFFFFF", "White",
    "FF99CC", "Pink",
    "FFCC99", "Peach",
    "FFFF99", "Light yellow",
    "CCFFCC", "Pale green",
    "CCFFFF", "Pale cyan",
    "99CCFF", "Light sky blue",
    "CC99FF", "Plum"
  ]