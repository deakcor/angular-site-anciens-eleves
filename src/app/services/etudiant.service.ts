import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';

export interface Etudiant {
  pseudo:string,
  mdp:string,
  nom: string;
  prenom: string;
  promo: string;
  entreprise: string;
  data_allowed:Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  etudiants:Array<Etudiant>;
  dataSource;
  constructor(private http:HttpClient){
    
    this.http.get<Array<Etudiant>>("/assets/datas/etudiant.json").subscribe(
      etu=>{
        this.etudiants=etu;
        this.dataSource=  new MatTableDataSource(this.etudiants);
        console.log(etu);
      }
    )
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
}
