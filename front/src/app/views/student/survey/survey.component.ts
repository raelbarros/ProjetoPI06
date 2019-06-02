import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {



  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  student = null;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;

  questionList: any = [];
  categoryList: any = [];
  columns = ['Numero', 'Pergunta', 'Concordo', 'Descordo'];
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;



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

}
