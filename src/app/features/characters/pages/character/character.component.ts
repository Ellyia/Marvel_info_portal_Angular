import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomMarvelChar } from '@characters/models/characters.model';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {

  // data!: CustomMarvelChar;
  name: string = '';
  img: string = '';
  description: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.name = this.route.snapshot.queryParams['name'];
    this.description = this.route.snapshot.queryParams['description'];
    this.img = this.route.snapshot.queryParams['thumbnailUrl'];
  }
}
