import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easyprint';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map:any;

  constructor() { }

  private initMap(): any {

    this.map = L.map('map', {
      center: [41.87194, 12.56738],
      zoom: 6,
      zoomDelta: 0.25,
      zoomSnap: 0,
      worldCopyJump: false

    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      detectRetina: true,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    });

    tiles.addTo(this.map);
    return this.map
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap()
  }
}
