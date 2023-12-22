import { Component } from '@angular/core';

@Component({
  selector: 'app-random-character',
  standalone: true,
  imports: [],
  templateUrl: './random-character.component.html',
  styleUrl: './random-character.component.scss'
})
export class RandomCharacterComponent {
  name = '';
  description = '';
  thumbnail = 'src';
  homepage = 'src1';
  wiki = 'src2';
}
