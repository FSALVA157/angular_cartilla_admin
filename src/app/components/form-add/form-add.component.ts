import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConexionService } from '../../services/conexion.service';
import { IVisita } from '../../models/visita.interface';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private conexionService: ConexionService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  forma!: FormGroup;

  initForm(){
    this.forma = this.fb.group({
      apellido:  ['Abdenur'],
      nombre:    ['Abel'],
      categoria: ['ADULTO'],
      dni:       ['31313131'],
      motivo:    ['Faltar a la verdad'],
      sexo:      ['masculino'],
    });
  }

  guardar(){
    let data: IVisita = this.forma.value;
    this.conexionService.addRegistro(data);
  }

}
