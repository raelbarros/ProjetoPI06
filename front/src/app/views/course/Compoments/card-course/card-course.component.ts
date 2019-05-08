import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.scss']
})

export class CardCourseComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;

  courseForm: FormGroup;
  submitted = false;
  success = false;
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
      this.success = true;
      this.couseService.persist(c).subscribe(() => {
        this.listCourse.push(c);
        
      })  
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.success = false;
  }

  get f() {
    return this.courseForm.controls;
  }
}
