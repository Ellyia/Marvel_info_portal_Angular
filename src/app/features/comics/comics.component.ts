import { Component } from '@angular/core';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent {

  showComic(id: number) {
    console.log(id)
  }
}
