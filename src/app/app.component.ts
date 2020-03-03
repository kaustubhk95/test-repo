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
  minDate = new Date(1995, 5, 17).toISOString().split('T')[0];

  constructor(private apiService: NasaApiService,
              private sanitizer: DomSanitizer,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.getPicOfDay();
  }

  dateChange() {
    const newDate = this.apiData.date;
    this.apiData = null;
    this.getPicOfDay(newDate);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getPicOfDay(setDate?: string) {
    this.apiService.getAPOD(setDate).subscribe(
      (result: ApiObj) => {
        this.apiData = result;
      },
      err => {
        if (err.error.code === 500) {
          this.toastr.warning('Image not available for this date');
        } else if (err.error.code === 400) {
          this.toastr.warning(err.error.msg);
        }
        this.getPicOfDay();
      }
    );
  }
}
