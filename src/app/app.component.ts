import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapsComponent} from './maps/maps.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learningLeaflet';
}
