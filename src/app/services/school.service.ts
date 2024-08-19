import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiUrl: string = "http://localhost:8080/api/schools";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.apiUrl);
  }
  add(body: any) {
    return this.http.post(this.apiUrl,body)
  }

  update(body: any,id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url,body)

  }
  getById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
  }
}
