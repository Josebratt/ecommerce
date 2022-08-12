import { UsersService } from '@ecommerce/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'eshop';

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
