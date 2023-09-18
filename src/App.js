// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Global Variable(s) for this file
var local_storage_key = "Quick_Notes";

// Components
	// App component for Single Page Application (SPA) home
function App() {
	var noteSync = useRef(false);			// ref state maintained as flag for preventing first useEffect render against resetting localStorage data
	var [notes, setNotes] = useState([]);	// State Hook for notes in JSON

	// Helper function to update a note
	function update_note(index) {
		let note_entry = notes[index];
		let title = prompt("Update title:", note_entry && note_entry.title);
		let content = prompt("Update content:", note_entry && note_entry.content);
		if (title || content) {
			let response = window.confirm(`Ready to update this note with\n title: ${title}.\n content: ${content}\n ?`);
			if (response === true) {
				setNotes((notes) => { notes[index]["title"] = title; notes[index]["content"] = content; return notes.concat([]); });
			}
		}
		else {
			let response = window.confirm("No input recevied. Would you like to clear this note from the notes list?");
			if (response === true) {
				setNotes(notes => notes.filter((_, indice) => indice !== index));
			}
		}
	}

	// Effect Hook to load notes from sessionStorage (runs just once on initial render with empty dependency array as second argument to useEffect)
	useEffect(() => {
		let local_notes = [];
		try {
			local_notes = localStorage.getItem(local_storage_key);
			if ( !([null, undefined].includes(local_notes)) ) local_notes = JSON.parse(local_notes);
			else local_notes = [];
		}
		catch (error_information) {
			console.error(error_information);
			local_notes = [];
		}
		setNotes( local_notes );
	}, []);

	// Effect Hook to save notes to sessionStorage on every update and render by setNotes()
	useEffect(function() {
		if (noteSync.current) {		// Check to prevent first blank render initially triggered on component render
			try {
				localStorage.setItem(local_storage_key, JSON.stringify(notes));	// .removeItem() to clear before this .setItem() should be optional
			}
			catch (exception_information) {
				console.error(exception_information);
			}
		}
		else { noteSync.current = true; }
	}, [notes]);

	return (
		<div className="Application">
			<header className="App-header">
				<nav>
					<h1>Quick Notes</h1>
				</nav>
			</header>
			<section className="contents">
				{notes && notes.map( (note, index) => 
					note && typeof(note) === typeof(Object()) && 
					<NotesCard title={note.title} detail={note["content"]} className={note["custom_properties"] ? note["custom_properties"]:"default"} key={index} onClick={()=>update_note(index)} />
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
				<a href="https://github.com/Git-Harshit/Quick-Notes" className="link"> Open-sourced with GitHub </a>
				<img src={logo} className="react-logo" alt="React"/>
				<p> Created using &#9;{/* &tab; = &#0009; */}
					<a className="link App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
				</p>
			</footer>
		</div>
	);
}

	// NotesCard component for an individual note 
class NotesCard extends React.Component {
	render() {
		return (
			<article className={"note-card " + this.props.className} onClick={this.props.onClick} title="Click to edit this note">
				<h4 className="note-title">{this.props.title}</h4>
				<p className="note-detail">{this.props.detail}</p>
			</article>
		)
	}
}

export default App;
