import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartData } from '../models/chartdata';
import { DataTransferService } from '../services/datatransfer.service';

@Component({
  selector: 'app-mainchart',
  templateUrl: './mainchart.component.html',
  styleUrls: ['./mainchart.component.css']
})
export class MainchartComponent {

  constructor(private dataService: DataTransferService) {

    this.dataReceiver = this.dataService.currentData.subscribe(data => {

      this.data = this.prepareData(data);

    });
  }

  private dataReceiver: Subscription;

  public chartColors = ['Blue', 'Red', 'Yellow', 'Green'];
  type = 'line';
  public options = {
    responsive: true,
    maintainAspectRatio: false
  };
  public data: ChartData;

  prepareData(rawdata): ChartData {
    let outputData: ChartData;

    if(rawdata.length) {

    let arrLabels = Array.from(new Set(rawdata.map(data => data.prevOrders)));

    let arrDatasets = [];
    let colorNumber = 0;

    arrLabels.forEach((label) => {

      let arrLabels = rawdata
        .filter(data => data.prevOrders === label)
        .map(data => {
          return data.rating;
        });

      let arrDataset = rawdata
        .filter(data => data.prevOrders === label)
        .map(data => {
          return data.ltvLift;
        });


      arrDatasets.push({
        label: 'prevOrders ' + label,
        data: arrDataset,
        borderColor: this.chartColors[colorNumber],
        backgroundColor: this.chartColors[colorNumber]
      })

      outputData = {
        labels: arrLabels,
        datasets: arrDatasets
      };
      colorNumber++;

    })
    return outputData;
  }
  else {
      outputData = {
        labels: [],
        datasets: []
      };
      return outputData;

  }
  }

  ngOnDestroy(): void {

    this.dataReceiver.unsubscribe;

  }
}
