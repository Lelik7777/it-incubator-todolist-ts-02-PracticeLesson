import React, {useState} from 'react';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import './App.css'

export  type filterValuesType = 'all' | 'active' | 'completed';
export type TodoList = {
    id: string;
    title: string;
    filter: filterValuesType;
}
type TasksStateType = {
    [key: string]: TaskType[],
}

function App() {
    // это хук,который позволяет отрисовывать измения,происходящие в компоненте App,без глобальной перерисовки через render
    //BLL
    const todoList_1 = v1();
    const todoList_2 = v1();
    const [todoList, setTodoLIst] = useState<TodoList[]>([
        {id: todoList_1, title: 'What to learn', filter: 'all'},
        {id: todoList_2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
//скобки[] ставятся для того,чтобы имя ключа было выражением
        [todoList_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Yo', isDone: false},
        ],
        [todoList_2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'meat', isDone: true},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'vine', isDone: false},
        ],

    })

//это локальный хук для изменения тасок при нажатии кнопок: all, active, completed


//
    function removeTask(taskId: string, todoListId: string) {
        /* tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId)
         setTasks({...tasks});*/
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)});
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title,//если названия совпадают,то можно не дублировать,а только один раз указываем и все
            isDone: false,
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});//добавляем новую таску вначало в копию массива task,чтобы реакт перерисовал,
        // иначе он воспримет,как старый массив и оставит без измениений
        //если поменять местами,то запишем в конец массива task
    }

    function getTaskForTodoList(todoList: TodoList) {

        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => t.isDone === false)

            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone === true)

            default:
                return tasks[todoList.id];
        }

    }


    function changeFilter(value: filterValuesType, todoListId: string) {
        setTodoLIst(todoList.map(t => t.id === todoListId ? {...t, filter: value} : t))
    }

    function changeTaskStatus(id: string, newBoolean: boolean, todoListId: string) {
        /* tasks[todoListId] = tasks[todoListId].map(t => t.id === id ? {...t, isDone: newBoolean} : t);
         setTasks({...tasks,});*/
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone: newBoolean} : t)});
    }

    function removeTotoList(todoListId: string) {
        setTodoLIst(todoList.filter(t => t.id === todoListId))
        delete tasks[todoListId];
        setTasks({...tasks});
    }
    const todoListTemp= todoList.map((t) => {
            return <Todolist
                removeTotoList={removeTotoList}
                title={t.title}
                tasks={getTaskForTodoList(t)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                todoListId={t.id}
                key={t.id}
            />
        })
    return <div>
        {todoListTemp}

    </div>

}

export default App;
