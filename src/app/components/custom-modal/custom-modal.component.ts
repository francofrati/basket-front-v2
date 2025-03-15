import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent implements OnInit {
  @Input({ required: true }) setModal: any = () => { }

  closeModal(e: MouseEvent) {
    this.setModal(false)
    document.body.style.overflowY = 'unset';
  }

  avoidUnexpectedClose(e: MouseEvent) {
    e.stopPropagation()

  }

  ngOnInit(): void {
    document.body.style.overflowY = 'hidden';
  }
}
