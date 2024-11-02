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

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, { zoomControl: true }).setView([-9.5524878, -74.9387723], 6);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    const pickupLocation = L.marker([-9.5524878, -74.9387723], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      draggable: true
    }).addTo(this.map);
    pickupLocation.bindPopup('Punto de recogida').openPopup();


    const destinationLocation = L.marker([-8.109052, -79.021534], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      }),
      draggable: true
    }).addTo(this.map);
    destinationLocation.bindPopup('Punto de destino');


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
