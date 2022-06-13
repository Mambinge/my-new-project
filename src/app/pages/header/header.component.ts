import { InterpolationConfig } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService, NbAuthToken } from '@nebular/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  picture = {};
  user! : User

  constructor(private authService: NbAuthService) { 
     this.authService.onTokenChange()
    .subscribe((token: NbAuthToken) =>  {
    
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
      }
      
    });
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

export interface User {
  name: string
}