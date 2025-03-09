import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {
  @Input({ required: true }) setModal: any = () => { }

  closeModal(e: MouseEvent) {
    this.setModal(false)
  }

  avoidUnexpectedClose(e: MouseEvent) {
    e.stopPropagation()

  }
}
