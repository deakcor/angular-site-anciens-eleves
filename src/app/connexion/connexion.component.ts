import { Component, OnInit } from '@angular/core';
import {User} from '../interface/user'
import { ConnexionService } from '../services/connexion.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  identification:User;
  constructor(public connexion:ConnexionService,private router: Router) {
   }

  ngOnInit() {
    this.identification={
      id:"",
      pwd:""
    }
  }

  envoie(){
    console.log(this.identification)
    this.connexion.connect()
    if (this.connexion.isconnected()){
      this.router.navigate(['/etudiant']);
    }
   
  }
}
