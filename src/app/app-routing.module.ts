import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  {path:'',component:AccueilComponent},
  {path:'etudiant/:id',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'etudiant',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'connexion',component:ConnexionComponent},
  { path: '404', component: AccueilComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
