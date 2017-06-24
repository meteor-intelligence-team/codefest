import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import autoBind             from 'react-autobind';
import {convertFromRaw,
  convertToRaw,
  ContentState,
  Modifier,
  Editor,
  EditorState,
  RichUtils} from 'draft-js';

import {stateToHTML}              from 'draft-js-export-html';

import { flatener }               from "./flatener"

import 'semantic-ui-css/semantic.min.css';
import "./style.css"


//convert JSON to HTML for the render
export const ConvertToHTML = ({html, className}) => {
  return (
    <div
      className={ className ? "wysiwyg-result " + className : "wysiwyg-result" }
      dangerouslySetInnerHTML={html? {__html: stateToHTML(convertFromRaw(html))} : null }>
    </div>
  )
}



export class Wysiwyg extends Component {
    constructor(props) {
        super(props);
        autoBind(this)
        this.state = {
            editorState: this.props.value? EditorState.createWithContent(convertFromRaw(this.props.value)) : EditorState.createEmpty()
        };
        this.focus = () => this.refs.editor.focus();
    }

    handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    onChange = (editorState) => {
        this.setState({editorState})
        const content = convertToRaw(editorState.getCurrentContent())
        const flatenedContent = flatener({content})
        this.props.onChange(flatenedContent)
    };

    onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
            )
        );
    }
    currentBlockTypes(){
        const types = [
            {label: 'H1', style: 'header-one', icon:null},
            {label: 'H2', style: 'header-two', icon:null},
            {label: 'H3', style: 'header-three', icon:null},
            {label: 'H4', style: 'header-four', icon:null},
            {label: 'H5', style: 'header-five', icon:null},
            {label: 'H6', style: 'header-six', icon:null},
            {label: 'UL', style: 'unordered-list-item', icon:"ui unordered list icon"},
            {label: 'OL', style: 'ordered-list-item', icon:"ui ordered list icon"}
        ]
        return types
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
            <div className="toolbar">
                <BlockStyleControls
                blockTypes={this.currentBlockTypes()}
                editorState={editorState}
                onToggle={this.toggleBlockType}
                />
            </div>

            <div className={className} onClick={this.focus}>
                <Editor
                blockStyleFn={getBlockStyle}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                onTab={this.onTab}
                ref="editor"
                spellCheck={true}
                />
            </div>
            </div>
        );
    }
}

const getBlockStyle = (block) => {
    switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
    }
}

class StyleButton extends Component {
    constructor(props) {
    super(props)
    autoBind(this)

    }
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };

    render() {
    let className = 'ui basic mini icon button';
    if (this.props.active) {
        className = 'ui blue active mini icon button';
    }

    return (
        <span className={className} onMouseDown={this.onToggle} >
        {this.props.icon ?
            <i className={this.props.icon}></i>
            :
            this.props.label
        }
        </span>
    );
    }
}



const BlockStyleControls = (props) => {
    const BLOCK_TYPES = props.blockTypes
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

    return (
    <div className="RichEditor-controls ui mini basic icon buttons">
        {BLOCK_TYPES.map((type) =>
        <StyleButton
            className="ui basic button"
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            icon={type.icon}
        />
        )}
    </div>
    );
};