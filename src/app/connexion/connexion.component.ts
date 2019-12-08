import { Component, OnInit, Inject } from '@angular/core';
import {User} from '../interface/user'
import { ConnexionService } from '../services/connexion.service';
import {Router} from "@angular/router"
import { CreateEtudiantComponent } from '../create-etudiant/create-etudiant.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  identification:User;
  error:boolean=false;
  created:boolean=false;
  constructor(public connexion:ConnexionService,private router: Router,public dialog:MatDialog) {
   }

  ngOnInit() {
    this.identification={
      id:"",
      pwd:""
    }
  }

  envoie(){
    console.log(this.identification)
    this.connexion.connect(this.identification.id,this.identification.pwd)
    if (this.connexion.isconnected()){
      this.router.navigate(['/etudiant']);
    }else{
      this.error=true;
      this.created=false;
    }
   
  }

  inscription(): void {
    const dialogRef = this.dialog.open(CreateEtudiantComponent, {
      width: '600px',
      data: {pseudo: this.identification.id, mdp: this.identification.pwd,nom:"",prenom:"",promo:"",entreprise:"",showpromo:false,showentreprise:false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (!isNaN(result)){
        this.created=true
        this.error=false
      }
      
    });
  }


  
}
