import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question/question.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Question } from 'src/app/models/question';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

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
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  questionList: Array<Question> = [];
  categoryList: Array<Category> = [];
  columns = ['id', 'name', 'category', 'ferramentas'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;
  idRemove = null;

  constructor(private auth: AuthService, private loadService: NgxUiLoaderService, private questionService: QuestionService, private categoryService: CategoryService, private formBuild: FormBuilder) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.categoryService.read().subscribe((list) => {
      this.categoryList = list;
    });

    // Verifica se eh um adm
    this.auth.isAdmin();

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

    this.updateTable();
  }

  updateTable() {
    this.loadService.start();

    this.questionService.read().subscribe(list => {
      this.questionList = list;

      this.mdbTable.setDataSource(list);
      this.questionList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

      this.loadService.stop();
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
      category = this.findItemCategory(this.addForm.value.category);

      let q = new Question();
      q.question = this.addForm.value.question;
      q.category = category;

      this.questionService.persist(q).subscribe(() => {
        this.updateTable();
        this.success = true;
        this.addForm.reset();
        this.hideAddModal();
        this.showSucessAlert('save');
      });
      this.submitted = false;
    }
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
      q.question = this.questionList[id].question;
      q.category = this.questionList[id].category;

      this.questionService.remove(q).subscribe(() => {
        this.updateTable();
        this.showSucessAlert('delete');
      });
      this.hideDeleteModal();
    }
  }

  editQuestion(id: any) {
    this.indexEdit = id;

    let aux = new Question();
    aux = this.questionList[this.indexEdit];
    this.editForm.setValue({
      question: aux.question,
      category: aux.category.name
    });

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
        this.updateTable();
        this.editForm.reset();
        this.hideEditModal();
        this.showSucessAlert('save');
      });
      this.submitted = false;
    }
  }

  findItemCategory(item: string) {
    return this.categoryList.find(x => x.name == item);
  }

  hideAddModal() {
    this.submitted = false;
    this.success = false;
    this.addForm.reset();
    this.addModal.hide();
  }

  hideEditModal() {
    this.submitted = false;
    this.success = false;
    this.editForm.reset();
    this.editModal.hide();
  }

  hideDeleteModal() {
    this.submitted = false;
    this.success = false;
    this.deleteModal.hide();
  }

  showSucessAlert(type) {
    this.addForm.reset();
    this.editForm.reset();
    this.success = false;
    this.submitted = false;

    let alert = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
    });

    if (type == 'save') {
      alert.fire({
        type: 'success',
        title: '<span style="color:#ffffff">Pergunta salva com sucesso</span>',
        background: '#00C851'
      });
    } else if (type == 'delete') {
      alert.fire({
        type: 'success',
        title: '<span style="color:#ffffff">Pergunta removida com sucesso</span>',
        background: '#00C851'
      });
    }
  }

  get fadd() {
    return this.addForm.controls;
  }

  get fedit() {
    return this.addForm.controls;
  }
}
