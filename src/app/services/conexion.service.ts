import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { IVisita } from 'src/app/models/visita.interface';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<IVisita>;
  items: Observable<IVisita[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<IVisita>('prohibidas');
    this.items = this.itemsCollection.valueChanges();
   }

   getList(){
    return this.items;
   }
}
