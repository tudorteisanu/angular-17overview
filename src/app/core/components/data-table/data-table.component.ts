import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
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
  @ContentChild('item') itemRef!: TemplateRef<any>;
  @ContentChild('actions') actionsRef!: TemplateRef<any>;
}
