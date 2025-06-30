import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  weatherForm: FormGroup;
  weatherData: any;
  errorMsg = '';

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required]
    });
  }

  getWeather() {
    const city = this.weatherForm.get('city')?.value;
    this.weatherService.getWeather(city).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.errorMsg = '';
      },
      error: () => {
        this.weatherData = null;
        this.errorMsg = 'City not found or API error!';
      }
    });
  }
}
