import React, {Component} from 'react';
import ArticleView from './ArticleView';
import axios from 'axios';

export default class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {path: props.match.params.path, title: '', content: '', loaded: false};
  }

  componentDidMount() {
    if (!this.state.loaded && this.state.path) {
      axios.get(
        'https://wonderland-labs.herokuapp.com/api/articles/'
        + encodeURIComponent(this.state.path)
      ).then(result => {
        console.log('result:', result);
        this.setState({...result.data, loaded: true});
      })
        .catch(err => {
          console.log('cannot get article', err);
        });
    }
  }

  render() {
    return (
      <ArticleView {...this.state}> </ArticleView>
    );
  }
}
