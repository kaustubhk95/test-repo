import { Component, OnInit, Inject } from '@angular/core';
import { NasaApiService } from './nasa-api.service';
import { ApiObj } from './api-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NASA-API';
  apiData: ApiObj;

  constructor(private apiService: NasaApiService,
              private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.apiService.getAPOD(today).subscribe(
      (result: ApiObj) => {
        this.apiData = result;
      }
    );
  }

  dateChange() {
    const newDate = this.apiData.date;
    this.apiData = null;
    this.apiService.getAPOD(newDate).subscribe(
      (result: ApiObj) => {
        this.apiData = result;
      }
    );
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
