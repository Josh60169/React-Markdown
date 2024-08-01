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


const codeReducer = (previousState, action) => {
  switch(action.type) {
    case CODE_CHANGED:
      return action.changedCode;

    default:
      return previousState;
  }
};

const store = createStore(codeReducer);

export default class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
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
        <h1 className="text-center">React Markdown Editor</h1>
        <Editor />
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaultCode
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(() => ({
      code: event.target.value
    }));
  };

  render() {
    return (
      <div>
        <h3 className='text-center'>Editor</h3>
        <textarea id="editor" style={{width: "100%", height: "10em"}} onChange={this.handleChange} value={this.state.code}></textarea>
        <Display code={this.state.code}/>
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
        <h3 className='text-center'>Preview</h3>
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

const Container = connect(mapStateToProps, mapDispatchToProps)(App);