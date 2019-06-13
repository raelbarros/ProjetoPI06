import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  
  @ViewChild('row') row: ElementRef;
  @ViewChild('addModal') addModal: ModalDirective;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;

  categoryList: any = [];
  columns = ['id', 'name', 'edit', 'remove'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;
  idRemove = null;

  constructor(private auth: AuthService, private loadService: NgxUiLoaderService, private categoryService: CategoryService, private formBuild: FormBuilder) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.updateTable();

    // Verifica se eh um adm
      this.auth.isAdmin();

    //----
    this.addForm = this.formBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.editForm = this.formBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  updateTable() {
    this.loadService.start();

    this.categoryService.read().subscribe(list => {
      this.categoryList = list;

      this.mdbTable.setDataSource(this.categoryList);
      this.categoryList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

      this.loadService.stop();
    });

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.categoryList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.categoryList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  saveCategory() {
    this.submitted = true;
    console.log(this.addForm.value)
    if (!this.addForm.invalid) {
      const c = new Category();
      
      c.name = this.addForm.value.name;
      c.description = this.addForm.value.description;

      this.categoryService.persist(c).subscribe(() => {
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

  removeCategory(id: any) {
    this.idRemove = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    if (this.idRemove !== null) {
      let id = this.idRemove;

      let c = new Category();

      c.id = this.categoryList[id].id;
      c.name = this.categoryList[id].name;
      c.description = this.categoryList[id].description;

      this.categoryService.remove(c).subscribe(() => {
        this.updateTable();
      })
      this.hideDeleteModal();
    }
  }

  editCategory(id: any) {
    this.indexEdit = id;

    let aux = new Category();
    aux = this.categoryList[this.indexEdit];

    this.editForm.setValue({ 
      name: aux.name, 
      description: aux.description 
    }),

    this.editModal.show();
  }

  updateCategory() {
    this.submitted = true;
    if (!this.editForm.invalid && this.indexEdit != null) {

      let updtCategory = new Category();

      updtCategory = this.categoryList[this.indexEdit];
      updtCategory.name = this.editForm.value.name;
      updtCategory.description = this.editForm.value.description;
      this.categoryList[this.indexEdit] = updtCategory;

      this.categoryService.merge(updtCategory).subscribe(() => {
        this.updateTable();
        this.editForm.reset();
        this.hideEditModal();
      });
      this.submitted = false;
    }
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
