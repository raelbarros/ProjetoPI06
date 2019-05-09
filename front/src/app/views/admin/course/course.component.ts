import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @ViewChild('row') row: ElementRef;
  @ViewChild('editModal') modal: ModalDirective;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;

  courseList: any = [];
  columns = ['id', 'name', 'Edit', 'Remove'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;

  constructor(private courseService: CourseService, private formBuild: FormBuilder) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  ngOnInit() {
    this.courseService.read().subscribe(list => {
      this.courseList = list;

      this.updateTable();
    });

    //----
    this.addForm = this.formBuild.group({
      name: ['', Validators.required]
    });
    this.editForm = this.formBuild.group({
      name: ['', Validators.required]
    });
  }

  updateTable() {
    this.mdbTable.setDataSource(this.courseList);
    this.courseList = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
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
        this.courseList.push(c);
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
    let c = new Course();

    c.id = this.courseList[id].id;
    c.name = this.courseList[id].name

    this.courseService.remove(c).subscribe(() => {
      this.courseList.splice(id, 1);
      this.updateTable();
    });

  }

  editCourse(id: any) {
    this.indexEdit = id;

    let aux = new Course();
    aux = this.courseList[this.indexEdit];
    this.editForm.setValue({name: aux.name})

    this.modal.show();
  }

  updateCourse() {
    this.submitted = true;
    if (!this.editForm.invalid && this.indexEdit != null) {

      let updateCourse = new Course();

      updateCourse = this.courseList[this.indexEdit];
      updateCourse.name = this.editForm.value.name;
      this.courseList[this.indexEdit] = updateCourse;

      this.courseService.merge(updateCourse).subscribe(() => {
        this.success = true;
        this.updateTable();
        this.editForm.reset();
      });
      this.submitted = false;
    }
  }

  get fadd() {
    return this.addForm.controls;
  }

  get fedit() {
    return this.addForm.controls;
  }

}
