import React, {Component} from 'react';
import _ from 'lodash';

import EditCategoryView from './EditCategoryView';
import {Category} from '../../models/categories';
import userStore from '../../models/user';
import encodePath from '../../js/encodePath';

const CAT_FIELDS = 'content,title,published,directory'.split(',');

export default class EditCategoryContainer extends Component {
  constructor(props) {
    super(props);
    let directory = _.get(props, 'match.params.directory', '');
    if (directory) {
      directory = decodeURIComponent(directory);
    } else {
      directory ='';
    }

    this.state = {
      published: true,
      directory,
      content: '',
      title: 'New Category',
      errors: false,
      exists: false,
      sameTitle: false,
    };
  }

  setContent(content) {
    this.setState({content, errors: false}, () => this.validate());
  }

  setTitle(title) {
    this.setState({title, errors: false}, () => {
      this.validate();
      this.checkTitle();
    });
  }

  setDirectory(directory) {
    this.setState({directory, errors: false}, () => {
      this.validate();
      this.checkDirectory();
      this.checkTitle();
    });
  }

  checkDirectory() {
    if (!this.category) {
      this.setState({exists: false});
      return;
    }

    this.category().isExists()
      .then((exists) => {
        this.setState({exists});
      });
  }

  async checkTitle() {
    let sameTitle = false;
    if (this.state.directory && this.state.title) {
      const categories = await Category.all();
      const titles = _.map(categories, 'title');
      sameTitle = !!titles.includes(this.state.title);
    }
    this.setState({sameTitle});
  }

  togglePublished() {
    this.setState({published: !this.state.published, errors: false}, () => this.validate());
  }

  save() {
    console.log('saving');

    const {accessToken, sub} = userStore.state;
    if (!(sub && accessToken)) {
      console.log('cannot save - not logged in');
      return;
    }

    this.validate()
      .then((errors) => {
        if (errors) {
          console.log('save:errors:', errors);
          this.setState({errors});
        }
        else {
          console.log('can save');
          const category = this.category();
          category.save(accessToken, sub, !this.state.exists)
            .then(() => {
              console.log('writing....');
              this.props.history.push('/category/' + encodePath(category.directory));
            })
            .catch((err)=> {
              console.log('error saving: ', err);
            });
        }
      })
      .catch((err) => {
        console.log('error validating:', err);
      });
  }

  category() {
    let data = _.pick(this.state, CAT_FIELDS);
    return new Category(data, !this.state.exists);
  }

  validate() {
    return new Promise((done) => {
      const article = this.category();
      let errors = false;
      if (!_.isEmpty(article.errors)) {
        errors = {...article.errors};
      }
      if (this._mounted) {
        this.setState({errors}, () => done(errors));
      }
      else {
        done(errors);
      }
    });
  }

  componentDidMount(){
    const directory = _.get(this.props, 'match.params.directory', '');
    if (directory) {
      const decoded = decodeURIComponent(directory);
      console.log('existing directory:', directory, decoded);
      Category.get(decoded)
        .then((c) => {
          this.setState({exists: true, ...c.toJSON()});
        });
    }
  }

  render() {
    return (
      <EditCategoryView {...this.state}
        setContent={(content) => this.setContent(content)}
        setTitle={(title) => this.setTitle(title)}
        setDirectory={(category) => this.setDirectory(category)}
        togglePublished={() => this.togglePublished()}
        save={() => this.save()}
      >
      </EditCategoryView>
    );
  }
}
