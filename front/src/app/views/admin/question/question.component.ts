import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question/question.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
 
  @ViewChild('row') row: ElementRef;
  @ViewChild('addModal') addModal: ModalDirective;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;

  questionList: any = [];
  categoryList: any = [];
  columns = ['id', 'name', 'category', 'edit', 'remove'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;
  idRemove = null;

  constructor(private questionService: QuestionService, private categoryService: CategoryService, private formBuild: FormBuilder) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.updateTable();

    /* formulary add question */
    this.addForm = this.formBuild.group({
      question: ['', Validators.required],
      category: [null, Validators.required]
    });
    
    /* formulary edit question */
    this.editForm = this.formBuild.group({
      question: ['', Validators.required],
      category: [null, Validators.required]
    });

    this.categoryService.read().subscribe((list) => {
      this.categoryList = list;
    })
  }

  updateTable() {
    this.questionService.read().subscribe(list => {
      this.questionList = list;

      this.mdbTable.setDataSource(this.questionList);
      this.questionList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.questionList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.questionList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  saveQuestion() {
    this.submitted = true;

    if (!this.addForm.invalid) {
      let category = new Category();
      category = this.findItemCategory(this.addForm.value.category)
  
      let q = new Question();
      q.question = this.addForm.value.question;
      q.category = category

      this.questionService.persist(q).subscribe(() => {
        this.updateTable();
        this.success = true;
        this.addForm.reset();
      });
      this.submitted = false;
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.addForm.reset();
    this.editForm.reset();
    this.success = false;
  }

  removeQuestion(id: any) {
    this.idRemove = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    if (this.idRemove !== null) {
      let id = this.idRemove;

      let q = new Question();

      q.id = this.questionList[id].id;
      q.question = this.questionList[id].question
      q.category = this.questionList[id].category

      this.questionService.remove(q).subscribe(() => {
        this.updateTable();
      }) 
      this.hideDeleteModal();
      
    }
  }

  editCategory(id: any) {
    this.indexEdit = id;

    let aux = new Question();
    aux = this.questionList[this.indexEdit];
    this.editForm.setValue({ 
      question: aux.question, 
      category: aux.category.name 
    })

    this.editModal.show();
  }

  updateQuestion() {
    this.submitted = true;
    if (!this.editForm.invalid && this.indexEdit != null) {
      let category = new Category();
      category = this.findItemCategory(this.editForm.value.category)

      let updtQuestion = new Question();

      updtQuestion = this.questionList[this.indexEdit];
      updtQuestion.question = this.editForm.value.question;
      updtQuestion.category = category;

      this.questionList[this.indexEdit] = updtQuestion;

      this.questionService.merge(updtQuestion).subscribe(() => {
        this.success = true;
        this.updateTable();
        this.editForm.reset();
      });
      this.submitted = false;
    } 
  } 

  findItemCategory(item: string) {
    return this.categoryList.find(x => x.name == item)
  }

  hideAddModal(){
    this.submitted = false;
    this.success = false;
    this.addForm.reset();
    this.addModal.hide();
  }

  hideEditModal(){
    this.submitted = false;
    this.success = false;
    this.editForm.reset();
    this.editModal.hide();
  }

  hideDeleteModal(){
    this.submitted = false;
    this.success = false;
    this.deleteModal.hide();
  }

  get fadd() {
    return this.addForm.controls;
  }

  get fedit() {
    return this.addForm.controls;
  }
}
