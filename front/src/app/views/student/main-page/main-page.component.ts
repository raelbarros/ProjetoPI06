import { ModalDirective } from "angular-bootstrap-md";
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/models/course';
import { College } from 'src/app/models/college';
import { CourseService } from 'src/app/services/course/course.service';
import { CollegeService } from 'src/app/services/college/college.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/sudent';
import { StudentService } from 'src/app/services/student/student.service';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @ViewChild('signup') signupModal: ModalDirective;

  listCollege: Array<College> = [];
  listCourse: Array<Course> = [];

  studentForm: FormGroup;
  submitted = false;

  teste = null;

  constructor(private loadService: NgxUiLoaderService, private studentService: StudentService, private router: Router, private couseService: CourseService, private collegeService: CollegeService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loadService.start();

    this.couseService.read().subscribe((list) => {
      this.listCourse = list;

      this.collegeService.read().subscribe((list) => {
        this.listCollege = list;
      });

      this.loadService.stop();
    });

    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      college: [null, Validators.required],
      course: [null, Validators.required],
      periodo: [null, Validators.required]
    });
  }

  saveStudent() {
    this.submitted = true;
    if (!this.studentForm.invalid) {
      let auxCourse = new Course();
      auxCourse = this.listCourse.find((item) => {
        return item.name == this.studentForm.value.course;
      })

      let auxCollege = new College();
      auxCollege = this.listCollege.find((item) => {
        return item.name == this.studentForm.value.college;
      })

      let student = new Student();
      student.firstName = this.studentForm.value.firstName;
      student.lastName = this.studentForm.value.lastName;
      student.email = this.studentForm.value.email;
      student.college = auxCollege;
      student.course = auxCourse;
      student.periodo = this.studentForm.value.periodo

      this.studentService.persist(student).subscribe((studentid) => {
        this.router.navigate(['/survey', studentid.id]);
        this.studentForm.reset();
      });
      this.submitted = false;
    }
  }

  hideSingUpModal() {
    this.submitted = false;
    this.studentForm.reset();
    this.signupModal.hide();
  }

  get f() {
    return this.studentForm.controls;
  }
}
