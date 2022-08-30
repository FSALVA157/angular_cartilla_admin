import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
          this.forma = this.fb.group({
        correo : ['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]  ],
        nombre : ['',],
        password : ['', [Validators.required, Validators.minLength(6)]],
        });
  }

  isValid(nombre: string){
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;    
  }


  submitForm(){
    console.log(this.forma);
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(element=>{
        element.markAsTouched();
      })
    }
  }
  

}
