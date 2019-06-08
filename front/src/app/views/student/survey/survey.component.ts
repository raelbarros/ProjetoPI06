import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { QuestionService } from 'src/app/services/question/question.service';
import { Question } from 'src/app/models/question';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from 'src/app/models/sudent';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective

  questionList: Array<Question> = new Array<Question>();
  columns = ['numero', 'pergunta', 'concordo', 'descordo'];
  previous: string;

  maxVisibleItems: number = 10;

  lastPage = false;

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private studentService: StudentService) {
  }

  getIdUrl: string;
  student: Student;

  ngOnInit() {
    this.updateTable();
    this.getIdUrl = this.route.snapshot.paramMap.get('student');

    this.studentService.readById(this.getIdUrl).subscribe((studentid) => {
      this.student = studentid;
      console.log(this.student);
    });

  }

  updateTable() {
    this.questionService.read().subscribe(list => {
      this.questionList = list;

      this.mdbTable.setDataSource(this.questionList);
      this.questionList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  checkPagination() {

    if (this.mdbTablePagination.checkIfNextShouldBeDisabled()) {
      this.lastPage = true;
    }

  }



  questionsMissing: Array<any> = new Array<any>();

  checkQuestionsMissing() {
    this.questionsMissing = [];

    for (let index = 0; index < this.questionList.length; index++) {

      if (this.questionList[index].answer == null) {
        this.questionsMissing[this.questionsMissing.length] = index + 1;
      }
    }

    if (this.questionsMissing.length == 0) {
      console.log("questionario está completo!");
      return true;
    }
  }

  estilo1: number = 0;
  estilo2: number = 0;
  estilo3: number = 0;
  estilo4: number = 0;

  checkStyle() {

    if (this.checkQuestionsMissing() == true) {/* Mover essa chaves para o final do for */ }


    console.log("começou a checar o estilo")
    for (let index = 0; index < this.questionList.length; index++) {

      // console.log(this.questionList[index].category.id)
      // console.log(this.questionList[index].answer)

      if ((this.questionList[index].category.id == 1) && (this.questionList[index].answer == "true")) {
        this.estilo1++;
      } else if ((this.questionList[index].category.id == 2) && (this.questionList[index].answer == "true")) {
        this.estilo2++;
      } else if ((this.questionList[index].category.id == 3) && (this.questionList[index].answer == "true")) {
        this.estilo3++;
      } else if ((this.questionList[index].category.id == 4) && (this.questionList[index].answer == "true")) {
        this.estilo4++;
      }


    }

    console.log("estilo1: " + this.estilo1)
    console.log("estilo2: " + this.estilo2)
    console.log("estilo3: " + this.estilo3)
    console.log("estilo4: " + this.estilo4)


  }

}
