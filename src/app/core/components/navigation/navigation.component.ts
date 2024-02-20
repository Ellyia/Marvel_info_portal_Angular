import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActiveRouteNavigationEnum } from '@core/enums/active-route-nav.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnDestroy {
  activeRouteNavigationEnum = ActiveRouteNavigationEnum;

  activeTab: ActiveRouteNavigationEnum = ActiveRouteNavigationEnum.CharactersRoute;

  routerSub!: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeTabHighlight();
      }
    })
  }

  toCharacters(): void {
    this.router.navigate(['characters']);
  }

  toComics(): void {
    this.router.navigate(['comics']);
  }

  toUs(): void {
    // this.router.navigate(['weAre']);
  }

  activeTabHighlight() {
    const currentRoute = this.router.url; // this.activatedRoute.snapshot;

    if (currentRoute.includes('characters')) {
      this.activeTab = ActiveRouteNavigationEnum.CharactersRoute;
    } else if (currentRoute.includes('comics')) {
      this.activeTab = ActiveRouteNavigationEnum.ComicsRoute;
    } else if (currentRoute.includes('weAre')) {
      this.activeTab = ActiveRouteNavigationEnum.AboutUsRoute;
    } else {
      this.activeTab = ActiveRouteNavigationEnum.NotFoundRoute;
    }
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
