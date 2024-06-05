import React, { Reducer, useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import { Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { ActionsType, AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodolistWithRedux } from './TodolistWithRedux';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}


function AppWithRedux() {
	// <Reducer<Array<TodolistType>, ActionsType>>
	let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

	const dispatch = useDispatch()

	function addTodolist(title: string) {
		// const action = AddTodolistAC(title)
		dispatch(AddTodolistAC(title))
	}


	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: "20px" }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{
						todolists.map(tl => {

							return <Grid key={tl.id} item>
								<Paper style={{ padding: "10px" }}>
									<TodolistWithRedux
										todolist={tl}
									/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</Container>
		</div>
	);
}

export default AppWithRedux;
