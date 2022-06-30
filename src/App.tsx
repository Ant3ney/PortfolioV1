import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';

function App() {
	return (
		<div className='App'>
			<Header />
			<div></div>
		</div>
	);
}

function LandingScreen() {
	return <div className=''></div>;
}

function Header() {
	return (
		<header className='flex flex-row w-screen'>
			<nav className='flex w-full portfolio-container'>
				<ul className='mr-auto flex'>
					<li className='h-full w-auto p-6'>
						<a href='#'>Home</a>
					</li>
				</ul>
				<ul>
					<li className='h-full w-auto p-6'>
						<a href='#'>Download Resume</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default App;
