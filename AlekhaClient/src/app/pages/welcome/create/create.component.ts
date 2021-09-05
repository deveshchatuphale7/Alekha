import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CommonService } from 'src/app/common.service';
// import * as XLSX from 'ts-xlsx';
 import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  current = 0;
  chartDataText:string;
  selectedTheme = 0;
  chartType:string;
  selectedMeasures:Array<any> = [];
  selectedDimensions:Array<any> = [];
  dimensions:Array<any> = [];
  measures:Array<any> = [];
  title :string;
  public segM(){
    console.log("this.chartDataText  ")
    console.log(this.chartDataText)

    console.log("this.chartDataText  ")
    console.log(this.chartDataText.split("\n"))
    this.dimensions = this.chartDataText.split("\n")[0].split(",");
    this.measures = this.chartDataText.split("\n")[0].split(",");

  }

  defaultFileList: NzUploadFile[] = [
    // {
    //   uid: '-1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-2',
    //   name: 'yyy.png',
    //   status: 'error'
    // }
  ];


  arrayBuffer:any;
file:File;
incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
}

// public onFileUpload(para){
//   console.log("para ");
//   console.log(para);

//     /* wire up file reader */
//     var target: any;// DataTransfer = <DataTransfer>(event.target);
//     // if (target.files.length !== 1) {
//     //   throw new Error('Cannot use multiple files');
//     // }
//     const reader: FileReader = new FileReader();
//     reader.readAsBinaryString(para.fileList[0]);
//     reader.onload = (e: any) => {
//       /* create workbook */
//       const binarystr: string = e.target.result;
//       const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

//       /* selected the first sheet */
//       const wsname: string = wb.SheetNames[0];
//       const ws: XLSX.WorkSheet = wb.Sheets[wsname];

//       /* save data */
//       const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//       console.log(data); // Data will be logged in array format containing objects
//     };
// }

  fileList2 = [...this.defaultFileList];

  index = 'First-content';
  options
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    
    if(this.current == 0){
      let dems = this.chartDataText.split("\n")[0].split(",")
      dems.forEach((item)=>{
        this.dimensions.push({"label":item,"value":item});  
        this.measures.push({"label":item,"value":item});
      })
      // this.dimensions = this.chartDataText.split("\n")[0].split(",");
      // this.measures = this.chartDataText.split("\n")[0].split(",");
    }

    console.log(this.dimensions)
    console.log(this.measures)
    this.current += 1;
    
    let colorpalet=[['#cdffeb','#009f9d','#07456f','#0f0a3c'],
    ['#ff8484','#d84c73','#5c3b6f','#35234b'],
    ['#45b7b8','#706381','#2c3848','#f7de1c'],
    ['#dcedc2','#ffd3b5','#ffaaa6','#ff8c94'],
    ['#f2f4b2','#cce490','#0c907d','#0d627a'],
    ['#f38181','#fce38a','#eaffd0','#95e1d3'],
    ['#f9ed69','#f08a5d','#b83b5e','#6a2c70'],
    ['#e5f9bd','#a0e418','#7fb414','#525050'],
    ['#feceab','#ff847c','#eb4a5f','#2a363b'],
    ['#2d5c7f','#fff1a8','#ff8f56','#984a59'],
    ['#61c2dd','#ff9c75',"#ce3d51"],['#E5E059','#D7263D','#2D3142']];

    if(this.current == 3){

      
      // echarts.dispose(document.getElementById('mychart'));
      // let chart = echarts.init(document.getElementById('mychart'));
         let dimInd = this.chartDataText.split("\n")[0].split(",").indexOf(this.selectedDimensions[0]);
         let catData = []
         let allData:any = this.chartDataText.split("\n");

         allData.shift()
         allData.forEach(element => {
           catData.push(element.split(",")[dimInd])
         });

        
         let measInd = this.chartDataText.split("\n")[0].split(",").indexOf(this.selectedMeasures[0]);
         let mesData = []
        
         allData.forEach(element => {
           mesData.push(element.split(",")[measInd])
         });

       
       let option = {
         title: {
           text: this.title,
           show:false,
       },
       tooltip : {
           trigger: 'item',
           formatter: "{b} : {c} "
       },
       toolbox: {
         showTitle: false,
         show: true,
         orient: 'vertical',
         left: 'right',
         top: 'center',
         feature: {
           restore: { show: true },
           saveAsImage: { show: true }
         }
       },
       legend: {
           // orient: 'vertical',
           // top: 'middle',
           bottom: 10,
           left: 'center',
           show:false
           // data: legendData,
       },
    
  };

option["color"] = colorpalet[Math.floor(this.selectedTheme)]
     option["xAxis"] = {
       type: 'category',
       data:catData,
       axisLabel: {
         interval: 0,
         rotate: -25
      },
   };

   option["yAxis"] = {
     type: 'value'
   };


   option["series"]= [{
     data: mesData,
     type: this.chartType
 }]
      
 this.options = option;
// var option1:any = {
//   xAxis: {
//       type: 'category',
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//       type: 'value'
//   },
//   series: [{
//       data: [150, 230, 224, 218, 135, 147, 260],
//       type: 'line'
//   },
//   {
//       data: [15, 23, 24, 218, 135, 147, 260],
//       type: 'line'
//   }]
// };
      setTimeout(() => {

        let chart = echarts.init(document.getElementById("mychart"));
        chart.setOption(option);
        this.common.createNotification("info","Success","Your chart is ready" )
      }, 500);
    }
    
    // this.changeContent();
  }

  done(): void {

    this.common.httpPost("http://localhost:3000/savechart",{"email":this.common.loginEmail,"title":this.title,"options": JSON.stringify(this.options)}).subscribe((res:any)=>{
      console.log(res);
      this.common.createNotification("info","Done","Your chart has been saved !" )

    })
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  constructor(private common:CommonService) { }

  ngOnInit(): void {
  }

}
