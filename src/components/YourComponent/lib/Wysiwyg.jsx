import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';

import {convertFromRaw,
  convertToRaw,
  ContentState,
  Modifier,
  Editor,
  EditorState,
  RichUtils} from 'draft-js';

import {stateToHTML}              from 'draft-js-export-html';
import 'semantic-ui-css/semantic.min.css';
import "./style.css"


const colorStyleMap = {
  RED: {color: 'rgba(255, 0, 0, 1.0)'},
  ORANGE: {color: 'rgba(255, 127, 0, 1.0)'},
  YELLOW: {color: 'rgba(180, 180, 0, 1.0)'},
  GREEN: {color: 'rgba(0, 180, 0, 1.0)'},
  BLUE: {color: 'rgba(0, 0, 255, 1.0)'},
  GREY: {color: 'rgba(167, 167, 167, 1.0)'},
};



const COLORS = [
    {label: 'Red', style: 'RED', icon:"ui red stop icon"},
    {label: 'Orange', style: 'ORANGE', icon:"ui orange stop icon"},
    {label: 'Yellow', style: 'YELLOW',icon:"ui yellow stop icon"},
    {label: 'Green', style: 'GREEN', icon:"ui green stop icon"},
    {label: 'Blue', style: 'BLUE', icon:"ui blue stop icon"},
    {label: 'Grey', style: 'GREY', icon:"ui grey stop icon"},
  ];

export const ConvertToHTML = ({html, className}) => {
  const colorStyleMapToHTML = {
    inlineStyles: {
      RED: {style: {color: 'rgba(255, 0, 0, 1.0)'}},
      ORANGE: {style: {color: 'rgba(255, 127, 0, 1.0)'}},
      YELLOW: {style: {color: 'rgba(180, 180, 0, 1.0)'}},
      GREEN: {style: {color: 'rgba(0, 180, 0, 1.0)'}},
      BLUE: {style: {color: 'rgba(0, 0, 255, 1.0)'}},
      GREY: {style: {color: 'rgba(167, 167, 167, 1.0)'}},
    }
  };
  return (
    <div
      className={ className ? "wysiwyg-result " + className : "wysiwyg-result" }
      dangerouslySetInnerHTML={html? {__html: stateToHTML(convertFromRaw(html), colorStyleMapToHTML)} : null }>
      </div>
  )
}



export class Wysiwyg extends Component {
      constructor(props) {
        super(props);
        this.state = {editorState: this.props.value? EditorState.createWithContent(convertFromRaw(this.props.value)) : EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
          this.setState({editorState})
          var content = convertToRaw(editorState.getCurrentContent())
          this.props.onChange(content)
        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleColor = (style) => this._toggleColor(style)
      }

      _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }

      _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
      }

      _toggleBlockType(blockType) {
        this.onChange(
          RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
          )
        );
      }

      _toggleColor(toggledColor) {
         const {editorState} = this.state;
         const selection = editorState.getSelection();

         // Let's just allow one color at a time. Turn off all active colors.
         const nextContentState = Object.keys(colorStyleMap)
           .reduce((contentState, color) => {
             return Modifier.removeInlineStyle(contentState, selection, color)
           }, editorState.getCurrentContent());

         let nextEditorState = EditorState.push(
           editorState,
           nextContentState,
           'change-inline-style'
         );

         const currentStyle = editorState.getCurrentInlineStyle();

         // Unset style override for current color.
         if (selection.isCollapsed()) {
           nextEditorState = currentStyle.reduce((state, color) => {
             return RichUtils.toggleInlineStyle(state, color);
           }, nextEditorState);
         }

         // If the color is being toggled on, apply it.
         if (!currentStyle.has(toggledColor)) {
           nextEditorState = RichUtils.toggleInlineStyle(
             nextEditorState,
             toggledColor
           );
         }

         this.onChange(nextEditorState);
       }
       currentBlockTypes(){
         var types = [
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
        var contentState = editorState.getCurrentContent();
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
              <ColorControls
                  editorState={editorState}
                  onToggle={this.toggleColor}
                />
            </div>

            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={colorStyleMap}
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

    function getBlockStyle(block) {
      switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
      }
    }

    class StyleButton extends React.Component {
      constructor(props) {
        super(props);
        this.onToggle = (e) => {
          e.preventDefault();
          this.props.onToggle(this.props.style);
        };
      }

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

      const ColorControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className="RichEditor-controls ui mini basic icon buttons">
            {COLORS.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
              />
            )}
          </div>
        );
      };

      // This object provides the styling information for our custom color
      // styles.