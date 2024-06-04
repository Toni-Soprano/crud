import { Component } from '@angular/core';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent { 
  selectedComponent: string = 'manage'; // Default selected component
  activeItem: string = 'manage'; // Track active item

  selectComponent(component: string): void {
    this.selectedComponent = component;
    this.activeItem = component;
  }
}
