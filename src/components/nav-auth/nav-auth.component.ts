import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-auth',
  imports: [RouterModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.css',
})
export class NavAuthComponent {}
