import EditableSpan from "../../../../Components/EditableSpan/EditableSpan";
import React, {useCallback} from "react";
import {TaskStatuses, TaskType} from "../../../../api/task-api";
import s from './Task.module.css'
import trash from '../../../../files/trash.svg'

type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo(function ({
                                             todolistId,
                                             task,
                                             changeTaskTitle,
                                             changeTaskStatus,
                                             removeTask
                                         }: TaskPropsType) {
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(todolistId, task.id, title)
    }, [todolistId, task.id, changeTaskTitle])

    const changeTaskStatusHandler = useCallback(() => {
        if (task.status === TaskStatuses.New) {
            changeTaskStatus(todolistId, task.id, TaskStatuses.Completed)
        } else {
            changeTaskStatus(todolistId, task.id, TaskStatuses.New)

        }
    }, [changeTaskStatus, todolistId, task.id, task.status])

    const removeTaskHandler = () => {
        removeTask(todolistId, task.id)
    }
    return <li key={task.id} className={ task.status === 2 ? s.is_done : ''}>
        <div className={s.task}>
            <div className={s.checkbox}><input type="checkbox" checked={task.status === TaskStatuses.Completed}
                        onChange={changeTaskStatusHandler}/></div>
            <div className={s.text}><EditableSpan title={task.title} onChange={changeTaskTitleHandler}/></div>
            <div className={s.remove_button} onClick={removeTaskHandler}><img src={trash} alt={'remove'}/></div>
        </div>
    </li>
})