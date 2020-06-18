// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string; 
  formations: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formationService: FormationService
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });

    this.formationService.read_Formations().subscribe(data => {
      this.formations = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Description: e.payload.doc.data()['Description'],
          Duration: e.payload.doc.data()['Duration'],
          Price: e.payload.doc.data()['Price'],
        };
      })
      console.log(this.formations);
    });   

  }

  EditRecord(record) {
    record.isEdit = true;
    record.Name = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  RemoveRecord(rowID) {
    this.formationService.delete_Formation(rowID);
  }

  GoToCreationPage() {
    this.navCtrl.navigateForward('/create');
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}