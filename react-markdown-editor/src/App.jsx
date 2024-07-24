import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import {marked} from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.2/lib/marked.esm.js";


//const store = createStore();

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider>

      </Provider>
    )
  }
}

export default class App extends React.Component {
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
      code: "# This is the first header!\n" + 
      "## This is the second header!\n" +
      "You can create links with markdown such as this one to YouTube [Click Me!](https://www.youtube.com)\n" +
      "This is how a line of code is made: `console.log(\'hello world\')`.\n" +
      "The following is an inline code block:\n" +
      "```\nfunction showcase() {\n" +
      "    console.log(\'This is a function!\');\n" +
      "}\n```\n\n\n" +
      "You can create blockquotes like this: \n> Here is a blockquote"
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