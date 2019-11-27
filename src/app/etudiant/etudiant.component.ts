import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {EtudiantService} from '../services/etudiant.service';
import {MatSort} from '@angular/material/sort';
import { ConnexionService } from '../services/connexion.service';
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  id:number=-1
  displayedColumns: string[] = ['nom', 'prenom', 'promo', 'entreprise','details'];
  constructor(public connexion:ConnexionService,public etuServ:EtudiantService,private router: Router, private route: ActivatedRoute, public dialog:MatDialog){
    console.log(etuServ.etudiants);
    
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.route.params.subscribe(
      p=>{
      try{
        for (let k=0;k<this.etuServ.etudiants.length;k++){
          if (this.etuServ.etudiants[k].pseudo==p['id']){
            this.id=k;
          }
        }
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

  supprimer():void{
    this.etuServ.etudiants.splice(this.id,1)
    if (this.id==this.connexion.getid()){
      this.connexion.disconnect()
    }
    
    this.router.navigate(['']);
  }

  modifier(): void {
    const dialogRef = this.dialog.open(CreateEtudiantComponent, {
      width: '600px',
      data: {pseudo: this.etuServ.etudiants[this.id].pseudo, mdp: this.etuServ.etudiants[this.id].mdp,nom:this.etuServ.etudiants[this.id].nom,
        prenom:this.etuServ.etudiants[this.id].prenom,
        promo:this.etuServ.etudiants[this.id].promo,entreprise:this.etuServ.etudiants[this.id].entreprise,showpromo:this.etuServ.etudiants[this.id].showpromo,
        showentreprise:this.etuServ.etudiants[this.id].showentreprise}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
