import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
const AddItemForm = React.memo(function ({addItem, disabled}: AddItemFormPropsType) {
        const [title, setTitle] = useState('')
        const [error, setError] = useState<string | null>(null)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null)
            }
            if (e.charCode === 13) {
                addNewItem()
            }
        }

        const addNewItem = () => {
            if (title.trim() !== '') {
                addItem(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }


        return (
            <div>
                <input disabled={disabled} className={error ? 'error' : ''} onChange={onChangeHandler} value={title}
                       onKeyPress={onKeyPressHandler}/>
                <button disabled={disabled} onClick={addNewItem}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        );
    }
)
export default AddItemForm;