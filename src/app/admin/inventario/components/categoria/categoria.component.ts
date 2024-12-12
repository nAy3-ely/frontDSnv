import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

interface Categoria{
  id: number,
  nombre: string,
  detalle:string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  private categoriaService=inject(CategoriaService)

  categorias:Categoria[]=[]
  dialog_visible: boolean=false
  categoria_id:number=-1;
  
  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    detalle: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  ngOnInit():void{
    this.getCategorias()
  }
  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        console.log('Datos obtenidos:', res); // Verifica los datos en consola
        this.categorias = res;
      },
      (error: any) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }
  
  mostrarDialogo(){
    this.dialog_visible=true
  }

  guardarCategoria() {
  if (this.categoriaForm.valid) {
    if (this.categoria_id > 0) {
      // Modificar categoría existente
      this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias();
          this.categoria_id = -1;
          this.alerta("ACTUALIZADO", "La categoría se modificó con éxito!", "success");
        },
        (error: any) => {
          console.error('Error al actualizar categoría:', error);
          this.alerta("ERROR AL ACTUALIZAR", "Verifica los datos!", "error");
        }
      );
    } else {
      // Crear nueva categoría
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias();
          this.alerta("REGISTRADO", "La categoría se creó con éxito!", "success");
        },
        (error: any) => {
          console.error('Error al guardar categoría:', error);
          this.alerta("ERROR AL REGISTRAR", "Verifica los datos!", "error");
        }
      );
    }
    this.categoriaForm.reset();
  } else {
    this.alerta("FORMULARIO INVÁLIDO", "Por favor completa todos los campos.", "error");
  }
}

  editarCategoria(cat:Categoria){
    this.dialog_visible=true
    this.categoria_id=cat.id
    this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle})
  }
  eliminarCategoria(cat:Categoria){
    Swal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
  }).then((result) => {
      if (result.isConfirmed) {
          this.categoriaService.funEliminar(cat.id).subscribe(
              (res:any)=>{
                  
                  this.alerta("ELIMINANDO!","Categoria eliminada","success")
                  
                  this.getCategorias();
                  this.categoria_id=-1
              },
              (error:any)=>{
                  
                      this.alerta("ERROR!", "Error al intentar eliminar", "error")
                  
              }
            )

          }
        });
      }
      
      alerta(title:string, text:string, icon:'success'|'error'|'info'|'question'){
        Swal.fire({
          title: title,
          text:text,
          icon:icon
        });
      }
    }