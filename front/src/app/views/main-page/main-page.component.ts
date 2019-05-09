import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { College } from 'src/app/models/college';
import { CourseService } from 'src/app/services/course/course.service';
import { CollegeService } from 'src/app/services/college/college.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/sudent';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  listCollege: Array<College>;
  listCourse: Array<Course>;

  studentForm: FormGroup;

  constructor(private studentService: StudentService, private couseService: CourseService, private collegeService: CollegeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.couseService.read().subscribe((list) => {
      this.listCourse = list;
    })
    this.collegeService.read().subscribe((list) => {
      this.listCollege = list;
    })

    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      college: [null, Validators.required],
      course: [null, Validators.required],
      periodo: [null, Validators.required]
    });
  }


  saveStudent(){
    let auxCourse = new Course();
    auxCourse = this.listCourse.find((item) =>{
      return item.name == this.studentForm.value.course;
    })

    let auxCollege = new College();
    auxCollege = this.listCollege.find((item) =>{
      return item.name == this.studentForm.value.college;
    })

    let student = new Student
    student.firstName = this.studentForm.value.firstName;
    student.lastName = this.studentForm.value.lastName;
    student.email = this.studentForm.value.email;
    student.collegeKey = auxCollege;
    student.courseKey = auxCourse;
    student.periodo = this.studentForm.value.periodo

    console.log(student)
    this.studentService.persist(student).subscribe((list) => {
      console.log('israel eh foda, e o mari e gay')
    })
  }
}
