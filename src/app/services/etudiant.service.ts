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
  promos:Array<object>=[]
  entreprises:Array<object>=[]
  constructor(private http:HttpClient){
    
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
        if (this.promos[i]["name"]==etu[k].promo){
            id=i;
        }
      }
      for (let i=0;i<this.entreprises.length;i++){
        if (this.entreprises[i]["name"]==etu[k].entreprise){
            ide=i;
        }
      }
      if (id==-1){
        this.promos.push({name:etu[k].promo,y:1})
      }else{
        this.promos[id]["y"]+=1
      }
      if (ide==-1){
        this.entreprises.push({name:etu[k].entreprise,y:1})
      }else{
        this.entreprises[id]["y"]+=1
      }
    }
  }
  deleteEtudiant(id){
    this.etudiants.splice(id,1)
    this.dataSource=  new MatTableDataSource(this.etudiants.filter(k=>(!k.admin)));
    this.reset_graph(this.etudiants.filter(k=>(!k.admin)))
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
    this.reset_graph(this.etudiants.filter(k=>(!k.admin)))
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
