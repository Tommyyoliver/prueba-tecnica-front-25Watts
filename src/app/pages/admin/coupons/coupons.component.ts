import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponsService } from '../../../services/coupons.service';
import { CouponPanelComponent } from './coupon-panel/coupon-panel.component';

type FiltroEstado = 'TODOS' | 'ACTIVO' | 'INACTIVO';
type Orden =
  | 'ninguno'
  | 'fecha-asc'
  | 'fecha-desc'
  | 'valor-asc'
  | 'valor-desc'
  | 'estado';

interface Coupon {
  id: number;
  description: string;
  value: number;
  expiration_date: string; // idealmente ISO (yyyy-MM-dd o ISO)
  active: boolean;
  expired: boolean;
}

@Component({
  selector: 'app-coupons',
  imports: [
    CommonModule,
    FormsModule,
    CouponPanelComponent
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {

  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>)
  private couponsService = inject(CouponsService);

  coupons: any[] = [];

  abrirEstado = false;
  abrirOrden = false;

  // filtros + orden
  filtroEstado: FiltroEstado = 'TODOS';
  busqueda = '';
  orden: Orden = 'ninguno';

  // paginación
  currentPage = 1;
  itemsPerPage = 5;

  selectedCoupon: any = null;
  showPanel: boolean = false;

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(): void {
    this.couponsService.getAllCoupons()
      .then((data:Coupon[]) => {
        this.coupons = data;
      })
      .catch((err:any) => {
        console.log(err);
      })
  }

  get totalPages(): number {
    return Math.ceil(this.beneficiosProcesadosSinPaginar.length / this.itemsPerPage);
  }

    // Crear nuevo
  crearNuevo() {
    this.selectedCoupon = null;
    this.showPanel = true;
  }

  // Editar existente
  editar(c: any) {
    this.selectedCoupon = c;
    this.showPanel = true;
  }

  // Cerrar panel (ya sea guardar, editar o cancelar)
  cerrarPanel(refresh: boolean) {
    this.showPanel = false;
    this.selectedCoupon = null;

    if (refresh) {
      this.getAllCoupons(); // vuelves a pedir los cupones al backend
    }
  }

  get beneficiosProcesadosSinPaginar(): Coupon[] {
    let data = [...this.coupons];

    const q = this.busqueda?.trim().toLowerCase();
    if (q) {
      data = data.filter((c) => c.description.toLowerCase().includes(q));
    }

    if (this.filtroEstado !== 'TODOS') {
      const wantActive = this.filtroEstado === 'ACTIVO';
      data = data.filter((c) => Boolean(c.active) === wantActive);
    }

    switch (this.orden) {
      case 'fecha-asc':
        data.sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime());
        break;
      case 'fecha-desc':
        data.sort((a, b) => new Date(b.expiration_date).getTime() - new Date(a.expiration_date).getTime());
        break;
      case 'valor-asc':
        data.sort((a, b) => a.value - b.value);
        break;
      case 'valor-desc':
        data.sort((a, b) => b.value - a.value);
        break;
      case 'estado':
        data.sort((a, b) => Number(b.active) - Number(a.active));
        break;
    }

    return data;
  }

  // este getter reemplaza al actual beneficiosProcesados
  get beneficiosProcesados(): Coupon[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.beneficiosProcesadosSinPaginar.slice(start, start + this.itemsPerPage);
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

    // Cerrar dropdowns al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.abrirEstado = false;
      this.abrirOrden = false;
    }
  }

    // Toggle de menús
  toggle(menu: 'estado' | 'orden', ev: MouseEvent) {
    ev.stopPropagation();
    if (menu === 'estado') {
      this.abrirEstado = !this.abrirEstado;
      this.abrirOrden = false;
    } else {
      this.abrirOrden = !this.abrirOrden;
      this.abrirEstado = false;
    }
  }

  // Acciones de filtros
  setFiltroEstado(v: FiltroEstado) {
    this.filtroEstado = v;
  }
  
  setOrden(v: Orden) {
    this.orden = v;
    // opcional: cerrar el dropdown al seleccionar
    this.abrirOrden = false;
  }

  get beneficiosFiltrados(): any[] {
    if (this.filtroEstado === 'TODOS') return this.coupons;
    return this.coupons.filter(b => b.estado === this.filtroEstado);
  }

  eliminar(c: Coupon) {
    this.couponsService.deleteCoupon(c.id)
      .then((data) => {
        this.getAllCoupons();
      })
      .catch((err:any) => {
        console.log(err);
      })
  }


  logout(): void {
    localStorage.removeItem('user');
    this.goTo('login');
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
