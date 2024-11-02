import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  standalone: true,
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, { zoomControl: true }).setView([-9.5524878, -74.9387723], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19

    }).addTo(this.map);

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  }

  showMap() {
    if (!this.map) {
      this.initMap();
    } else {
      this.map.invalidateSize();
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.map?.invalidateSize();
  }
}
