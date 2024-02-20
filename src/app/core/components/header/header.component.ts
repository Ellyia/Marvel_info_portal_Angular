
import { Component } from '@angular/core';
import { NavigationComponent } from '@core/components/navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
