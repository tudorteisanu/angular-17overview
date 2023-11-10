import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() items: any = [];
  @Input() headers: any = [];
  @Output() onDeleteItem = new EventEmitter();

  emitDelete(id: string) {
    this.onDeleteItem.emit(id);
  }
}
