// Dependencies
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Components
	// App component for Single Page Application (SPA) home
function App() {
	var local_storage_key = "Quick_Notes";
	var [notes, setNotes] = useState([]);	// State Hook for notes in JSON

	// Effect Hook to load notes from sessionStorage
	useEffect(() => {
		let local_notes = localStorage.getItem(local_storage_key);
		if (local_notes !== null && local_notes !== undefined) {
			try {
				local_notes = JSON.parse(local_notes);
			}
			catch (error_information) {
				console.error(error_information);
				local_notes = [];
			}
			setNotes( notes.concat(local_notes) );
		}
		else {
			localStorage.setItem(local_storage_key, JSON.stringify([]));	// .removeItem() before this .setItem() should be optional
		}
	}, []);

	return (
		<div className="Application">
			<header className="App-header">
				<nav></nav>
			</header>
			<section className="contents">
				<h1>Quick Notes</h1>
				{notes.map( (note, index) => 
					<NotesCard title={note.title} detail={note["content"]} className={note["custom_properties"] ? note["custom_properties"]:"default"} key={index} />
				)}
			</section>
			<footer className="App-footer">
				<img src={logo} className="react-logo" alt="React"/>
				<p> Created using &#9;{/* &tab; = &#0009; */}
					<a className="link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
				</p>
			</footer>
		</div>
	);
}

	// NotesCard component for an individual note 
class NotesCard extends React.Component {
	render() {
		return (
			<article className="note-card">
				<h4 className="note-title">{this.props.title}</h4>
				<p className="note-detail">{this.props.detail}</p>
			</article>
		)
	}
}

export default App;
