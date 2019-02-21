import React from 'react';
import pt from 'prop-types';

const noop = () => {
};

import {FormLabel, ContentEditor, CheckboxWrapper, Input, FormItem, ButtonList, EditButton} from '../style';

const ArticleEditView = ({content, title, save,
  onHomepage, toggleOnHomepage,
  published, setTitle, togglePublished,
  setContent}) => (
  <React.Fragment>
    <FormItem>
      <FormLabel>Title</FormLabel>
      <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
    </FormItem>
    <FormItem>
      <FormLabel>&nbsp;</FormLabel>
      <CheckboxWrapper onClick={togglePublished}>
        <input type="checkbox" checked={published} onClick={togglePublished}/>
        Published
      </CheckboxWrapper>
    </FormItem>
    <FormItem>
      <FormLabel>&nbsp;</FormLabel>
      <CheckboxWrapper onClick={toggleOnHomepage}>
        <input type="checkbox" checked={onHomepage} onClick={toggleOnHomepage}/>
      On Home Page
      </CheckboxWrapper>
    </FormItem>
    <ContentEditor
      name="article-content"
      value={content}
      onChange={event => setContent(event.target.value)}
      rows="20"
    />
    <ButtonList>
      <EditButton onClick={save}>Save</EditButton>
    </ButtonList>
  </React.Fragment>
);

ArticleEditView.propTypes = {
  content: pt.string,
  title: pt.string,
  setContent: pt.func,
  save: pt.func,
  onHomepage: pt.bool,
  toggleOnHomepage: pt.func,
  published: pt.bool,
  togglePublished: pt.func,
};

ArticleEditView.defaultProps = {
  content: '',
  title: '',
  onHomepage: false,
  published: false,
  setTitle: noop,
  setContent: noop,
  save: noop,
  toggleOnHomepage: noop,
  togglePublished: noop,
};

export default ArticleEditView;
