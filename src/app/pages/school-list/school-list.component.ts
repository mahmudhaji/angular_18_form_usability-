import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { _MatInternalFormField } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [CardComponent,MatInputModule,MatFormFieldModule,MatButtonModule,CommonModule,MatIconModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent implements OnInit{


  schoolList!: any[];


  constructor(private schoolService: SchoolService,private router: Router){}


  ngOnInit(): void {
      this.fetchAllSchool();
  }
  fetchAllSchool() {
      this.schoolService.getAll().subscribe(
        (response: any) => {
          console.log("school response => ", response);
          this.schoolList = response;
        },
        (error: any) => {
          console.error("Error fetching schools:", error);
          // Handle error here (e.g., show error message to user)
        }
      );
  }

  addSchool(){
      this.router.navigateByUrl('addSchool');
  }

  editSchool(school: any){
    this.router.navigateByUrl('/editSchool/'+school.id);
  }

}
