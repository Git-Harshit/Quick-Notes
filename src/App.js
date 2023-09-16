// Dependencies
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Global Variable(s) for this file
var local_storage_key = "Quick_Notes";

// Components
	// App component for Single Page Application (SPA) home
function App() {
	var [notes, setNotes] = useState([]);	// State Hook for notes in JSON

	// Effect Hook to load notes from sessionStorage
	useEffect(() => {
		let local_notes = [];
		try {
			local_notes = localStorage.getItem(local_storage_key);
			if ( !([null, undefined].includes(local_notes)) ) local_notes = JSON.parse(local_notes);
			else {
				// Initializing with empty array as 'null' from getItem indicates that no such entry with the given key exists
				localStorage.setItem(local_storage_key, JSON.stringify([]));	// .removeItem() to clear before this .setItem() should be optional
			}
		}
		catch (error_information) {
			console.error(error_information);
			local_notes = [];
		}
		setNotes( (previous_notes) => previous_notes.concat(local_notes) );	// Update notes based on previous state
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
				<article className="options">
					<button className="option" id="addition" onClick={ () => { 
						let title=prompt("Enter a brief title:"); 
						let content=prompt("Enter single-line content:"); 
						if (title || content) { 
							setNotes(notes.concat([{title, content, custom_properties:""}])); 
							localStorage.setItem(local_storage_key, JSON.stringify(notes)) 
						}
					} }>
						Add Note
					</button>
					<button className="option" id="clearance" onClick={ () => { let decision = window.confirm("Are you sure?\nPlease note that this action is not reversible and will delete all your local notes stored here."); if (decision === true) localStorage.clear(local_storage_key) } }>Delete All</button>
				</article>
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
