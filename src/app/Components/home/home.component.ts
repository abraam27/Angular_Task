import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/Services/students.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ID:any;
  constructor(public myService:StudentsService, myActivated:ActivatedRoute,private router:Router ){
    this.ID = myActivated.snapshot.params["id"];
  }
  students:any;
  ngOnInit(): void {
    this.myService.GetAllStudents().subscribe({
      next:(res)=>{
        this.students = res;
      },
      error:(err)=>{console.log(err)}
    })
  }
  delete(id:any){
    console.log(id);
    this.myService.DeleteStudent(id).subscribe();
    alert("Student Deleted");
    this.router.navigate(['/'], {skipLocationChange:true}).then(()=>{
      this.router.navigate(['/students']);
    });
  }
}
