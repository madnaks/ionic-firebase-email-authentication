import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/models/formation';
import { FormationService } from 'src/app/services/formation.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public getformation: Observable<Formation>;
  formation = new Formation();

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const formationId: string = this.route.snapshot.paramMap.get('id');
    this.getformation = this.formationService.getFormationDetail(formationId).valueChanges()
    this.getformation.subscribe(res => {
      this.formation = res;
    });
  }
}
