import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/Services/students.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  constructor(public myService:StudentsService, private router: Router){ }
  registerationFormValidation = new FormGroup({
    name:new FormControl(null,[Validators.minLength(3)]),
    age:new FormControl(null,[Validators.min(20), Validators.max(40)]),
    phone:new FormControl(null,[Validators.min(10000), Validators.max(99999)]),
    email:new FormControl(null,[Validators.pattern(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)])
  })
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

  add(){
    if(this.registerationFormValidation.valid){
      let name = this.registerationFormValidation.controls.name.value;
      let age = this.registerationFormValidation.controls.age.value;
      let phone = this.registerationFormValidation.controls.phone.value;
      let email = this.registerationFormValidation.controls.email.value;
      let student = {name, age, phone, email};
      this.myService.AddNewStudent(student).subscribe();
      this.router.navigate(['/students']);
      alert("Student Added");
    }else{
      alert("INVALID");
    }
  }
}
