import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  image:string;
  constructor(public connexion:ConnexionService,public router:Router,public etuServ:EtudiantService) {
    this.image="https://eisti.fr/sites/all/themes/eisti/assets/images/logo.gif";
   }

  ngOnInit() {
  }

}
