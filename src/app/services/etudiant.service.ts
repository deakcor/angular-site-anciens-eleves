import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';

export interface Etudiant {
  nom: string;
  prenom: string;
  promo: string;
  entreprise: string;
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
}
