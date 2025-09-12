# 🎨 Frontend - Gestión de Cupones

Este es el frontend de la aplicación de **Gestión de Cupones**, desarrollado en **Angular**.  
Se encarga de mostrar la lista de cupones, realizar operaciones CRUD contra el backend y visualizar el estado de cada cupón (activo o expirado).

---

(SOLO ESTÁ MAQUETADO E IMPLEMENTADO LAS FUNCIONALIDADES DE GESTIÓN REQUERIDAS)

---

## 🚀 Funcionalidades
- Listar cupones paginados.
- Crear, editar y eliminar cupones.
- Mostrar el estado de cada cupón:
  - ✅ Activo
  - ❌ Expirado (si la fecha de expiración ya pasó).
- Mostrar notificaciones tipo *toastr* para las acciones realizadas.

---

## ⚙️ Tecnologías utilizadas
- [Angular 19](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Toastr personalizado](#) (para notificaciones)

---

## 📦 Instalación y ejecución

```bash
git clone https://github.com/tu-usuario/frontend-coupons.git
cd frontend-coupons
npm install
ng serve
```
## 📦 Credenciales del Login

username: admin@gmail.com
password: admin

página para la administración de productos admin/coupons

## 📦 Build para producción
```bash
ng build --configuration production
```
