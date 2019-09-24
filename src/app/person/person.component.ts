import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  public person: any;

  private unsubscribe$ = new Subject();

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(_ => this.api.find()),
      takeUntil(this.unsubscribe$),
    ).subscribe({
      next: (person) => {
        this.person = person;
        console.log(person);
      },
      complete: () => console.log('subscription completed'),
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('person component destroyed')
  }
}
