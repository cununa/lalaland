import { Injectable } from '@angular/core';
import { INote } from '../pages/customer-note/customer-note';
import { Events } from 'ionic-angular';

@Injectable()
export class NoteProvider {
    notes: INote[] = [];

    constructor(
        public events: Events
    ) { 
        this.initEvents()

    }

    private initEvents() { }

    initNotesFromServer(notes) {
        this.notes = notes
        this.events.publish('note:noteCountChanged')
    }

    getNotes() {
        return this.notes
    }

    addNote(newNote: INote) {
        if (typeof newNote === "undefined") {
            return;
        }

        this.notes.push(newNote)
        this.events.publish('note:noteCountChanged')
    }
    
    removeNote(removedNoteId: string) {
        this.notes = this.notes.filter((note) => note._id !== removedNoteId)
        this.events.publish('note:noteCountChanged')
    }

    updateNote(updatedNote) {
        this.notes = this.notes.map((note) => {
            if (note._id === updatedNote._id) {
                return updatedNote
            }
            return note
        })
        
    }
}

