import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SchoolService } from '../../../services/school.service';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-school-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatButtonModule
  ],
  templateUrl: './school-form.component.html',
  styleUrl: './school-form.component.scss'
})
export class SchoolFormComponent implements OnInit , OnChanges{

  @Input() formData!: {
    crudMode: string;
    school: any
  }

  @Output() saved: EventEmitter<any> = new EventEmitter<any>(undefined);


  schoolForm!: FormGroup;

  schoolTypes = ['SCIENCE', 'ARTS'];
  router: any;

  constructor(private schoolService: SchoolService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
  console.log('changed data =>',this.formData);

  if(this.formData.crudMode === 'edit'){
      if(this.formData.school!== null && this.formData.school!== undefined){
        Object.keys(this.formData.school).forEach(key => {
              if(this.schoolForm.value.hasOwnProperty(key)) {
                this.schoolForm.get(key)?.setValue(this.formData.school[key]);
            }
          })
      }
     }
    }

  ngOnInit(): void {
    console.log('passed details from parent', this.formData)
    this.configureSchoolForm();
  }

  configureSchoolForm() {
    this.schoolForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      schoolType: new FormControl(null, [Validators.required])
    });
  }

  onSave() {
    let values = this.schoolForm.value;
    console.log('School form values => ', values);
    if (this.formData.crudMode === 'add') {
      this.schoolService.add(values).subscribe((response: any) => {
        console.log('create School responce => ', response);
        // this.router.navigateByUrl('/schoolList')
        this.saved.emit(); // Emit the saved event
      }, (error: HttpErrorResponse) => {
        console.log('error');
      })

    } else if (this.formData.crudMode === 'edit') {
        // values['id'] = this.formData.school.id;
        values = {
          ...values,
          id: this.formData.school.id
        }

      this.schoolService.update(values, values.id).subscribe((response) => {
        console.log('update school response =>',response);

        this.saved.emit(); // Emit the saved event
        // show success message
      },
      (error:HttpErrorResponse) => {
        console.log(error)
      }
    );
    }
  }
}
