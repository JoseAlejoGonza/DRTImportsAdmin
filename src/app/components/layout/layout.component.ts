import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // this.router.navigate(['/home/shopping']);
  }

}
