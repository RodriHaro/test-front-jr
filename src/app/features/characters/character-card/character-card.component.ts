import { Component, Input } from '@angular/core';
import { Character } from '../../../core/models/character';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css',
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: Character;

  getStatusClass(): string {
    return this.character.status.toLowerCase();
  }

  getStatusEmoji(): string {
    switch (this.character.status.toLowerCase()) {
      case 'alive':
        return '✅';
      case 'dead':
        return '❌';
      default:
        return '❓';
    }
  }
}
