import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Formation } from '../models/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewFormation(record) {
    return this.firestore.collection('Formations').add(record);
  }

  getFormationDetail(formationId: string): AngularFirestoreDocument<Formation> { 
    return this.firestore.collection('Formations').doc(formationId);
  }

  read_Formations() {
    return this.firestore.collection('Formations').snapshotChanges();
  }

  update_Formation(recordID,record){
    this.firestore.doc('Formations/' + recordID).update(record);
  }

  delete_Formation(record_id) {
    this.firestore.doc('Formations/' + record_id).delete();
  }
}
