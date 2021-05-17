import { Component } from '@angular/core';
import { DataTransferService } from './services/datatransfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: DataTransferService) {

  }

  title = 'StackTomeTest';

  fileChange(event) {

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let fileReader: FileReader = new FileReader();
    if (fileList.length) {

    fileReader.onloadend = () => {

      let str = JSON.parse(JSON.stringify(fileReader.result));
      str = str.replace(/\r\n/g, '');
      str = str.split(' ').join('');

      let arr = JSON.stringify(eval(str));
      this.dataService.chartDataLoaded(JSON.parse(arr));

    };

    fileReader.readAsText(file);
  }
  else
  {
      let arr = [];
      this.dataService.chartDataLoaded(arr);
  }
  }
}
