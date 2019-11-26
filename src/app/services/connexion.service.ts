import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  connected:boolean;

  constructor(private router:Router) { 
    this.connected=false;
  }

  disconnect() {
    this.connected=false;
    if (!this.connected){
      this.router.navigate(['']);
    }
  }

  

  connect(){
    this.connected=true;
    
  }

  isconnected(){
    
    return this.connected;
    
  }
}
