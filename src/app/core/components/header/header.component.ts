import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  toCharacters(): void {
    this.router.navigate(['characters']); // active red
  }

  toComics(): void {
    this.router.navigate(['comics']);
  }

  toUs(): void {
    // this.router.navigate(['/weAre']);
  }
}
