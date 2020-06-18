import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/models/formation';
import { FormationService } from 'src/app/services/formation.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  formation = new Formation();


  constructor(
    private formationService: FormationService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  CreateFormation() {
    let record = {};
    record['Name'] = this.formation.Name;
    record['Description'] = this.formation.Description;
    record['Duration'] = this.formation.Duration;
    record['Price'] = this.formation.Price;
    this.formationService.create_NewFormation(record).then(resp => {
      this.formation.Name = "";
      this.formation.Description = "";
      this.formation.Duration = "";
      this.formation.Price = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  Return() {
    this.navCtrl.navigateForward('/dashboard');
  }

}
