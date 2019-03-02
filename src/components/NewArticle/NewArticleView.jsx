import React from 'react';
import pt from 'prop-types';

import {
  ButtonList,
  CheckboxWrapper,
  PageHead,
  ContentEditor,
  EditButton,
  FormItem,
  FormLabel,
  Input,
  ArticleFrame,
  FormContent,
  FormContainer,
  FuzzyBox
} from '../style';
import CategoryChooser from '../CategoryChooser';
import FormErrors from '../FormErrors';

const noop = a => a;

const NewArticleView = ({
  title, content, published, onHomepage, directory, filename, errors,
  togglePublished, toggleOnHomepage,
  setFilename, setTitle, setContent, setCategory, exists, sameTitle,
  save
}) => (
  <ArticleFrame>
    <PageHead>New Article</PageHead>
    <FuzzyBox>
      <FormContainer>
        <tbody>
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormContent>
              <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </FormContent>
          </FormItem>
          <FormErrors field="title" errors={errors}/>
          {sameTitle && !exists && <FormErrors field="sameTitle"
            errors={({sameTitle: [`there is already an article named '${title}' in '${directory || ''}'.`]})}
            level="warn" />}
          <FormItem>
            <FormLabel>Filename</FormLabel>
            <FormContent>
              <Input type="text" value={filename} onChange={(event) => setFilename(event.target.value)}/>
            </FormContent>
          </FormItem>
          <FormErrors field="filename" errors={errors}/>
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormContent>
              <CategoryChooser value={directory} onChange={setCategory}/>
            </FormContent>
          </FormItem>
          <FormErrors field="category" errors={errors}/>
          {exists &&
        <FormErrors field="exists"
          errors={({exists: [`there is already an article named '${filename}' in '${directory || ''}'.`]})}
          level="warn"/>}
          <FormItem>
            <FormLabel>&nbsp;</FormLabel>
            <FormContent data-type="FormContent">
              <CheckboxWrapper>
                <div onClick={togglePublished}>
                  <input type="checkbox" checked={published} onChange={togglePublished}/>
                Published
                </div>
                <div onClick={toggleOnHomepage}>
                  <input type="checkbox" checked={onHomepage} onChange={toggleOnHomepage}/>
                On Home Page
                </div>
              </CheckboxWrapper>
            </FormContent>
          </FormItem>

          <FormErrors field="published" errors={errors}/>
          <FormErrors field="onHomepage" errors={errors}/>
          <FormErrors field="content" errors={errors}/>
        </tbody>
      </FormContainer>
      <ContentEditor
        name="article-content"
        value={content}
        onChange={event => setContent(event.target.value)}
        rows="20"
      />
      <ButtonList>
        <EditButton onClick={save}>Save</EditButton>
      </ButtonList>
    </FuzzyBox>
  </ArticleFrame>
);

NewArticleView.propTypes = {
  newArticleFoo: pt.string,
  setNewArticleFoo: pt.func,
};

NewArticleView.defaultProps = {
  newArticleFoo: '',
  setNewArticleFoo: noop,
};

export default NewArticleView;
