import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;


  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }


  ngOnInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null)
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10)

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block')
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'flex')
    }

  }
}
