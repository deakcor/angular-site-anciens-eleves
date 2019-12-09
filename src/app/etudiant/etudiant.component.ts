import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {EtudiantService} from '../services/etudiant.service';
import {MatSort} from '@angular/material/sort';
import { ConnexionService } from '../services/connexion.service';
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  id:string=""
  current_student:any
  displayedColumns: string[] = ['nom', 'prenom', 'promo', 'entreprise','details'];
  constructor(private firebaseService:FirebaseService,public connexion:ConnexionService,public etuServ:EtudiantService,private router: Router, private route: ActivatedRoute, public dialog:MatDialog){
    
    
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.route.params.subscribe(
      p=>{
      try{
        this.firebaseService.getUsers().subscribe(
          res=>res.forEach(element=>{
            if (element.payload.doc.data()["pseudo"]==p["id"]){
              this.id=element.payload.doc.id
              this.current_student=element.payload.doc.data()
            }
          }
            )
        );
        console.log(this.connexion.getid())
      }catch (e){
        this.id="";
        this.current_student={};
      }
      }
    )
  }

  applyFilter(filterValue: string) {
    //Au final j'utilise pas le pipe car datasource a deja une variable filter
    this.etuServ.dataSource.filter = filterValue.trim().toLowerCase();
  }

  supprimer():void{
    this.etuServ.deleteEtudiant(this.id)
    
    if (this.id==this.connexion.getid()){
      this.connexion.disconnect()
      this.router.navigate(['/accueil']);
    }else{
      this.router.navigate(['/etudiant']);
    }
    
    
  }

  modifier(rien:boolean=false): void {
    const dialogRef = this.dialog.open(CreateEtudiantComponent, {
      width: '600px',
      data: !rien?{pseudo: this.etuServ.etudiants[this.id].pseudo, mdp: this.etuServ.etudiants[this.id].mdp,nom:this.etuServ.etudiants[this.id].nom,
        prenom:this.etuServ.etudiants[this.id].prenom,
        promo:this.etuServ.etudiants[this.id].promo,entreprise:this.etuServ.etudiants[this.id].entreprise,showpromo:this.etuServ.etudiants[this.id].showpromo,
        showentreprise:this.etuServ.etudiants[this.id].showentreprise}
        :{pseudo: "", mdp: "",nom:"",
        prenom:"",
        promo:"",entreprise:"",showpromo:false,
        showentreprise:false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
