import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  listCourse: Course[];

  constructor(private formBuild: FormBuilder, private couseService: CourseService) { 
    this.listCourse = new Array<Course>();
  }

  ngOnInit() {
    this.courseForm = this.formBuild.group({
      name: [null, Validators.required]
    });
    
    this.couseService.read().subscribe((list) => {
      this.listCourse = list;
    })
  }

  saveCourse() {
    this.submitted = true;

    if (!this.courseForm.invalid) {
      const c = new Course();
      c.name = this.courseForm.value.name;
      
      this.couseService.persist(c).subscribe(() => {
        this.listCourse.push(c);
      })
    }
  }

  get f() {
    return this.courseForm.controls;
  }

  @ViewChild('alert') alert: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
}
