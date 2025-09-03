import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker, GoogleMapsModule } from '@angular/google-maps';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

interface MarkerData {
  position: google.maps.LatLngLiteral;
  label: string | google.maps.MarkerLabel;
  title: string;
  options: google.maps.MarkerOptions;
}

@Component({
  selector: 'app-google-maps-examples',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, CardModule, ButtonModule],
  templateUrl: './google-maps-examples.component.html',
  styleUrl: './google-maps-examples.component.scss'
})
export class GoogleMapsExamplesComponent {
  // Basic map
  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  zoom = 11;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 3,
  };

  // Markers demo
  markers: MarkerData[] = [
    {
      position: { lat: 37.7749, lng: -122.4194 },
      label: 'SF',
      title: 'San Francisco',
      options: { draggable: false },
    },
    {
      position: { lat: 37.8044, lng: -122.2711 },
      label: 'OAK',
      title: 'Oakland',
      options: {},
    },
    {
      position: { lat: 37.6879, lng: -122.4702 },
      label: 'SFO',
      title: 'SFO Airport',
      options: {},
    },
  ];

  // Polygon demo
  polygonPaths: google.maps.LatLngLiteral[] = [
    { lat: 37.78, lng: -122.45 },
    { lat: 37.76, lng: -122.43 },
    { lat: 37.73, lng: -122.45 },
    { lat: 37.74, lng: -122.49 },
  ];
  polygonOptions: google.maps.PolygonOptions = {
    fillColor: '#8b5cf6',
    fillOpacity: 0.15,
    strokeColor: '#8b5cf6',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: true,
    editable: false,
    geodesic: false,
  };

  // Circle demo
  circleCenter: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
  circleOptions: google.maps.CircleOptions = {
    fillColor: '#22c55e',
    fillOpacity: 0.2,
    strokeColor: '#16a34a',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    clickable: false,
    editable: false,
    draggable: false,
    visible: true,
    radius: 2500,
  };

  // Heatmap-like markers (simple)
  heatMarkers: MarkerData[] = Array.from({ length: 20 }).map((_, i) => ({
    position: {
      lat: 37.7 + Math.random() * 0.2,
      lng: -122.52 + Math.random() * 0.3,
    },
    label: String(i + 1),
    title: `Point ${i + 1}`,
    options: { opacity: 0.7 },
  }));

  // Map type toggle
  isSatellite = false;

  toggleMapType(): void {
    this.isSatellite = !this.isSatellite;
    this.options = { ...this.options, mapTypeId: this.isSatellite ? 'hybrid' : 'roadmap' };
  }

  randomizeCenter(): void {
    this.center = {
      lat: 37.7 + Math.random() * 0.3,
      lng: -122.52 + Math.random() * 0.3,
    };
  }

  addMarker(): void {
    this.markers = [
      ...this.markers,
      {
        position: {
          lat: this.center.lat + (Math.random() - 0.5) * 0.1,
          lng: this.center.lng + (Math.random() - 0.5) * 0.1,
        },
        label: 'New',
        title: 'New Marker',
        options: {},
      },
    ];
  }
}
