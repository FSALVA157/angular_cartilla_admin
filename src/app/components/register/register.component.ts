import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  forma!: FormGroup

  constructor(
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.forma = this.fb.group({
        nombre : ['',[Validators.required]],
        correo : ['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ],
        password : ['',[Validators.required, Validators.minLength(6)]],
        password2 : ['',[Validators.required]],
    });
  }


  isValid(nombre: string){
    return this.forma.get(nombre)?.invalid && this.forma.get(nombre)?.touched;    
  }

  PassVerified(){
    const  pass1 = this.forma.get('password')?.value;
    const  pass2  = this.forma.get('password2')?.value;
    return (pass1 === pass2)? false:true;
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
