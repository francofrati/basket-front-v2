import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  organizationId = signal<string>("Loading")

  ngOnInit(): void {
    const organizationId = this.route.snapshot.paramMap.get('organizationId') as string

    this.organizationId.set(organizationId)
  }
}
