import React, { Component } from 'react';
import ArticleLinksView from './ArticleLinksView';

export default class ArticleLinksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = { ...this.props };
    delete props.children;
    return (
      <ArticleLinksView {...props} {...this.state} setArticleLinksFoo={value => this.setArticleLinksFoo(value)}>
      </ArticleLinksView>
    );
  }
}
