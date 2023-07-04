import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only children count', () => {
    const startState = {age: 30, childrenCount: 0, name: 'Zhenya'}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(30)
    expect(endState.childrenCount).toBe(1)
})

test('user reducer should change name of user', () => {
    const startState = {age: 30, childrenCount: 0, name: 'Zhenya'}
    const newName = 'Yarik'
    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName})

    expect(endState.age).toBe(30)
    expect(endState.childrenCount).toBe(0)
    expect(endState.name).toBe(newName)
})

