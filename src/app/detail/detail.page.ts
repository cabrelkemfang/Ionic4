import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public navctrl:NavController) { }

    classroom: any = {};
  ngOnInit() {
    this.getClassroom();
  }

  async getClassroom() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getCustomeryById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.classroom = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async delete(id){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.deleteCustomer(this.route.snapshot.paramMap.get('id'))
    .subscribe(res => {
      console.log(res);
      this.navctrl.navigateBack('/home');
      //this.router.navigate(['/home']);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }
}
