import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import {marked} from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.2/lib/marked.esm.js";

const CODE_CHANGED = 'CODE CHANGED';
const defaultCode = "# This is the first header!\n" + 
      "## This is the second header!\n" +
      "You can create links with markdown such as this one to YouTube [Click Me!](https://www.youtube.com)\n" +
      "This is how a line of code is made: `console.log(\'hello world\')`.\n" +
      "The following is an inline code block:\n" +
      "```\nfunction showcase() {\n" +
      "    console.log(\'This is a function!\');\n" +
      "}\n```\n\n\n" +
      "You can create blockquotes like this: \n> Here is a blockquote\n\n" +
      "The text can be **bold**!\n\n" +
      "1. You can have\n2. an ordered list like this!\n\n- Or it can be\n- an unordered list instead!\n\n\n" +
      "Finally, don't forget about images!\n![Tux the Linux Penguin](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXiRA6gjVegGI_RxD20jPt8mf2TVFcf-nU7w&s)";

const modifyCode = (changedCode) => {
  return {
    type: CODE_CHANGED,
    changedCode
  };
}

// Set the default state in the reducer instead, as it manages the changes being made (otherwise the code property is undefined)
const codeReducer = (previousState = defaultCode, action) => {
  switch(action.type) {
    case CODE_CHANGED:
      return action.changedCode;

    default:
      return previousState;
  }
};

const store = createStore(codeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class AppWrapper extends React.Component {
  render() {
    return (
      <App />
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="text-center space-mono-regular">React Markdown Editor</h1>
        <Provider store={store}>
          <Container />
        </Provider>
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // handles changes in editor through redux
    const updatedCode = event.target.value;
    this.props.newCode(updatedCode);
  };

  render() {
    return (
      <div>
        <h3 className='text-center space-mono-regular'>Editor</h3>
        <textarea id="editor" style={{width: "80%", height: "10em"}} onChange={this.handleChange} value={this.props.code}></textarea>
        <div id="div-display">
          <Display code={this.props.code} id="display"/>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    marked.use({
      gfm: true,
      breaks: true
    });

    return (
      <div>
        <h3 className='text-center space-mono-regular'>Preview</h3>
        <div id="preview" dangerouslySetInnerHTML={{__html: marked.parse(this.props.code)}}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newCode: (changedCode) => {
      dispatch(modifyCode(changedCode));
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Editor);