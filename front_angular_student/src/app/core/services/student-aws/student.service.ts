import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://sav0d1erw2.execute-api.us-west-1.amazonaws.com/dev/';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHttpOptions());
  }

  getStudent(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student, this.getHttpOptions());
  }

  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student, this.getHttpOptions());
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
