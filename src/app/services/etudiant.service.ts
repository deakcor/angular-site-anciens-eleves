import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

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

  etudiants:Array<any>;
  users:Array<any>
  dataSource:MatTableDataSource<any>;
  promos:Array<any>=[]
  entreprises:Array<any>=[]
  constructor(private http:HttpClient, private location:Location, private firebaseService:FirebaseService){
    this.maj_users()
    
  }
  
  reset_graph(){
    this.promos=[]
    this.entreprises=[]
    for (let k=0;k<this.etudiants.length;k++){
      let id=-1
      let ide=-1
      for (let i=0;i<this.promos.length;i++){
        if (this.promos[i]["x"]==parseInt(this.etudiants[k].promo)){
            id=i;
        }
      }
      for (let i=0;i<this.entreprises.length;i++){
        if (this.entreprises[i]["name"]==this.etudiants[k].entreprise){
            ide=i;
        }
      }
      if (id==-1){
        this.promos.push({x:parseInt(this.etudiants[k].promo),y:1,name:this.etudiants[k].promo})
      }else{
        this.promos[id]["y"]+=1
      }
      if (ide==-1){
        this.entreprises.push({name:this.etudiants[k].entreprise,y:1})
      }else{
        this.entreprises[ide]["y"]+=1
      }
    }
  }
  deleteEtudiant(id:string){
    this.firebaseService.deleteUser(id)
    this.maj_users()
  }
  createstudent(data:any){

    this.firebaseService.getUsers().subscribe(
      res=>{let updated=false;
        res.forEach(element=>{
        if (element.payload.doc.data()["pseudo"]==data.pseudo){
          this.firebaseService.updateUser(element.payload.doc.id,data)
          updated=true;
        }
        
      });
      if (!updated){
        this.firebaseService.createUser(data)
      }
        
    }
    );
    this.maj_users()
    
    
  }

  maj_users(){
    
    
    this.firebaseService.getUsers().subscribe(
      res=>{this.users=[];
        res.forEach(element => this.users.push(element.payload.doc.data()))}
    );
    this.firebaseService.getEtudiants().subscribe(
      res=>{
        this.etudiants=[];
        for (let element of res){
          this.etudiants.push(element.payload.doc.data())
        }
        this.dataSource=  new MatTableDataSource(this.etudiants);
        this.reset_graph()}
        
    );
    
  }

  

}
