import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easyprint';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  geojsonStyle: any
  aReg: any[] = ["Liguria", "Puglia", "Sicilia", "Sicilia"]
  constructor(public http: HttpClient) { }

  private initMap(): any {
    this.geojsonStyle = {
      fillColor: 'grey',
      fillOpacity: 0.2,
      color: 'black',
      weight: 1
    };
    this.map = L.map('map', {
      center: [41.87194, 12.56738],
      zoom: 6,
      zoomDelta: 0.25,
      zoomSnap: 0,
      worldCopyJump: false

    });

    this.http.get<any>('assets/limits_IT_regions.geojson').subscribe(geojsonData => {
      console.log(geojsonData)
      const regionsLayer = L.geoJSON(geojsonData, {
        onEachFeature: (feature, layer) => {
          const pathLayer = layer as L.Path; // Cast esplicito a L.Path
          const reg_name = feature.properties.reg_name;
          const prov_name = feature.properties.prov_name;
          let click = false
          layer.on('click', (event) => {
            click = !click
            if (click) {
              pathLayer.setStyle({ fillColor: 'green' });
            } else {
              pathLayer.setStyle({ fillColor: 'grey' });

            }
            pathLayer.bindPopup(`Regione: ${reg_name}`).openPopup();
            console.log(feature)
          });
        },
        style: this.geojsonStyle
      });
      regionsLayer.addTo(this.map);
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