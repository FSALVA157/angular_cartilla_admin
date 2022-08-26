import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IVisita } from 'src/app/models/visita.interface';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  //manipulando colecciones
  private itemsCollection: AngularFirestoreCollection<IVisita>;
  items: Observable<IVisita[]>;

  //manipulando documentos
  private itemDoc: AngularFirestoreDocument<IVisita> | undefined;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<IVisita>('prohibidas');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IVisita;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

   getList(){
    return this.items;
   }

   addRegistro(reg: IVisita){
    this.itemsCollection.add(reg);
   }

   deleteRegistro(id: string){
      this.itemDoc =  this.afs.doc<IVisita>(`prohibidas/${id}`);
      this.itemDoc.delete();
   }

}
