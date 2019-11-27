import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EtudiantService } from '../services/etudiant.service';


export interface DialogData {
  pseudo: string;
  mdp: string;
  nom:string;
  prenom:string;
  promo:string;
  entreprise:string;
  showpromo:string;
  showentreprise:string;
}

@Component({
  selector: 'app-create-etudiant',
  templateUrl: './create-etudiant.component.html',
  styleUrls: ['./create-etudiant.component.css']
})
export class CreateEtudiantComponent implements OnInit {

  result:number=0
  constructor(
    public dialogRef: MatDialogRef<CreateEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public etuServ:EtudiantService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValidClick(): void {
    console.log(this.data)
    if (this.data.nom!="" && this.data.prenom!="" && this.data.pseudo!="" && this.data.mdp!=""){
      this.etuServ.createstudent(this.data)
      this.dialogRef.close(this.data);
    }
    
  }

  ngOnInit(){}

}
