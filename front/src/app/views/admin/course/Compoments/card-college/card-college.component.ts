import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { College } from 'src/app/models/college';
import { CourseService } from 'src/app/services/course/course.service';
import { CollegeService } from 'src/app/services/college/college.service';

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

  constructor(private formBuild: FormBuilder, private collegeService: CollegeService) { 
    this.listCollege = new Array<College>();
  }

  ngOnInit() {
    this.collegeForm = this.formBuild.group({
      name: [null, Validators.required]
    });
    
    this.collegeService.read().subscribe((list) => {
      this.listCollege = list;
    })
  }

  saveCollege() {
    this.submitted = true;

    if (!this.collegeForm.invalid) {
      const c = new College();
      c.name = this.collegeForm.value.name;
      this.success = true;
      this.collegeService.persist(c).subscribe(() => {
        this.listCollege.push(c);
        this.collegeForm.reset();
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
