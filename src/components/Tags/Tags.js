import React from 'react';
import './tags.css';
import AddButton from '../AddButton/AddButton';
import Tag from '../Tag/Tag';

// The Tags component displays tags that have been attached to a Task

export default function Tags(props) {

    const handleDeleteTag = (tagIndex) => {
        props.deleteTag(props.categoryIndex, props.taskIndex, tagIndex)
    }

    return (
        <div className="tags" >

            {props.tags ?
                props.tags.map((tag, idx) =>
                    <Tag key={idx}
                        index={idx}
                        title={tag}
                        deleteTag={handleDeleteTag}
                        hue={props.hue} />)
                : null}

            <AddButton
                title="Tag"
                id={`cat-${props.categoryIndex}-task-${props.taskIndex}-tags`}
                onSubmit={(tagName) => props.addTag(tagName)} />

        </div >
    )
}

Tags.defaultProps = {
    addTag: () => { }
}