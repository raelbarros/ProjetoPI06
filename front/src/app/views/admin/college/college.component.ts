import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, ModalDirective } from "angular-bootstrap-md";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollegeService } from 'src/app/services/college/college.service';
import { College } from 'src/app/models/college';
import { State } from "src/app/models/State";
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  @ViewChild('row') row: ElementRef;
  @ViewChild('editModal') editModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent)
  mdbTablePagination: MdbTablePaginationComponent;

  collegeList: any = [];
  // listState: Observable<State[]>;
  listCity: any = [];
  listState: any = [];

  columns = ['id', 'name', 'tipo', 'cidadde', 'estado', 'edit', 'remove'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 8;

  addForm: FormGroup;
  editForm: FormGroup;
  submitted = false;
  success = false;

  indexEdit = null;
  auxId = null;

  constructor(private collegeService: CollegeService, private formBuild: FormBuilder) { }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  onChange(uf: string) {
    this.collegeService.readCity(uf).subscribe((list) => {
      this.listCity = list;
    })
  }

  ngOnInit() {
    this.updateTable();

    // this.listState = this.collegeService.readState();

    this.collegeService.readState().subscribe((list) => {
      this.listState = list;
    })

    //----
    this.addForm = this.formBuild.group({
      name: ['', Validators.required],
      tipo: ['', Validators.required],
      city: ['', Validators.required],
      state: [null, Validators.required]
    });

    this.editForm = this.formBuild.group({
      name: ['', Validators.required],
      tipo: ['', Validators.required],
      city: ['', Validators.required],
      state: [null, Validators.required]
    });

  }

  updateTable() {
    this.collegeService.read().subscribe(list => {
      this.collegeList = list;
      this.mdbTable.setDataSource(this.collegeList);
      this.collegeList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.collegeList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.collegeList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  saveCollege() {
    this.submitted = true;

    let auxState = this.findItemState(this.addForm.value.state);
    let auxCity = this.findItemCity(this.addForm.value.city);

    if (!this.addForm.invalid) {
      const c = new College();
      c.name = this.addForm.value.name;
      c.tipo = this.addForm.value.tipo;
      c.city = auxCity;
      c.state = auxState;
      console.log(c)
      // this.collegeService.persist(c).subscribe(() => {
      //   this.updateTable();
      //   this.success = true;
      //   this.addForm.reset();
      // });
      this.submitted = false;
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.addForm.reset();
    this.editForm.reset();
    this.success = false;
  }

  removeCollege(id: any) {
    this.auxId = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    if (this.auxId !== null) {
      let id = this.auxId

      let c = new College();
      c.id = this.collegeList[id].id;
      c.name = this.collegeList[id].name

      this.collegeService.remove(c).subscribe(() => {
        this.updateTable();
      })
      this.auxId = null;
      this.deleteModal.hide();
    }
  }

  editCollege(id: any) {
    this.indexEdit = id;

    let aux = new College();
    aux = this.collegeList[this.indexEdit];
    this.editForm.setValue({
      name: aux.name,
      tipo: aux.tipo,
      city: aux.city,
      state: aux.state
    })
    this.editModal.show();
  }

  updateCollege() {
    this.submitted = true;

    let auxState = this.findItemState(this.addForm.value.state);
    let auxCity = this.findItemCity(this.addForm.value.city);

    if (!this.editForm.invalid && this.indexEdit != null) {
      let updateCourse = new College();

      updateCourse = this.collegeList[this.indexEdit];
      updateCourse.name = this.editForm.value.name;
      updateCourse.tipo = this.editForm.value.tipo;
      updateCourse.city = auxCity;
      updateCourse.state = auxState;

      this.collegeList[this.indexEdit] = updateCourse;

      this.collegeService.merge(updateCourse).subscribe(() => {
        this.updateTable();
        this.editForm.reset();
        this.editModal.hide();
      });
      this.submitted = false;
    }
  }

  findItemState(item: string) {
    return this.listState.find(x => x.uf == item)
  }

  findItemCity(item: string) {
    return this.listCity.find(x => x.name == item)
  }

  get fadd() {
    return this.addForm.controls;
  }

  get fedit() {
    return this.editForm.controls;
  }

}