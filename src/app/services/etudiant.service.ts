import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Etudiant {
  pseudo:string,
  mdp:string,
  nom: string;
  prenom: string;
  promo: string;
  entreprise: string;
  showpromo:boolean;
  showentreprise:boolean;
  admin:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  etudiants:Array<Etudiant>;
  dataSource;
  promos:Array<object>=[]
  entreprises:Array<object>=[]
  constructor(private http:HttpClient, private location:Location){
    
    this.http.get<Array<Etudiant>>("/assets/datas/etudiant.json").subscribe(
      etu=>{
        this.etudiants=etu.slice(0);
        etu=etu.filter(k=>(!k.admin));
        this.reset_graph(etu)
        this.dataSource=  new MatTableDataSource(etu);
        console.log(etu);
      }
    )
  }
  
  reset_graph(etu){
    this.promos=[]
    this.entreprises=[]
    for (let k=0;k<etu.length;k++){
      let id=-1
      let ide=-1
      for (let i=0;i<this.promos.length;i++){
        if (this.promos[i]["x"]==parseInt(etu[k].promo)){
            id=i;
        }
      }
      for (let i=0;i<this.entreprises.length;i++){
        if (this.entreprises[i]["name"]==etu[k].entreprise){
            ide=i;
        }
      }
      if (id==-1){
        this.promos.push({x:parseInt(etu[k].promo),y:1,name:etu[k].promo})
      }else{
        this.promos[id]["y"]+=1
      }
      if (ide==-1){
        this.entreprises.push({name:etu[k].entreprise,y:1})
      }else{
        this.entreprises[ide]["y"]+=1
      }
    }
  }
  deleteEtudiant(id){
    this.etudiants.splice(id,1)
    this.dataSource=  new MatTableDataSource(this.etudiants.filter(k=>(!k.admin)));
    this.reset_graph(this.etudiants.filter(k=>(!k.admin)))
    this.miseAJourDonnees().subscribe(
      () => alert("Données enregistrées")
    );
  }
  createstudent(data){
    console.log(data)
    let exist=false
    for (let k in this.etudiants){
      if (this.etudiants[k].pseudo==data.pseudo && this.etudiants[k].mdp==data.mdp){
        this.etudiants[k]=data
        exist=true
      }
    }
    if (!exist){
      this.etudiants.push(data)
    }
    this.dataSource=  new MatTableDataSource(this.etudiants.filter(k=>(!k.admin)));
    this.reset_graph(this.etudiants.filter(k=>(!k.admin)))
    this.miseAJourDonnees().subscribe(
      () => alert("Données enregistrées")
    );
  }

  match_idpwd(pseudo,pwd){
    console.log(this.etudiants,pseudo,pwd)
    let i=0;
    let id=-1;
    while (i<this.etudiants.length && id==-1){
      if (pseudo==this.etudiants[i]["pseudo"] && pwd==this.etudiants[i]["mdp"]){
        id=i;
      }
      i+=1;
    }
    return id;
  }

  miseAJourDonnees():Observable<any>{
    console.log("letsgo")
    return this.http.post(this.location.prepareExternalUrl('/assets/php/setJson.php'), this.etudiants)
    .pipe(
      catchError( erreur => this.handleError(erreur) )
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Une erreur s'est produite : ", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `PHP renvoie une erreur ${error.status}, ` +
        `plus d'infos sur le body : ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      "Une erreur s'est produite lors de l'écriture des données, merci de rééssayer");
  };
}
