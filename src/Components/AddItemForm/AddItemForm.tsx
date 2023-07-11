import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import plus from '../../files/plus.svg'

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
    className?: string
    placeholder?: string
}
const AddItemForm = React.memo(function ({addItem, disabled, className, placeholder}: AddItemFormPropsType) {
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
            <div className={className}>
                <input placeholder={placeholder} className={error ? 'error' : ''} onChange={onChangeHandler} value={title}
                       onKeyPress={onKeyPressHandler} disabled={disabled}/>
                <button onClick={addNewItem} disabled={disabled}>Add<img src={plus}/></button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
        );
    }
)
export default AddItemForm;