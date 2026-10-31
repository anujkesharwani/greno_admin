import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.router.navigate(['time-slot'], { relativeTo: this.route });
  }

  changed(event: any) {
    if (event.index == 0) {
      this.router.navigate(['time-slot'], { relativeTo: this.route });
    } else if (event.index == 1) {
      this.router.navigate(['agent-jobs'], { relativeTo: this.route });
    } else if (event.index == 2) {
      this.router.navigate(['payment-settlement'], { relativeTo: this.route });
    } else if(event.index == 3){
      this.router.navigate(['unapproved-agent'], { relativeTo: this.route });
    }
  }


  agent() {
    this.router.navigate(['/time-slot'])
  }
}
