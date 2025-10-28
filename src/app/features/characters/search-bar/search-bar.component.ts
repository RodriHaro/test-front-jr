import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchTerm = '';

  onSearch(): void {
    const term = this.searchTerm.trim();
    this.searchChange.emit(term);
  }

  onClear(): void {
    this.searchTerm = '';
    this.searchChange.emit('');
  }
}
