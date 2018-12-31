import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private api:RestApiService,public router: Router) { }

  ngOnInit() {
  }
   async onSubmit(value){
    console.log(JSON.stringify(value));
      await this.api.createCustomer(JSON.stringify(value))
      .subscribe(res => {
          this.router.navigate(['/home']);
        }, (err) => {
          console.log(err);
        });
    }
  }

