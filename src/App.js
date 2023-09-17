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

	// Effect Hook to load notes from sessionStorage (runs just once on initial render with empty dependency array as second argument to useEffect)
	useEffect(() => {
		let local_notes = [];
		try {
			local_notes = localStorage.getItem(local_storage_key);
			if ( !([null, undefined].includes(local_notes)) ) local_notes = JSON.parse(local_notes);
		}
		catch (error_information) {
			console.error(error_information);
			local_notes = [];
		}
		notes = local_notes;	// This is a temporary work-around for development run to prevent clearance of notes as observed during double executions of the following Effect. Production build already works fine directly without this warning-generating assignment required.
		setNotes( local_notes );
	}, []);

	// Effect Hook to save notes to sessionStorage on every update and render by setNotes()
	useEffect(function() {
		try {
			localStorage.setItem(local_storage_key, JSON.stringify(notes));	// .removeItem() to clear before this .setItem() should be optional
		}
		catch (exception_information) {
			console.error(exception_information);
		}
	}, [notes]);

	return (
		<div className="Application">
			<header className="App-header">
				<nav></nav>
			</header>
			<section className="contents">
				<h1>Quick Notes</h1>
				{notes && notes.map( (note, index) => 
					note && typeof(note) === typeof(Object()) && 
					<NotesCard title={note.title} detail={note["content"]} className={note["custom_properties"] ? note["custom_properties"]:"default"} key={index} />
				)}
				<article className="options">
					<button className="option" id="addition" onClick={ () => { 
						let title=prompt("Enter a brief title:"); 
						let content=prompt("Enter single-line content:"); 
						if (title || content) {
							setNotes(previous_notes => previous_notes.concat([{title, content, custom_properties:""}]));	// setting 'notes' by updating from previous state
						}
					} }>
						Add Note
					</button>
					<button type="reset" className="option" id="clearance" onClick={ () => {
						let decision = window.confirm("Are you sure?\nPlease note that this action is not reversible and will delete all your notes stored locally."); 
						if (decision === true) { setNotes([]); } 
					} }>
						Delete All
					</button>
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
			<article className={"note-card " + this.props.className}>
				<h4 className="note-title">{this.props.title}</h4>
				<p className="note-detail">{this.props.detail}</p>
			</article>
		)
	}
}

export default App;
