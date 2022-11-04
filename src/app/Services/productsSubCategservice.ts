import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubCateg } from '../Models/order-status';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class productsSubCategservice {
  // Using FireStore
  private subCategoryCollection: AngularFirestoreCollection<ISubCateg>;
  subCategory: Observable<ISubCateg[]>;
  routeURL: string = '';

  constructor(public firestoreServices: AngularFirestore) {
    this.subCategoryCollection =
      firestoreServices.collection<ISubCateg>('subCategory');
    this.subCategory = this.subCategoryCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a: any) => {
          const data = a.payload.doc.data() as ISubCateg;
          data.id = a.payload.doc.id;
          console.log(data);
          return data;
        });
      })
    );
  }

  // Using firestore to showing all products data
  getSubCateg(): Observable<ISubCateg[]> {
    // Using firestore
    return this.subCategory;
  }
}
