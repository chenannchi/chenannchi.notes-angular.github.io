import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss'
})
export class NoteDetailsComponent {

  note!: Note;
  noteId!: number;
  new!: boolean;

  constructor(private noteService: NotesService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // console.log("params.id",params['id'])
      this.note = new Note();
      if (params['id']) {
        console.log("get");
        this.note = this.noteService.get(params['id']);
        console.log("this.note",this.note);
        this.noteId = params['id'];
        this.new = false;
      } else {
        console.log("new");

        this.new = true;
      }
    })


    

  }

  onSubmit(form: NgForm) {
    console.log("new",this.new)

    if (this.new) {

      this.noteService.add(form.value)
    } else {
      this.noteService.update(this.noteId, form.value.title, form.value.body)
    }
    this.router.navigateByUrl('/')
  }

  cancel() {
    this.router.navigateByUrl('/')
  }
}
