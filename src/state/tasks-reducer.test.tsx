import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, TaskStateType, updateTaskAC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

let startState: TaskStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [{
            id: '1',
            title: 'Motorland work',
            completed: false,
            startDate: '',
            description: '',
            priority: TaskPriorities.Low,
            deadline: '',
            todoListId: 'todolistId1',
            addedDate: '',
            order: 0,
            status: TaskStatuses.New
        },
            {
                id: '2', title: 'Dog walk',
                completed: false,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                status: TaskStatuses.New
            }],
        'todolistId2': [{
            id: '1', title: 'Site',
            completed: false,
            startDate: '',
            description: '',
            priority: TaskPriorities.Low,
            deadline: '',
            todoListId: 'todolistId1',
            addedDate: '',
            order: 0,
            status: TaskStatuses.New
        },
            {
                id: '2', title: 'Study react',
                completed: false,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                status: TaskStatuses.New
            },
            {
                id: '3', title: 'Baby game',
                completed: false,
                startDate: '',
                description: '',
                priority: TaskPriorities.Low,
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                status: TaskStatuses.New
            }]
    }
})

test('correct todolist should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC('2', 'todolistId2'))

    expect(endState).toEqual({
        'todolistId1': [{id: '1', title: 'Motorland work', isDone: false},
            {id: '2', title: 'Dog walk', isDone: true}],
        'todolistId2': [{id: '1', title: 'Site', isDone: false},
            {id: '3', title: 'Baby game', isDone: true}]
    })
})

test('correct task should be added to correct todolist', () => {

    const endState = tasksReducer(startState, addTaskAC({
        id: '2', title: 'Study react',
        completed: false,
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        deadline: '',
        todoListId: 'todolistId1',
        addedDate: '',
        order: 0,
        status: TaskStatuses.New
    }))
    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('Study express');
    expect(endState["todolistId2"][0].status).toBe(false);
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC('todolistId2', '2', {status: TaskStatuses.New}))

    expect(endState['todolistId1'][1].status).toBeTruthy();
    expect(endState['todolistId2'][1].status).toBeFalsy();
});

test('current task title of current todolist should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC('todolistId2', '2', {title: 'new title!!!'}))

    expect(endState['todolistId1'][1].title).toBe('Dog walk')
    expect(endState['todolistId2'][1].title).toBe('new title!!!')
})

/*test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});*/

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

/*test('array of tasks should be added to currect todolist', () => {
    const newTasks = [{id: v1(), title: 'hellloooo', completed: false}]
    const endState = tasksReducer(startState, setTasksAC('todolistId2', newTasks))
})*/



