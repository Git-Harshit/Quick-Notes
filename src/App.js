// Dependencies
import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import "bootstrap/scss/bootstrap.scss";
import './App.scss';
const Bootstrap = require('bootstrap');		// Such require() import, if used, must be below all import statements as used above

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
		let content = prompt("Update content:", note_entry && decodeURIComponent(note_entry.content));
		if (title || content) {
			let response = window.confirm(`Ready to update this note with\n title: ${title}.\n content: ${content}\n ?`);
			if (response === true) {
				setNotes((notes) => { notes[index]["title"] = title; notes[index]["content"] = content; notes[index]["timestamp"] = Date().toLocaleString(); return notes.concat([]); });
			}
		}
		else {
			let response = window.confirm("No input received. Would you like to clear this note from the notes list?");
			if (response === true) {
				delete_note(index);
			}
		}
	}

	// Helper function to delete a note
	function delete_note(index) {
		setNotes(notes => notes.filter((_, indice) => indice !== index));	// setting 'notes' by updating from previous state
	}

	// Effect Hook to load notes from sessionStorage (runs just once on initial render with empty dependency array as second argument to useEffect)
	useEffect(() => {
		let local_notes = [];
		try {
			local_notes = localStorage.getItem(local_storage_key);
			if ( !([null, undefined].includes(local_notes)) ) {
				try {
					local_notes = atob(local_notes);	// Decoding btoa() Base64 encoding
				}
				catch (error) {
					if (error.name !== "InvalidCharacterError")
						throw error;	/* For any other error than Decoding Error, throwing error for outer try-catch to handle */
				}
				local_notes = JSON.parse(local_notes);
			}
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
				localStorage.setItem(local_storage_key, btoa(JSON.stringify(notes)));	// btoa() for Base64 encoding of data string, .removeItem() to clear before this .setItem() should be optional
			}
			catch (exception_information) {
				console.error(exception_information);
			}
		}
		else { noteSync.current = true; }
	}, [notes]);

	return (
		<div className="Application text-bg-light" data-bs-theme="light">
			<header className="App-header">
				<nav className="navbar navbar-expand-md px-1 justify-content-between" role="navigation">
					<a href="/Quick-Notes" className="link navbar-brand"> Quick Notes </a>
					<button type="button" className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="#navigation" aria-expanded="false" aria-label="Toggle Navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<ul className="navbar-nav align-items-center navbar-collapse collapse flex-grow-0" id="navigation">
						<li className="nav-item">
							<button type="button" className="btn nav-link" onClick={()=>{
								let application_body = document.querySelector(".Application");
								if (application_body) {
									if (application_body.classList.contains("text-bg-light")) {
										application_body.classList.add("text-bg-dark");
										application_body.classList.remove("text-bg-light");
										application_body.setAttribute("data-bs-theme", "dark")
									}
									else {
										application_body.classList.toggle("text-bg-light");
										application_body.classList.toggle("text-bg-dark");
										application_body.setAttribute("data-bs-theme", "light")
									}
								}
							}}>
								<i className="bi bi-circle-half"></i>Toggle Dark Mode
							</button>
						</li>
						<li className="nav-item">
							<button type="button" className="btn nav-link" data-bs-toggle="modal" data-bs-target="#bulk-import-modal">Import Notes</button>
						</li>
						<li className="nav-item">
							<a href="#top" className="btn nav-link" tabIndex={0} role="button" onMouseOver={ event => {
								let download_link = event && event.target && event.target.tagName === 'A' && event.target;
								if (download_link) {
									let popover = Bootstrap.Popover.getOrCreateInstance(download_link, { "content": "No notes available to export", component:download_link.parentElement, trigger: "hover focus", timeout:5 });
									if (notes.length > 0) {
										download_link.href = "data:text/javascript;base64,"+btoa(JSON.stringify(notes));
										download_link.download = "all_notes.json";
										popover.setContent({".popover-body":"Saved!"});
										popover.dispose();
									}
									else {
										download_link.setAttribute("href", "#");
										download_link.removeAttribute("download");
										popover.setContent({".popover-body":"No notes found."});
										popover.show();
									}
								}
							} }>
								Export Notes
							</a>
						</li>
					</ul>
				</nav>
				<div className="modal fade" id="bulk-import-modal" aria-labelledby="bulk-import-title" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header">
								<h3 className="modal-title" id="bulk-import-title">Bulk Import Notes</h3>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<label htmlFor="bulk-import-notes">Import a compatible file</label>
								<input type="file" name="notes-file" id="bulk-import-notes" className="form-control" accept="application/JSON,text/plain"
									onChange={(event) => {
										let import_file = event.target.files.item(0);
										let import_button = document.getElementById("bulk-import-trigger");
										if (import_file) {
											let reader = new FileReader(), notes_preview = document.getElementById("notes-preview"), new_notes;
											reader.readAsText(import_file);
											// Event(s) Handler function for 'reader'
											function handleFilReadEvent(event) {
												if (event.type === "loadstart" && notes_preview) {
													notes_preview.innerHTML = "<br/>Loading content ...";
												}
												else if (event.type === "loadend") {
													if (import_button) {
														import_button.innerText = "Import";
														import_button.classList.remove("invisible");
														import_button.removeAttribute("disabled");
														// Adding click handler for Import Button
														import_button.onclick = ()=>{
															import_button.setAttribute("disabled", "");
															if (new_notes.length > 0) {
																setNotes( last_notes => last_notes.concat( new_notes ) );
																// Clearing input and dismissing modal
																notes_preview && (notes_preview.innerText = "");
																let dismiss_button = document.getElementById("bulk-import-dismiss");
																if (dismiss_button) dismiss_button.click();
															}
															else {
																import_button.innerText = "Not added";
															}
														};
													}
												}
												else if (event.type === "load") {
													try {
														// Parsing file text into array of notes
														new_notes = reader.result.trim();
														new_notes = (new_notes === "") ? [] : JSON.parse(new_notes);
														if (Array.isArray(new_notes) !== true) new_notes = [new_notes];		// Converting individual note into Array of that note to support importing individual note Object as well from reader.result

														new_notes = new_notes.map( note => (note.title || note.content) && { title:note.title, content:note.content, creation_timestamp: note["timestamp"] ? note.timestamp : ( note.creation_timestamp || Date().toLocaleString() ) } );	// Filtering data using the required fields of notes for importing, ensuring that a note is only imported if it holds a title or content data, with creation_timestamp field either re-used or set

														if (notes_preview) {
															if (new_notes.length > 0) {
																notes_preview.innerHTML = "<label><em>Preview:</em></label><br/><br/>";
																new_notes.forEach( note => notes_preview.innerHTML += `<h6>${note.title}</h6><p>${decodeURIComponent(note.content)}</p>` );
															}
															else notes_preview.innerText = "No notes found. Please try again using another file.";
														}
													}
													catch (error_information) {
														if (notes_preview) notes_preview.innerHTML = "Failure! Invalid data received, expecting collection of notes in a JSON File Format."
													}
												}
												else if (event.type === "error" && notes_preview) {
													notes_preview.classList.add("text-danger");
													notes_preview.innerHTML = reader.error;
												}
											};
											// Assigning the above EventHandler to below events
											reader.onloadstart = handleFilReadEvent;
											reader.onload = handleFilReadEvent;
											reader.onloadend = handleFilReadEvent;
											reader.onerror = handleFilReadEvent;
										}
									}}
								/>
								<p id="notes-preview" className="py-2"></p>
							</div>
							<div className="modal-footer justify-content-between">
								<button type="button" className="btn btn-outline-secondary" id="bulk-import-dismiss" data-bs-dismiss="modal" onClick={()=>{ let file_input = document.getElementById("bulk-import-notes"); if (file_input) file_input.value = ""; }}>Cancel</button>
								<button type="button" id="bulk-import-trigger" className="btn btn-outline-primary invisible" disabled>Import</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className="contents">
				{notes.length ? notes.map( (note, index) => 
					note && typeof(note) === typeof(Object()) && 
					<NotesCard title={note.title} detail={decodeURIComponent(note["content"])} timestamp={note["timestamp"] ? note["timestamp"]:note["creation_timestamp"]} className={note["custom_properties"] ? note["custom_properties"]:"default"} key={index} editor={()=>update_note(index)} deletion={()=>{let decision = window.confirm("Are you sure to delete this note, permanently?"); if (decision) delete_note(index)}} />
					) :
					<p className="text-center fw-light py-5">No notes available. Get started by adding one.</p>
				}
				<article className="options">
					<form name="New Note" className="modal fade" tabIndex="-1" onSubmit={ event => {
						event.preventDefault();			// Prevent default submission behaviour leading to page reload
						let titlebox=document.getElementById("note-titlebox"), contentbox=document.getElementById("note-databox"), title, content = "";
						if (titlebox) {
							title = titlebox.value.trim();
							titlebox.value = "";		// Reset TitleBox value
						}
						if (contentbox) {
							content = contentbox.value.trim();
							contentbox.value = "";		// Reset ContentBox value
						}
						if (title || content) {
							setNotes(previous_notes => previous_notes.concat([{title, content: encodeURIComponent(content), creation_timestamp: Date().toLocaleString(), custom_properties:""}]));	// setting 'notes' by updating from previous state
							// Close the form after setting a note
							let closeButton = document.forms.namedItem("New Note").querySelector(".btn.btn-close");
							if (closeButton) closeButton.click();
						}
						else if (contentbox) {
							contentbox.setAttribute("required", "true");
							contentbox.checkValidity();
						}
					}}>
						<div className="modal-dialog modal-content">
							<div className="modal-header">
								<h3 className="modal-title">Add a new note</h3>
								<button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">	
								<label htmlFor="note-titlebox" className="form-label">Title:</label>
								<input id="note-titlebox" className="form-control" type="text" placeholder="Enter a brief title"/>
								<label htmlFor="note-databox" className="form-label">Content:</label>
								<textarea id="note-databox" className="form-control" rows="5" placeholder="Fill the contents here."/>
							</div>
							<div className="modal-footer justify-content-between">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
								<button type="submit" className="btn btn-primary" id="note-save"> Save </button>
							</div>
						</div>
					</form>

					<button type="button" className="option w-100 btn btn-primary" id="addition" onClick={ () => { 
						const newNoteModal = new Bootstrap.Modal(document.forms.namedItem("New Note"));
						newNoteModal.toggle();
					} }>
						Add Note
					</button>
					{(notes.length>0) && <button type="reset" className="option btn btn-secondary" id="clearance" onClick={ () => {
						let decision = window.confirm("Are you sure?\nPlease note that this action is not reversible and will delete all your notes stored locally."); 
						if (decision === true) { setNotes([]); } 
					} }>
						Delete All
					</button>}
				</article>
			</section>

			<footer className="App-footer footer">
				<a href="https://github.com/Git-Harshit/Quick-Notes" className="link"> Open-sourced with GitHub </a>
				<img src={logo} className="react-logo" alt="React"/>
				<p className="mt-3"> Created using &#9;{/* &tab; = &#0009; */}
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
			<article className={"card note-card text-reset " + this.props.className}>
				<article className="card-header d-flex justify-content-between">
					<i className="bi bi-pen-fill" onClick={this.props.editor} title="Edit this Note"></i> {/* <!-- For circular ones, try: <i className="bi bi-wrench-adjustable-circle"></i> --> */}
					<i className="bi bi-x-circle text-danger" onClick={this.props.deletion} title="Delete this Note"></i>
				</article>
				<article className="card-body">
					<h4 className="note-title">{this.props.title}</h4>
					<p className="note-detail">{this.props.detail}</p>
					<small className="note-datestamp fw-light text-secondary d-none">{this.props.timestamp}</small>
				</article>
			</article>
		)
	}
}

export default App;
