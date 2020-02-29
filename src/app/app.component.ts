import { Component, OnInit, Inject } from '@angular/core';
import { NasaApiService } from './nasa-api.service';
import { ApiObj } from './api-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NASA-API';
  apiData: ApiObj;
  maxDate = new Date().toISOString().split('T')[0];

  constructor(private apiService: NasaApiService,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.getPicOfDay(today);
  }

  dateChange() {
    const newDate = this.apiData.date;
    this.apiData = null;
    this.getPicOfDay(newDate);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getPicOfDay(setDate: string) {
    this.apiService.getAPOD(setDate).subscribe(
      (result: ApiObj) => {
        this.apiData = result;
      },
      error => {
        this.toastr.warning('Date cannot exceed ' + new Date().toISOString().split('T')[0]);
        this.getPicOfDay(new Date().toISOString().split('T')[0]);
      }
    );
  }
}
