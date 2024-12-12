import { Component } from '@angular/core';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
[x: string]: any;
  products:any[]=[{id:1, nombre:"REM", precio: 1, categoria_id: 1,},
    {id:1, nombre:"REM", precio: 23, categoria_id: 1,},
    {id:1, nombre:"REM", precio: 25.2, categoria_id: 1,},
    {id:1, nombre:"REM", precio: 153.5, categoria_id: 1,},
    {id:1, nombre:"REM", precio: 4.32, categoria_id: 1,},
    {id:1, nombre:"REM", precio: 52.3, categoria_id: 1,},
   
  ];
  cols:any[]=[];
  openNew(){

  }
  
  editProduct(prod:any){

  }
  deleteProduct(prod:any){
    
  }

}
