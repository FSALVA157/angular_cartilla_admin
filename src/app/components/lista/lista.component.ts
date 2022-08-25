import { Component, OnInit, ViewChild } from '@angular/core';
import { IVisita, Convert } from 'src/app/models/visita.interface';
import { ConexionService } from 'src/app/services/conexion.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';


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

  selected: IVisita[] = [];

  columns = [
    { prop: 'id' }, 
    { name: 'dni' },
    { name: 'Apellido' },
    { name: 'Nombre' },
    { name: 'Sexo' },
    { name: 'Categoria' },
    { name: 'Motivo' },
  ];

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  //

  constructor(
    private conexionService: ConexionService
  ) {
    if(this.lista.length == 0){
          this.getFirebase();
          
    }else{
      
      this.reload();
    }
    
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
      this.selected = [this.lista[1]];
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

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }
}
