import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/models/course';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @ViewChild('row') row: ElementRef;
  @ViewChild('addModal') addModal: ModalDirective;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  courseList: any = [];
  columns = ['id', 'name', 'ferramentas'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 10;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;
  idRemove = null;

  constructor(private auth: AuthService, private loadService: NgxUiLoaderService, private courseService: CourseService, private formBuild: FormBuilder, private route: ActivatedRoute) {
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.updateTable();

    // Verifica se eh um adm
    this.auth.isAdmin();

    this.addForm = this.formBuild.group({
      name: ['', Validators.required]
    });
    this.editForm = this.formBuild.group({
      name: ['', Validators.required]
    });
  }

  updateTable() {
    this.loadService.start();

    this.courseService.read().subscribe(list => {
      this.courseList = list;

      this.mdbTable.setDataSource(this.courseList);
      this.courseList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      
      this.loadService.stop();
    });

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.courseList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.courseList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  saveCourse() {
    this.submitted = true;
    if (!this.addForm.invalid) {
      const c = new Course();
      c.name = this.addForm.value.name;

      this.courseService.persist(c).subscribe(() => {
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

  removeCourse(id: any) {
    this.idRemove = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    if (this.idRemove !== null) {
      let id = this.idRemove;

      let c = new Course();

      c.id = this.courseList[id].id;
      c.name = this.courseList[id].name

      this.courseService.remove(c).subscribe(() => {
        this.updateTable();
        console.log(c)
      })
      this.deleteModal.hide();
    }
  }

  editCourse(id: any) {
    this.indexEdit = id;

    let aux = new Course();
    aux = this.courseList[this.indexEdit];
    this.editForm.setValue({ name: aux.name })

    this.editModal.show();
  }

  updateCourse() {
    this.submitted = true;
    if (!this.editForm.invalid && this.indexEdit != null) {

      let updtCourse = new Course();

      updtCourse = this.courseList[this.indexEdit];
      updtCourse.name = this.editForm.value.name;
      this.courseList[this.indexEdit] = updtCourse;

      this.courseService.merge(updtCourse).subscribe(() => {
        this.updateTable();
        this.editForm.reset();
        this.hideEditModal();
      });
      this.submitted = false;
    }
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

  get fadd() {
    return this.addForm.controls;
  }

  get fedit() {
    return this.addForm.controls;
  }

}