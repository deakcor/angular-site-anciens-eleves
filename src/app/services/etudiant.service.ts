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
  constructor(private http:HttpClient){
    
    this.http.get<Array<Etudiant>>("/assets/datas/etudiant.json").subscribe(
      etu=>{
        this.etudiants=etu.slice(0);
        etu=etu.filter(k=>(!k.admin));
        
        this.dataSource=  new MatTableDataSource(etu);
        console.log(etu);
      }
    )
  }

  createstudent(data){
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
