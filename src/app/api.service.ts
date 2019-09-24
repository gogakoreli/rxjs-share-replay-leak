import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private cache = {};

  constructor(private http: HttpClient) {
  }

  public find(id = 1): Observable<any> {
    let res = this.cache[id];
    if (!res) {
      res = this.http.get(`https://swapi.co/api/people/${id}`).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      )
      this.cache[id] = res;
    }
    return res;
  }

}