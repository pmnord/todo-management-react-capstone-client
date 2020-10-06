import React from 'react';
import './tags.css';
import AddButton from '../AddButton/AddButton';
import Tag from '../Tag/Tag';

// The Tags component displays tags that have been attached to a Task

export default function Tags(props) {
  const handleDeleteTag = (tagIndex) => {
    props.deleteTag(props.categoryIndex, props.taskIndex, tagIndex);
  };

  return (
    <div>
      <label>Tags:</label>
      <div className='tags'>
        <ul className='tags__ul'>
          {props.tags
            ? props.tags.map((tag, idx) => (
                <li key={idx}>
                  <Tag
                    index={idx}
                    title={tag}
                    deleteTag={handleDeleteTag}
                    color={props.color}
                  />
                </li>
              ))
            : null}
        </ul>

        <AddButton
          title='Tag'
          id={`cat-${props.categoryIndex}-task-${props.taskIndex}-tags`}
          onSubmit={(tagName) => props.addTag(tagName)}
        />
      </div>
    </div>
  );
}

Tags.defaultProps = {
  addTag: () => {},
};
