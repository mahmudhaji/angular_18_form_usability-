import { Component } from '@angular/core';

import { SchoolService } from '../../services/school.service';
import { CardComponent } from '../../components/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolFormComponent } from '../../components/school/school-form/school-form.component';

@Component({
  selector: 'app-edit-school',
  standalone: true,
  imports: [CardComponent,MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,
    MatSelectModule,SchoolFormComponent
  ],
  templateUrl: './edit-school.component.html',
  styleUrl: './edit-school.component.scss'
})
export class EditSchoolComponent {

  // schoolTypes = ['SCIENCE', 'ARTS'];

  schoolForm!:FormGroup;


  EditFormData = {
    crudMode: 'edit',    // communication
    school: null
  }

  constructor(private route: ActivatedRoute, private schoolService: SchoolService ,private router:Router){}

  ngOnInit() : void{
    this.configureSchoolForm();

    this.route.params.subscribe((paramsValues:any) =>{
      console.log('passed params =>', paramsValues);
      // const schoolId = paramsValues.schoolId;
      const id = paramsValues.schoolId;
      this.fecthSchoolById(id);
    });
  }

  configureSchoolForm(){
    this.schoolForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null,[Validators.required]),
      location: new FormControl(null,[Validators.required]),
      schoolType: new FormControl(null,[Validators.required])
    });
  }


  fecthSchoolById(id: any) {
    this.schoolService.getById(id).subscribe((response:any) =>{
    //   console.log('get By id response =>',response);
    //   Object.keys(response).forEach(key => {
    //     if(this.schoolForm.value.hasOwnProperty(key)) {
    //       this.schoolForm.get(key)?.setValue(response[key]);
    //   }
    // })

      this.EditFormData = {
        // crudMode: 'edit',
        ...this.EditFormData,
        school: response

      }
  }, (error: HttpErrorResponse) => {
      console.log('error => ', error);
  })
}
//   onSave(){
//     const values = this.schoolForm.value;
//     console.log("my value are ",values)
//     const id=this.schoolForm.value.id;
//     this.schoolService.update(values,id).subscribe((response) => {
//         // show success message
//         this.router.navigateByUrl('/schoolList')
//     });
// }


onSaved(){
  this.router.navigateByUrl('/schoolList')
}

}
