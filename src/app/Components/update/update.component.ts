import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/Services/students.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  ID:any;
  student:any;
  registerationFormValidation:any;
  constructor(myActivated:ActivatedRoute, private myService:StudentsService, private router: Router){ 
      this.ID = myActivated.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.myService.GetStudentByID(this.ID).subscribe({
      next:(res)=>{
        this.student = res;
        console.log(this.student);
        this.registerationFormValidation = new FormGroup({
          name:new FormControl(this.student.name,[Validators.minLength(3)]),
          age:new FormControl(this.student.age,[Validators.min(20), Validators.max(40)]),
          phone:new FormControl(this.student.phone,[Validators.min(10000), Validators.max(99999)]),
          email:new FormControl(this.student.email,[Validators.pattern(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)])
      })
      },
      error:(err)=>{console.log(err)}
    })
  }
  
  get NameValid(){
    return this.registerationFormValidation.controls.name.valid;
  }

  get AgeValid(){
    return this.registerationFormValidation.controls.age.valid;
  }

  get PhoneValid(){
    return this.registerationFormValidation.controls.phone.valid;
  }

  get EmailValid(){
    return this.registerationFormValidation.controls.email.valid;
  }
  
  update(){
    if(this.registerationFormValidation.valid){
      let name = this.registerationFormValidation.controls.name.value;
      let age = this.registerationFormValidation.controls.age.value;
      let phone = this.registerationFormValidation.controls.phone.value;
      let email = this.registerationFormValidation.controls.email.value;
      let student = {name, age, phone, email};
      this.myService.UpdateStudent(this.ID, student).subscribe();
      alert("Student Updated");
      this.router.navigate(['/students']);
      

    }else{
      alert("INVALID");
    }
  }
}
