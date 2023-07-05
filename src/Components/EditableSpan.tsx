import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
    disabled?: boolean
}

const EditableSpan = React.memo (function({title, onChange, disabled}: EditableSpanPropsType) {
    const [titleValue, setTitleValue] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(true)

    const onChangeTitleValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }
    const deactiveVisibleMode = () => {
        setEditMode(false)
        setTitleValue(title)
    }
    const changeTitleHandler = () => {
        onChange(titleValue)
        setEditMode(true)
    }
    return (
        <div style={{display: "flex"}}>
            {editMode ? <>
                    <h3 onDoubleClick={deactiveVisibleMode}>{title}</h3>
                </> :
                <input value={titleValue}
                       autoFocus
                       disabled={disabled}
                       onChange={(e) => onChangeTitleValueHandler(e)}
                       onBlur={changeTitleHandler}/>}
        </div>
    );
})

export default EditableSpan;