import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { Survey } from 'src/app/models/survet';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { ExcelService } from 'src/app/services/excel/excel.service';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  surveyList: Array<Survey> = [];
  categoryList: Array<Category> = [];
  dataExcel: any = [];


  constructor(private auth: AuthService, private loadService: NgxUiLoaderService, private excelService: ExcelService, private surveyService: SurveyService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadService.start();

    // Verifica se eh um adm
    this.auth.isAdmin();

    this.surveyService.read().subscribe((list) => {
      this.surveyList = list;

      this.categoryService.read().subscribe((list) => {
        this.categoryList = list;


        this.createDataExcel();

        this.namesCategory();
        this.countAnswers();

        this.teste();

        this.loadService.stop();
      });
    });
  }

  // Data Excel
  createDataExcel() {
    for (const item of this.surveyList) {

      let auxData = new Date(item.date);
      let years = auxData.getFullYear();
      let month = auxData.getMonth() + 1;
      let day = auxData.getDate();
      let finalData = years + '-' + month + '-' + day;

      this.dataExcel.push({
        Aluno: item.student.firstName,
        Sobrenome: item.student.lastName,
        Email: item.student.email,
        Curso: item.student.course.name,
        Periodo: item.student.periodo,
        Faculdade: item.student.college.name,
        Tipo: item.student.college.tipo,
        Cidade: item.student.college.city.name,
        Estado: item.student.college.state.name,
        'Data(yyyy-mm-dd)': finalData,
        Resultado: item.category.name
      });
    }
  }

  downloadExcel() {
    this.excelService.exportAsExcelFile(this.dataExcel, new Date().toLocaleDateString());
  }

  //Config Grafico 02
  namesCategory() {
    for (const item of this.categoryList) {
      this.chartLabels02.push(item.name)
    }
  }

  countAnswers() {
    for (const item of this.surveyList) {
      for (const c of this.categoryList) {
        if (item.category.id == c.id) {
          c.answer += 1;
        }
      }

      let data = [];
      for (const item of this.categoryList) {
        data.push(item.answer);
      }
      this.chartDatasets02 = [{ data: data, label: 'Resposta' }]
    }
  }

  //Config Grafico 01
  teste() {
    let allMonth = []
    for (const item of this.surveyList) {
      let auxDate = new Date(item.date).getMonth() + 1;
      allMonth.push(auxDate);
    }

    let month = allMonth.filter((x, y) => allMonth.indexOf(x) == y);

    let teste = new Array();
    for (const item of month) {
      this.surveyService.readAllCategoryByMonth(item).subscribe((list) => {
        if (list) {
          teste.push(list.length)         
    
          console.log(teste)
          console.log(month)
          this.chartDatasets01 = [{ data: teste, label: 'Total de Respostas' }]
        }
      });
    }
    
  }

  // Grafico 01
  public chartType01: string = 'line';

  public chartDatasets01: Array<any> = [{}];

  public chartLabels01: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors01: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions01: any = {
    responsive: true
  };
  public chartClicked01(e: any): void { }
  public chartHovered01(e: any): void { }


  // Grafico 02
  public chartType02: string = 'horizontalBar';

  public chartDatasets02: Array<any> = [{
    data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'
  }];

  public chartLabels02: Array<any> = [];

  public chartColors02: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions02: any = {
    responsive: true
  };
  public chartClicked02(e: any): void { }
  public chartHovered02(e: any): void { }

  // Grafico 03
  public chartType03: string = 'pie';

  public chartDatasets03: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  public chartLabels03: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors03: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions03: any = {
    responsive: true
  };
  public chartClicked03(e: any): void { }
  public chartHovered03(e: any): void { }


}
