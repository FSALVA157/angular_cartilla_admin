import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista: any;

  constructor(
    private conexionService: ConexionService
  ) {
    conexionService.getList().subscribe(items => {
      this.lista = items;
      console.log(this.lista);
    });
  }

  ngOnInit(): void {
  }

}
