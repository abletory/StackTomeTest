import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  //obs = new Observable();



  private rawData = new Subject();
  currentData = this.rawData.asObservable();

  chartDataLoaded(value) {

    this.rawData.next(value);
  }
}
