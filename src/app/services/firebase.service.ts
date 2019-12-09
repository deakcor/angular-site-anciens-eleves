import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getUser(userKey) {
    console.log(this.db.collection('users').doc(userKey).snapshotChanges())
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  getKey(pseudo){
    var tmp:string=""
    this.db.collection('users').snapshotChanges().subscribe(res=>res.forEach(e=>e.payload.doc.data()['pseudo']==pseudo?tmp=e.payload.doc.id:tmp))
    return tmp
  }
    
  


  searchUsers(searchValue) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByPromo(value) {
    return this.db.collection('users', ref => ref.orderBy('promo').startAt(value)).snapshotChanges();
  }

  createUser(value) {
    return this.db.collection('users').add({
      pseudo: value.pseudo,
      mdp: value.mdp,
      nom:value.nom,
      prenom:value.prenom,
      promo:value.promo,
      entreprise:value.entreprise,
      showpromo:value.showpromo,
      showentreprise:value.showentreprise,
      admin:value.admin

    });
  }

  connect(pseudo,mdp) {
    return this.db.collection('users', ref => ref.where('pseudo', '==', pseudo)
      .where('mdp', '==', mdp))
      .snapshotChanges();
  }

  getEtudiants() {
    return this.db.collection('users', etudiant => etudiant
      .where('admin', '==', false))
      .snapshotChanges();
  }

  getEtudByOption(optioning3) {
    return this.db.collection('users', ref => ref.where('optionsIng3Control', '==', optioning3))
      .snapshotChanges()
  }

  anonymiser(userKey, value) {
    value.email = 'anonymous';
    value.password = '';//un mot de passe vide, empeche les gens de valider un formulaire de connexion 
    value.name = 'anonymous';
    value.nameToSearch = 'anonymous';
    value.surname = 'anonymous';
    return this.db.collection('users').doc(userKey).set(value);
  }
}
