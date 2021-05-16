import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
   todoListId:string;
    title: string;
    tasks:TaskType[]
    removeTask: (taskId: string,todoListId:string) => void;
    changeFilter: (value: filterValuesType,todoListId:string) => void;
    addTask: (title: string,todoListId:string) => void;
    changeTaskStatus:(id:string,b:boolean,todoListId:string)=>void;
    key:string
    removeTotoList:(id:string)=>void;
}

export function Todolist(props: PropsType) {
    //локальный state для input:все изменения в окне input вначале сохраняются в title,который при нажатии кнопки add
    //поступает в функцию addTask,которая меняет таски,которые лежат в компоненете App
    const [title, setTitle] = useState('');
    //локальный state для ошибки
    const [error,setError]=useState<boolean>(false);
    const task = props.tasks.map(t => {
        const removeTask0=() => props.removeTask(t.id,props.todoListId);
        const changeTaskStatus=(e:ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id,e.currentTarget.checked,props.todoListId)
        //условное присвоение классов
        return <li className={!t.isDone?'isDone':''}>
            <input
                onChange={changeTaskStatus}
                type="checkbox"
                checked={t.isDone}
            />
            <span>{t.title}</span>
            <button onClick={removeTask0}>del</button>
        </li>
    })
    const addTask = () => {

        if(title.trim()){
                props.addTask(title.trim(),props.todoListId)

            }else {
            setError(true)
        }

        setTitle('');

    };
    const onkeypressAddTask=(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            addTask();
        }
    }
  const  onChangeTitle=(e:ChangeEvent<HTMLInputElement>) =>
  {
      setTitle(e.currentTarget.value);
      setError(false);
      if(error){
          setTitle('');
      }

  }

    const onClickAllFilter=() => (props.changeFilter('all',props.todoListId))
    const onClickActFilter=() => (props.changeFilter('active',props.todoListId))
    const onClickCompFilter=() => (props.changeFilter('completed',props.todoListId))
    const addTaskButton=() => addTask();
    const onClickRemoveTodoList=()=>props.removeTotoList(props.todoListId)
    return <div>
        <h3>{props.title}<button onClick={onClickRemoveTodoList}>del</button></h3>
        <div>
            <input
                className={error?'error':''}
                //если неправильное введено значение,то будет ругаться
                value={error?'title is error':title}//здесь происходит перерисовка и таким образом инпут контролируется стейтом
                onChange={onChangeTitle}//при событии формируется
                // объект е ,содержащий инфу о всех событиях в объекте
                onKeyPress={onkeypressAddTask}
            />
            <button onClick={addTaskButton}>+</button>
        </div>
        <div>
            <ul>
                {task}
            </ul>
        </div>

        <div>
            <button

                onClick={onClickAllFilter}>All</button>
            <button onClick={onClickActFilter}>Active</button>
            <button onClick={onClickCompFilter}>Completed</button>
        </div>
    </div>
}
