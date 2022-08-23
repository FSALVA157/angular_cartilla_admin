import { Component, OnInit, ViewChild } from '@angular/core';
import { IVisita, Convert } from 'src/app/models/visita.interface';
import { ConexionService } from 'src/app/services/conexion.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
//import { DatatableComponent } from '../../../projects/swimlane/ngx-datatable/src/lib/components/datatable.component';
//import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista: IVisita[]=[];

  //codigo de la tabla
  rows: IVisita[] = [];

  temp: IVisita[] = [];

  columns = [
    { prop: 'dni' }, 
    { name: 'Apellido' },
    { name: 'Nombre' },
    // { name: 'DNI' },
    { name: 'Sexo' },
    { name: 'Categoria' },
    { name: 'Motivo' },
  ];

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  //

  constructor(
    private conexionService: ConexionService
  ) {
    if(this.lista.length == 0){
      console.log( `la lista tiene ${this.lista.length}`);
      console.log("PETICIONANDO A FIREBASE");
      this.getFirebase();
    }else{
      console.log( `la lista tiene ${this.lista.length}`);
      console.log("RACARGA SIN PETICION");
      this.reload();
    }
    //   conexionService.getList().subscribe(items => {
    //   this.lista = items;
    //   console.log(this.lista);
    //   this.temp = [...this.lista];
    //   this.rows = this.lista;
    // });
  }  

  ngOnInit(): void {
  }

  //peticiona a la bd
  getFirebase(){
    this.conexionService.getList().subscribe(items => {
      this.lista = items;
      console.log(this.lista);
      this.temp = [...this.lista];
      this.rows = this.lista;
    });
  }

  //carga sin peticionar a la bd
  reload(){
    
      this.temp = [...this.lista];
      this.rows = this.lista;
    
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.dni.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }





}
