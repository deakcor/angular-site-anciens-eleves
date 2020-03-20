import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ExtranetfRoutingModule } from './extranet-routing.module';
import { StatsComponent } from './stats/stats.component';
import { MatButtonModule,MatDividerModule,MatIconModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatSliderModule, MatSortModule } from '@angular/material';
import {  HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    EtudiantComponent,
    StatsComponent
  ],
  
  imports: [
    ExtranetfRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    HighchartsChartModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule
  ]
})
export class ExtranetModule { }
