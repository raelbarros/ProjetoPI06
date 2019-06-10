import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from 'src/app/services/question/question.service';
import { Question } from 'src/app/models/question';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/sudent';
import { StudentService } from 'src/app/services/student/student.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { Survey } from 'src/app/models/survet';
import { SurveyService } from 'src/app/services/survey/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective

  questionList: Array<Question> = [];
  categoryList: Array<Category> = [];

  columns = ['numero', 'pergunta', 'concordo', 'descordo'];
  previous: string;

  maxVisibleItems: number = 10;

  questionsMissing: Array<any> = new Array<any>();

  lastPage = false;

  constructor(private questionService: QuestionService, private categoryService: CategoryService, private surveyService: SurveyService, private route: ActivatedRoute, private studentService: StudentService) {
  }

  getIdUrl: string;
  student: Student;

  ngOnInit() {
    this.updateTable();
    this.getIdUrl = this.route.snapshot.paramMap.get('student');

    this.studentService.readById(this.getIdUrl).subscribe((studentid) => {
      this.student = studentid;
    });


    this.categoryService.read().subscribe((list) => {
      this.categoryList = list;
    });
  }

  updateTable() {
    this.questionService.read().subscribe((list) => {
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

  checkQuestionsMissing() {
    this.questionsMissing = [];

    for (let index = 0; index < this.questionList.length; index++) {

      if (this.questionList[index].answer == null) {
        this.questionsMissing[this.questionsMissing.length] = index + 1;
      }

    }
    if (this.questionsMissing.length == 0) {

      return true;
    }
  }

  checkStyle() {
    if (this.checkQuestionsMissing() == true) {

      // verifica se o usuario respondeu 'Concordo'
      for (const item of this.questionList) {
        if (item.answer == "true") {
          if (item.category.answer == NaN || item.category.answer == undefined) {
            item.category.answer = 0;
          }
          item.category.answer += 1;
        }
      }

      // Contabiliza o total de respostas por categoria
      for (const item of this.questionList) {
        for (const ca of this.categoryList) {
          if (ca.name == item.category.name) {
            if (ca.answer == NaN || ca.answer == undefined) {
              ca.answer = 0;
            }
            ca.answer += item.category.answer;
          }
        }
      }

      // Pega a categoria com maior resposta
      let max = new Category();
      max.answer = 0;
      for (const item of this.categoryList) {
        if (item.answer > max.answer) {
          max = item;
        }
      }

      // Categoria do aluno
      console.log(max)

      let survey = new Survey();
      survey.category = max;
      survey.student = this.student

      this.surveyService.persist(survey).subscribe();

    } else {
      // mostrar modal com perguntas que faltam
    }
  }
}
