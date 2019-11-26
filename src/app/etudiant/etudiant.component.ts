import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {EtudiantService} from '../services/etudiant.service';
import {MatSort} from '@angular/material/sort';
import { ConnexionService } from '../services/connexion.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  id:number=-1
  displayedColumns: string[] = ['nom', 'prenom', 'promo', 'entreprise','details'];
  constructor(public connexion:ConnexionService,public etuServ:EtudiantService, private route: ActivatedRoute){
    console.log(etuServ.etudiants);
    
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.route.params.subscribe(
      p=>{
        try{
        this.id=+p['id'];
        console.log(this.connexion.getid())
      }catch (e){
        this.id=-1;
      }
      if (isNaN(this.id)){
        this.id=-1;
      }
      }
    )
  }

  applyFilter(filterValue: string) {
    this.etuServ.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
