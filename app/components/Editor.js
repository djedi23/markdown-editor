// -*- mode:rjsx -*-
import { Col, Grid, Row } from 'react-flexbox-grid';
import React, { Component, PropTypes } from 'react';
import Remarkable from 'remarkable';
// import remarkableemoji from 'remarkable-emoji';
// import twemoji from 'twemoji';
import AceEditor from 'react-ace';
import { compose } from 'redux';
import hljs from 'highlight.js';
import Raven from 'raven-js';
import $ from 'jquery';

import '../markdown.scss';
import drawerContainer from '../containers/Drawer';
import editorData from '../containers/Editor';
import notifyContainer from '../containers/Notification';
import { projectContainer } from '../containers/project';
import styles from './Editor.css';

import 'brace/mode/markdown';
import 'brace/theme/github';


class Editor extends Component {
  constructor(props) {
    super(props);
    hljs.initHighlightingOnLoad();
    this.lineCache = [];
    this.md = new Remarkable({
      linkify: false,
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) { Raven.captureException(err); }
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) { Raven.captureException(err); }

        return ''; // use external default escaping
      }
    });

    //  this.md.use(remarkableemoji);

    this.md.renderer.rules.paragraph_open = (tokens, idx) => {
      let line;
      if (tokens[idx].lines && tokens[idx].level === 0) {
        [line] = tokens[idx].lines;
        this.lineCache[line] = true;
        return `<p class="line" data-line="${line}">`;
      }
      return '<p>';
    };

    this.md.renderer.rules.heading_open = (tokens, idx) => {
      let line;
      if (tokens[idx].lines && tokens[idx].level === 0) {
        [line] = tokens[idx].lines;
        this.lineCache[line] = true;
        return `<h${tokens[idx].hLevel} class="line" data-line="${line}">`;
      }
      return `<h${tokens[idx].hLevel}>`;
    };
    this.md.renderer.rules.list_item_open = (tokens, idx) => {
      let line;
      if (tokens[idx].lines) {
        [line] = tokens[idx].lines;
        this.lineCache[line] = true;
        return `<li data-line="${line}">`;
      }
      return '<li>';
    };

    this.md.renderer.rules.link_open = function (tokens, idx/* , options  env */) {
      return `<a onClick="mdGotoLink('${tokens[idx].href}')">`;
    };
  }

  componentDidMount() {
    window.mdGotoLink = this.gotoLink.bind(this);
  }

  props: {
    content: PropTypes.string,
    drawer: PropTypes.object,
    file: PropTypes.string,
    setContent: PropTypes.func,
    saveContent: PropTypes.func,
    loadContent: PropTypes.func,
    notify: PropTypes.func,
    project: PropTypes.object
  };


  gotoLink(page) {
    const { loadContent, saveContent, content, file, project } = this.props;
    saveContent(file, content);
    loadContent(`${project.path}/${page}.md`).catch(() => {
      this.props.notify(`Page not found: ${page}`, 'error');
    });
  }

  mdHandler(newValue) {
    this.lineCache = [];
    this.props.setContent(newValue);
  }

  scrollHandler(e) {
    const topLine = Math.ceil(e.session.$scrollTop / e.textInput.getElement().clientHeight);
    let line;
    for (line = topLine; line >= 0; line--) {
      if (this.lineCache[line]) { break; }
    }

    const target = $(`[data-line="${line}"]`);
    if (target[0]) { target[0].scrollIntoView(); }
  }

  render() {
    const { drawer: { pinned }, content } = this.props;
    return (
      <div className={`content-position ${pinned ? 'pinned' : ''}`}>
        <Grid fluid className={styles.nopadding}>
          <Row>
            <Col xs={6} md={6}>
              <AceEditor
                width="100%"
                height="calc(100vh - 63px)"
                mode="markdown"
                theme="github"
                onChange={this.mdHandler.bind(this)}
                name="editor"
                value={content}
                editorProps={{ $blockScrolling: true }}
                enableBasicAutocompletion
                enableLiveAutocompletion
                tabSize={2}
                onScroll={this.scrollHandler.bind(this)}
                commands={[{
                  name: 'save',
                  bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
                  exec: () => {
                    const { saveContent, file } = this.props;
                    saveContent(file, this.props.content);
                  } }]}
              />
            </Col>
            <Col xs={6} md={6} className={styles.markdown}>
              <div dangerouslySetInnerHTML={{ __html: this.md.render(content) }} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

//    <div dangerouslySetInnerHTML={{__html:twemoji.parse(this.md.render(this.props.content))}}/>


export default compose(
  drawerContainer,
  editorData,
  notifyContainer,
  projectContainer
)(Editor);
