import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  allChartData:any;
  selectedTitle:string = "";
  isVisible:boolean = false;


    public viewFullscreen(index){
       
        this.selectedTitle = this.allChartData[index].title;
        this.showModal()
        setTimeout(() => {
          let options = JSON.parse(this.allChartData[index].chartoptions);
          let chart = echarts.init(document.getElementById("mychart"));
          chart.setOption(options);  
        }, 500);
        
    


    }

      showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  constructor(private common :CommonService) { }

  ngOnInit(): void {
    this.common.httpPost("http://localhost:3000/getcharts",{"email":this.common.loginEmail}).subscribe((res:any)=>{
      console.log("getcharts")  
    console.log(res)
    this.allChartData = res.data;

    setTimeout(() => {
      this.allChartData.forEach((element,index) => {
        let chart = echarts.init(document.getElementById("mychart"+index));
        var op = JSON.parse(element.chartoptions);
          op["toolbox"]["show"] = false;
        chart.setOption(op);
      });
    }, 1000);

    });
  }

}
