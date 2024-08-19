import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../services/school.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../../components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import { SchoolFormComponent } from "../../components/school/school-form/school-form.component";

@Component({
  selector: 'app-add-school',
  standalone: true,
  imports: [CardComponent, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, SchoolFormComponent],
  templateUrl: './add-school.component.html',
  styleUrl: './add-school.component.scss'
})
export class AddSchoolComponent implements OnInit{

  // schoolForm!:FormGroup;


  addFormData = {
    crudMode: 'add',     // communication
    school: null
  }


  // schoolTypes = ['SCIENCE', 'ARTS'];

  constructor(private router:Router){}

  ngOnInit() : void{
    // this.configureSchoolForm();
  }

  configureSchoolForm(){
    // this.schoolForm = new FormGroup({
    //   name: new FormControl(null,[Validators.required]),
    //   location: new FormControl(null,[Validators.required]),
    //   schoolType: new FormControl(null,[Validators.required])
    // });
  }

  onSave(){
  //   const values = this.schoolForm.value;
  //   console.log('School form values => ', values);
  //   this.schoolService.add(values).subscribe((response:any) =>{
  //     console.log('create School responce => ',response);
  //     this.router.navigateByUrl('/schoolList')
  //   }, (error:HttpErrorResponse) => {
  //     console.log('error');
  //   })
  // }
}

onSaved(){
  this.router.navigateByUrl('/schoolList')
}

}
