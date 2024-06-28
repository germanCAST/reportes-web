import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { V } from '@angular/cdk/keycodes';
/**
 * Create by: germancast
 */
@Component({
  selector: 'app-form',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatDivider,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  public profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      numeroTecnico: ['', [Validators.required, Validators.minLength(3)]],
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      depto: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      servicio: ['', [Validators.required, Validators.minLength(3)]],
      problemaDescripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // fecha: Date = new Date();
  // nombreTecnico: string = '' || 'tecnico name';
  // empresa: string = '' || 'empresa';
  departamento: string = '' || 'departamento';
  // numeroTecnico: string = '' || 'numero tecnico';
  servicioSelected: string = '' || 'servicio';
  departamentosGt = [
    { id: 1, name: 'Guatemala' },
    { id: 2, name: 'Santa Rosa' },
    { id: 3, name: 'Sacatepéquez' },
    { id: 4, name: 'Chimaltenango' },
    { id: 5, name: 'Escuintla' },
    { id: 6, name: 'Jalapa' },
    { id: 7, name: 'Jutiapa' },
    { id: 8, name: 'El Progreso' },
    { id: 9, name: 'Zacapa' },
    { id: 10, name: 'Chiquimula' },
    { id: 11, name: 'Sololá' },
    { id: 12, name: 'Totonicapán' },
    { id: 13, name: 'Quetzaltenango' },
    { id: 14, name: 'Suchitepéquez' },
    { id: 15, name: 'Retalhuleu' },
    { id: 16, name: 'San Marcos' },
    { id: 17, name: 'Huehuetenango' },
    { id: 18, name: 'Quiché' },
    { id: 19, name: 'Baja Verapaz' },
    { id: 20, name: 'Alta Verapaz' },
    { id: 21, name: 'Petén' },
    { id: 22, name: 'Izabal' },
    { id: 23, name: 'Santa Bárbara' },
  ];
  direccion: string = '' || 'ingrese una direccion';
  servicioTipo = '' || [
    { id: 1, name: 'Desarrollo de Software' },
    { id: 2, name: 'Consultoría en TI' },
    { id: 3, name: 'Seguridad Cibernética' },
    { id: 4, name: 'Cloud Computing' },
    { id: 5, name: 'Soporte Técnico' },
    { id: 6, name: 'Integración de Sistemas' },
    { id: 7, name: 'Análisis de Datos' },
    { id: 8, name: 'Inteligencia Artificial' },
    { id: 9, name: 'Machine Learning' },
    { id: 10, name: 'Automatización de Procesos' },
    { id: 11, name: 'Gestión de Proyectos de IT' },
    { id: 12, name: 'Diseño UX/UI' },
    { id: 13, name: 'Desarrollo Web' },
    { id: 14, name: 'Desarrollo de Aplicaciones Móviles' },
    { id: 15, name: 'Ciberseguridad' },
    { id: 16, name: 'Auditoría de Sistemas' },
    { id: 17, name: 'Virtualización' },
    { id: 18, name: 'Blockchain Solutions' },
    { id: 19, name: 'Big Data Analytics' },
    { id: 20, name: 'IoT Solutions' },
    { id: 21, name: 'Administración de Redes' },
    { id: 22, name: 'Optimización de Sistemas' },
    { id: 23, name: 'Ingeniería de Software' },
    { id: 24, name: 'Migración a la Nube' },
    { id: 25, name: 'Consultoría en Transformación Digital' },
  ];
  problemaDescripcion: string = '' || 'Descripcion del problema';

  setDepto(depto: number) {
    this.departamento = this.departamentosGt[depto - 1].name;
  }
  setServicio(servicio: number) {
    this.servicioSelected = this.servicioTipo[servicio - 1].name;
  }

  // public downloadAsPDF(formulario: any) {
  //   console.log();
  // }

  public downloadAsPDF(formulario: any) {
    const options: Intl.DateTimeFormat = new Intl.DateTimeFormat('es-GT', {
      weekday: 'long', // Muestra el día de la semana completo (por ejemplo, "lunes")
      year: 'numeric', // Muestra el año completo (por ejemplo, "2024")
      month: 'long', // Muestra el nombre del mes completo (por ejemplo, "junio")
      day: 'numeric', // Muestra el día del mes (por ejemplo, "24")
    });

    const tecnicoName = function camelize(str: string) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toUpperCase() : word.toUpperCase();
        })
        .replace(/\s+/g, ' ');
    };

    const doc: jsPDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'letter',
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });

    const midXPage: number = doc.internal.pageSize.getWidth() / 2;

    const image: HTMLImageElement = new Image();
    // //ruta en build
    image.src = '/assets/img/png/logo.png';
    doc.setFontSize(30);
    doc.text('INFORME DE SOPORTE TECNICO', midXPage, 15, { align: 'center' });
    doc.addImage(image, 'png', 85, 115, 50, 50);

    doc.setFontSize(12);
    doc.text(options.format(formulario.fecha).toUpperCase(), 14, 25);

    autoTable(doc, {
      styles: {},
      headStyles: {
        fillColor: [110, 110, 110],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      margin: { top: 30 },
      head: [['NOMBRE DEL TECNICO', 'NUMERO TELEFONICO']],
      body: [
        [formulario.nombre.toString(), formulario.numeroTecnico.toString()],
      ],
    });

    autoTable(doc, {
      styles: { fillColor: [110, 110, 110] },
      margin: { top: 0 },
      head: [['EMPRESA', 'DEPARTAMENTO', 'DIRECCION']],
      body: [
        [
          formulario.empresa.toLocaleUpperCase(),
          this.departamento,
          formulario.direccion,
        ],
      ],
    });

    autoTable(doc, {
      styles: { fillColor: [110, 110, 110] },
      margin: { top: 0 },
      head: [['TIPO DE SERVICIO']],
      body: [[this.servicioSelected]],
    });

    autoTable(doc, {
      styles: { fillColor: [110, 110, 110] },
      margin: { top: 0 },
      head: [['DESCRIPCION TECNICA DEL SERVICIO']],
      body: [[formulario.problemaDescripcion]],
    });

    doc.setProperties({
      title: 'informe_tecnico',
    });
    //? doc.autoPrint();
    doc.output('dataurlnewwindow', {
      filename: 'Informe Tecnico',
    });
  }
}
