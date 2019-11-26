import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from './etudiant.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private connected:boolean;
  private id:number=-1

  constructor(public etuServ:EtudiantService, private router:Router) { 
    this.connected=false;
  }

  disconnect() {
    this.connected=false;
    this.id=-1;
    if (!this.connected){
      this.router.navigate(['']);
    }
  }

  getid(){
    return this.id;
  }

  connect(pseudo,pwd){
    this.id=this.etuServ.match_idpwd(pseudo,pwd)
    this.connected=(this.id!=-1);
    
  }

  isconnected(){
    
    return this.connected;
    
  }
}
