import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() hasNext = false;
  @Input() hasPrev = false;
  @Output() pageChange = new EventEmitter<'next' | 'prev'>();

  onPrevious(): void {
    if (this.hasPrev) {
      this.pageChange.emit('prev');
    }
  }

  onNext(): void {
    if (this.hasNext) {
      this.pageChange.emit('next');
    }
  }
}
