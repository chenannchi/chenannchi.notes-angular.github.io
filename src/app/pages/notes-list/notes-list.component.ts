import { Component, OnInit } from '@angular/core';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit{
  notes: Note[] = new Array<Note>()

  constructor(private notesService:NotesService){}

  ngOnInit(): void {
    this.notes = this.notesService.getAll()
  }

  deleteNote(id:number){
    this.notesService.delete(id)
  }
}
