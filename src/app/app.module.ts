import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';


import { ConnexionService } from './services/connexion.service';
import { CreateEtudiantComponent } from './create-etudiant/create-etudiant.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule, MatRadioModule, MatCheckboxModule, MatCardModule} from '@angular/material';
import { RgpdComponent } from './rgpd/rgpd.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {  HighchartsChartModule } from 'highcharts-angular';
import { StatsComponent } from './stats/stats.component';
import { EtudiantsPipe } from './services/etudiants.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
    FooterComponent,
    TopbarComponent,
    EtudiantComponent,
    CreateEtudiantComponent,
    RgpdComponent,
    NotfoundComponent,
    StatsComponent,
    EtudiantsPipe
    
  ],

  entryComponents: [
    CreateEtudiantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    HighchartsChartModule
  ],
  providers: [ConnexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
