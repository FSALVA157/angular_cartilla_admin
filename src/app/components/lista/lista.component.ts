import { Component, OnInit, ViewChild } from '@angular/core';
import { IVisita, Convert } from 'src/app/models/visita.interface';
import { ConexionService } from 'src/app/services/conexion.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

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

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

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

  //borrando un documento
  deleteProhicion(){
    if(this.selected.length>0){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.conexionService.deleteRegistro(this.selected[0].id!);
            Swal.fire(
              'Eliminado!',
              'Usted ha eliminado un registro',
              'success'
            )            
          } catch (e: any) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo ha fallado! ${e.message}`,              
            })
          }
        }else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            'Se Cancelo el Borrado!',
            'No se ha eliminado ningún Registro',
            'error'
          )
        }
      })
    }
  }
}
