import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActiveRouteNavigationEnum } from '@core/enums/active-route-nav.enum';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnDestroy {
  activeRouteNavigationEnum = ActiveRouteNavigationEnum;

  activeTab: ActiveRouteNavigationEnum = ActiveRouteNavigationEnum.Characters;

  routerSub!: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.activeTabHighlight());
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
    const currentRoute = this.router.url;

    if (currentRoute.includes('characters')) {
      this.activeTab = ActiveRouteNavigationEnum.Characters;
    } else if (currentRoute.includes('comics')) {
      this.activeTab = ActiveRouteNavigationEnum.Comics;
    } else if (currentRoute.includes('weAre')) {
      this.activeTab = ActiveRouteNavigationEnum.AboutUs;
    } else {
      this.activeTab = ActiveRouteNavigationEnum.NotFound;
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
