import { Component, OnInit } from '@angular/core';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { animate, stagger, style, transition, trigger, query } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  animations: [
    trigger('itemAnim', [
      // Entry Animation
      transition('void => *', [
        // set the initial state
        style({
          height: 0, opacity: 0, transform: 'scale(0.85)', 'margin-bottom': 0,
          paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68)
      ]),

      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.7
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0'
        })),

      ])
    ]),
    trigger('listAnim',
      [
        transition('* => *',[
          query(':enter',[
            style({
              opacity:0,
              height:0,

            }),
            stagger(100,[
              animate('0.2s ease')
            ])
          ],{optional:true})
        ]

        )
      ]
    )
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = new Array<Note>()

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll()
  }

  deleteNote(id: number) {
    this.notesService.delete(id)
  }
}
