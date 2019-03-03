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
} from '../../style';
import FormErrors from '../FormErrors';

const noop = a => a;

const EditCategoryView = ({
  title, content, published, onHomepage, directory, errors,
  togglePublished, toggleOnHomepage,
  setFilename, setTitle, setContent, setDirectory, exists, sameTitle,
  save
}) => (
  <ArticleFrame>
    <PageHead>{exists ? 'Update Article' : 'New Article'}</PageHead>
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
            errors={({sameTitle: [`there is already a catergory named '${title}'.`]})}
            level="warn" />}
          <FormItem>
            <FormLabel>Directory</FormLabel>
            <FormContent>
              <Input type="text" value={directory}
                onChange={(event) => setDirectory(event.target.value)}/>
            </FormContent>
          </FormItem>
          <FormErrors field="filename" errors={errors}/>
          <FormItem>
            <FormLabel>&nbsp;</FormLabel>
            <FormContent data-type="FormContent">
              <CheckboxWrapper>
                <div onClick={togglePublished}>
                  <input type="checkbox" checked={published} onChange={togglePublished}/>
                Published
                </div>
              </CheckboxWrapper>
            </FormContent>
          </FormItem>
          <FormErrors field="published" errors={errors}/>
          <FormErrors field="content" errors={errors}/>
        </tbody>
      </FormContainer>
      <ContentEditor
        name="category-content"
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

EditCategoryView.propTypes = {
  newArticleFoo: pt.string,
  setNewArticleFoo: pt.func,
};

EditCategoryView.defaultProps = {
  newArticleFoo: '',
  setNewArticleFoo: noop,
};

export default EditCategoryView;
