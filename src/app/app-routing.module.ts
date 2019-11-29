import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuard } from './services/auth.guard';
import { RgpdComponent } from './rgpd/rgpd.component';
import { NotfoundComponent } from './notfound/notfound.component';



const routes: Routes = [
  {path:'accueil',component:AccueilComponent},
  {path:'etudiant/:id',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'etudiant',component:EtudiantComponent, canActivate:[AuthGuard]},
  {path:'connexion',component:ConnexionComponent},
  {path:'rgpd',component:RgpdComponent},
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
  { path: '', redirectTo: 'accueil',pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
