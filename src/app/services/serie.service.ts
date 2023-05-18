import { AuthService } from './auth.service';
//import { SerieService } from './serie.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serie } from '../model/serie.model';
import { TypeWrapper } from '../model/typeWrapped.model';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';


const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class SerieService {
  [x: string]: any;
  apiURL: string = 'http://localhost:8082/series/api';
  apiURLTyp: string = 'http://localhost:8082/series/api/typ';

  series! : Serie[]; 
  types!:Type[];

  
 

  constructor(private router:Router,private http : HttpClient, private authService: AuthService) { 
    
   /*
   this.types=[{idType:1,nomTy:"Drama"},
                {idType:2 , nomTy:"Aventure"}];*/

   
                
  }

  listeSerie(): Observable<Serie[]>{
    return this.http.get<Serie[]>(this.apiURL+"/all");
    /* let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Serie[]>(this.apiURL+"/all",{headers:httpHeaders}); */
    }

    ajouterSerie( ser: Serie):Observable<Serie>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.post<Serie>(this.apiURL+"/addser", ser, {headers:httpHeaders});
      //return this.http.post<Serie>(this.apiURL, ser, httpOptions);
      }

      supprimerSerie(id : number) {
          const url = `${this.apiURL}/delser/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.delete(url, {headers:httpHeaders});
        /* const url = `${this.apiURL}/${id}`;
        return this.http.delete(url, httpOptions); */
        }

        
        consulterSerie(idSerie: number): Observable<Serie> {
          const url = `${this.apiURL}/getbyid/${idSerie}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<Serie>(url,{headers:httpHeaders});
          /* const url = `${this.apiURL}/${idSerie}`;
          return this.http.get<Serie>(url); */
          }

          trierSeries(){
            this.series = this.series.sort((n1,n2) => {
              if (n1.idSerie > n2.idSerie) {
                  return 1;
              }
             if (n1.idSerie < n2.idSerie) {
                  return -1;
              }
            return 0;
          });
          }
      

      updateSerie(ser:Serie) : Observable<Serie>
            {
              let jwt = this.authService.getToken();
              jwt = "Bearer "+jwt;
              let httpHeaders = new HttpHeaders({"Authorization":jwt})
              return this.http.put<Serie>(this.apiURL+"/updateser", ser, {headers:httpHeaders});
            //return this.http.put<Serie>(this.apiURL, ser, httpOptions);
            }

         
         
      listeTypes():Observable<TypeWrapper>{
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<TypeWrapper>(this.apiURLTyp,{headers:httpHeaders}
        );
                    } 
            
     rechercherParType(idType: number):Observable< Serie[]> {
      const url = `${this.apiURL}/serstyp/${idType}`;
          return this.http.get<Serie[]>(url);
        /* const url = `${this.apiURL}/serstyp/${idType}`;
          return this.http.get<Serie[]>(url); */
          }
    rechercherParNom(nom: string):Observable< Serie[]> {
      const url = `${this.apiURL}/sersByName/${nom}`;
        return this.http.get<Serie[]>(url);
            } 
    ajouterType( type: Type):Observable<Type>{
      return this.http.post<Type>(this.apiURLTyp, type, httpOptions);   
           //return this.http.post<Type>(this.apiURLTyp, type, httpOptions);
              }
    consultertype(id:number): Type{
        return this.types.find(type => type.idType == id)!;} 
        
        supprimerType(id : number) {
          const url = `${this.apiURLTyp}/${id}`;
          return this.http.delete(url, httpOptions);
          }
}