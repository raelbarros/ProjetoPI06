import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { QuestionService } from 'src/app/services/question/question.service';
import { Question } from 'src/app/models/question';


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

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.updateTable();
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
    console.log(this.questionList) 
  }

}
