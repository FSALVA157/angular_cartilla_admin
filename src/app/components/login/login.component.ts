import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    }else{
      const data = new UserModel("user_name", this.forma.get('correo')!.value, this.forma.get('password')!.value );
      this.authService.login(data).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      (err)=>{
          console.log(err.error.error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Algo ha fallado! ${err.error.error.message}`,              
          })
      }
      );
    }
  }

  
}
