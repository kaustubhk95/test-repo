import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiObj } from './api-model';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  private baseUrl = 'https://api.nasa.gov/planetary/apod?';
  private apiKey = 'LIY2Bxd7yG5RweCahGStfzr2E3H13fYtVgaitulq';
  constructor(private http: HttpClient) { }

  public getAPOD(date) {
    let apodUrl = this.baseUrl + 'api_key=' + this.apiKey;
    if (date) {
      apodUrl = apodUrl + '&date=' + date;
    }
    return this.http.get<ApiObj>(apodUrl);
  }
}
