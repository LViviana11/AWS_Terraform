import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://sav0d1erw2.execute-api.us-west-1.amazonaws.com/dev/';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, this.getHttpOptions());
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  createStudent(student: any): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, this.getHttpOptions());
  }

  updateStudent(id: string, student: any): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student, this.getHttpOptions());
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
