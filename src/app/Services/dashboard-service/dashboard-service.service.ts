import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Iuser } from 'src/app/Models/icustomer';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class DashboardServiceService {
   userCollection!: AngularFirestoreCollection<Iuser>;
  //  users: Observable<Iuser[]>;

  constructor(public UF: AngularFirestore) {
    // this.userCollection = UF.collection<Iuser> ('users');


    }

    // .pipe(map((collec:any)=>
    //   collec.map((f:any)=>{

    //     const data = f.payload.doc.data() as Iuser;
    //       const id = f.payload.doc.id;
    //       data.id = id;
    //       return data;
    //   })
    // )
    // )


 
}
