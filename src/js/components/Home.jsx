import React, { useState } from "react";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputTaskValue, setInputTaskValue] = useState('');
	const [totalTasksCreated, setTotalTasksCreated] = useState(0);

	const handleInputChange = (e) => {
		setInputTaskValue(e.target.value);
	};

	const addTask = () => {
		if (inputTaskValue.trim() !== '') {
			setTasks([...tasks, { id: Date.now(), text: inputTaskValue.trim() }]);
			setTotalTasksCreated(totalTasksCreated + 1);
			setInputTaskValue('');
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			addTask();
		}
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		setTotalTasksCreated(totalTasksCreated - 1);
	};

	return (
		<div className="container mx-auto p-6 max-w-md">
			<h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Todos</h1>
			
			{/* Task Counter */}
			<div className="mb-4 p-3 bg-blue-100 rounded-lg text-center">
				<p className="text-lg font-semibold text-blue-800">
					Total Tasks Created: {totalTasksCreated}
				</p>
				<p className="text-sm text-blue-600">
					Current Tasks: {tasks.length}
				</p>
			</div>

			{/* Input Section */}
			<div className="mb-4 flex gap-2">
				<input
					type="text"
					value={inputTaskValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder="What needs to be done?"
					className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={addTask}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Add
				</button>
			</div>

			{/* Task List */}
			<ol className="space-y-2">
				{tasks.length === 0 ? (
					<li className="text-center text-gray-500 py-4 italic">
						No tasks, add a task
					</li>
				) : (
					tasks.map((task) => (
						<li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
							<span className="flex-1 text-gray-800">{task.text}</span>
							<button 
								onClick={() => deleteTask(task.id)} 
								className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
							>
								×
							</button>
						</li>
					))
				)}
			</ol>
		</div>
	);
};

export default Home;