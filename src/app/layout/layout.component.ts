import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(public authSerive: AuthService) {}

  ngOnInit(): void {}
}
