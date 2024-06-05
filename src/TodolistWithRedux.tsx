import React, { ChangeEvent } from 'react';
import { FilterValuesType, TodolistType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { TasksStateType } from './AppWithRedux';
import { ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC } from './state/todolists-reducer';


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todolist: TodolistType
}

export function TodolistWithRedux(props: PropsType) {
	let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

	const dispatch = useDispatch()

	const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists
		.filter(todo => todo.id === props.todolist.id)[0])
	// .find(todo => todo.id === props.todolistId) as TodolistType)

	function removeTask(id: string, todolistId: string) {
		dispatch(removeTaskAC(id, todolistId))
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		dispatch(changeTaskStatusAC(id, isDone, todolistId))
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAC(id, newTitle, todolistId))
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatch(ChangeTodolistFilterAC(todolistId, value))
	}

	const addTask = (title: string) => {
		dispatch(addTaskAC(title, todolist.id))
	}

	const removeTodolist = () => {
		dispatch(RemoveTodolistAC(todolist.id))
	}
	const changeTodolistTitle = (title: string) => {
		dispatch(ChangeTodolistTitleAC(todolist.id, title))
	}

	const onAllClickHandler = () => changeFilter("all", todolist.id);
	const onActiveClickHandler = () => changeFilter("active", todolist.id);
	const onCompletedClickHandler = () => changeFilter("completed", todolist.id);
	

	let allTodolistTasks = tasks[todolist.id];
	let tasksForTodolist = allTodolistTasks;

	if (todolist.filter === "active") {
		tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
	}
	if (todolist.filter === "completed") {
		tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
	}
	return <div>
		<h3> <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
			<IconButton onClick={removeTodolist}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={addTask} />
		<div>
			{
				tasksForTodolist.map(t => {
					const onClickHandler = () => removeTask(t.id, todolist.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked;
						changeStatus(t.id, newIsDoneValue, todolist.id);
					}
					const onTitleChangeHandler = (newValue: string) => {
						changeTaskTitle(t.id, newValue, todolist.id);
					}


					return <div key={t.id} className={t.isDone ? "is-done" : ""}>
						<Checkbox
							checked={t.isDone}
							color="primary"
							onChange={onChangeHandler}
						/>

						<EditableSpan value={t.title} onChange={onTitleChangeHandler} />
						<IconButton onClick={onClickHandler}>
							<Delete />
						</IconButton>
					</div>
				})
			}
		</div>
		<div>
			<Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
				onClick={onAllClickHandler}
				color={'inherit'}
			>All
			</Button>
			<Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
				onClick={onActiveClickHandler}
				color={'primary'}>Active
			</Button>
			<Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
				onClick={onCompletedClickHandler}
				color={'secondary'}>Completed
			</Button>
		</div>
	</div>
}


