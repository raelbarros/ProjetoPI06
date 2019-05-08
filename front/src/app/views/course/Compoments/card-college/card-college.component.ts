import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { College } from 'src/app/models/college';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-card-college',
  templateUrl: './card-college.component.html',
  styleUrls: ['./card-college.component.scss']
})
export class CardCollegeComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;

  collegeForm: FormGroup;
  submitted = false;
  success = false;
  listCollege: College[];

  constructor(private formBuild: FormBuilder, private couseService: CourseService) { 
    this.listCollege = new Array<College>();
  }

  ngOnInit() {
    this.collegeForm = this.formBuild.group({
      name: [null, Validators.required]
    });
    
    this.couseService.read().subscribe((list) => {
      this.listCollege = list;
    })
  }

  saveCollege() {
    this.submitted = true;

    if (!this.collegeForm.invalid) {
      const c = new College();
      c.name = this.collegeForm.value.name;
      this.success = true;
      this.couseService.persist(c).subscribe(() => {
        this.listCollege.push(c);
        
      })  
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.success = false;
  }

  get f() {
    return this.collegeForm.controls;
  }
}
