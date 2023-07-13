"use strict";(self.webpackChunkEleccionesFront=self.webpackChunkEleccionesFront||[]).push([[941],{6136:(f,d,a)=>{a.d(d,{k:()=>j});var l=a(2828),r=a(6223),m=a(7700),h=a(5136),C=a(9460),Z=a(3519),p=a.n(Z),e=a(5879),b=a(5573),T=a(6814),g=a(2296),_=a(4170),v=a(2032),E=a(8525),O=a(3680);function A(t,s){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"El nrp de mesa es requeridos"),e.qZA())}function P(t,s){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"La Cantidad de votantes es requerida"),e.qZA())}function U(t,s){if(1&t&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.Q6J("value",o.id),e.xp6(1),e.Oqu(o.nombre)}}function D(t,s){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"La escuela es requerida"),e.qZA())}function y(t,s){if(1&t&&(e.TgZ(0,"mat-option",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.Q6J("value",o.id),e.xp6(1),e.Oqu(o.nombre)}}function N(t,s){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"La eleccion a la que pertenece es requerida"),e.qZA())}let x=(()=>{class t{constructor(o,n,i,c){this.dialogRef=o,this.formBuilder=n,this.abmService=i,this.data=c,this.escuelas=[],this.elecciones=[],this.isUpdate=!1,this.mesa=c.mesa}loadData(){const o=new h.T,n=new C.y;this.abmService.getAllEntity(o).subscribe(i=>{this.escuelas=i.map(c=>Object.assign(new h.T,c))}),this.abmService.getAllEntity(n).subscribe(i=>{this.elecciones=i.map(c=>Object.assign(new C.y,c))})}ngOnInit(){this.loadData(),this.form=this.formBuilder.group({numeroMesa:["",r.kI.required],cantidad_votantes:["",r.kI.required],escuela_id:["",r.kI.required],eleccion_id:["",r.kI.required]}),this.mesa&&(this.isUpdate=!0,this.form.patchValue({...this.mesa}))}saveMesa(){if(this.form.valid)if(this.mesa){let o=Object.assign(new l.q,this.form.value);o.id=this.mesa.id,this.abmService.update(o).subscribe(n=>{p().fire({icon:"success",title:"Actualizaci\xf3n exitosa",text:"Los datos de la mesa han sido actualizados"}),this.dialogRef.close()})}else{let o=new l.q;o=Object.assign(new l.q,this.form.value),this.abmService.create(o).subscribe(n=>{p().fire({icon:"success",title:"Alta exitosa",text:`Se genero una nueva Mesa con ID = ${n.id}`}),this.dialogRef.close()})}}closeModal(o){o.stopPropagation(),o.preventDefault(),this.dialogRef.close()}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(m.so),e.Y36(r.qu),e.Y36(b.I),e.Y36(m.WI))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-mesas-modal"]],decls:27,vars:11,consts:[[1,"form-container"],[3,"formGroup","ngSubmit"],["appearance","fill",1,"input-field"],["matInput","","placeholder","Nro de Mesa","formControlName","numeroMesa"],[4,"ngIf"],["matInput","","placeholder","Cantidad Votantes","formControlName","cantidad_votantes"],["formControlName","escuela_id",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","eleccion_id",3,"ngModel","ngModelChange"],[1,"button-container"],["mat-raised-button","","type","submit",1,"btn-guardar",3,"disabled"],["mat-button","",1,"btn-cerrar",3,"click"],[3,"value"]],template:function(o,n){1&o&&(e.TgZ(0,"mat-dialog-content",0)(1,"h2"),e._uU(2),e.qZA(),e.TgZ(3,"form",1),e.NdJ("ngSubmit",function(){return n.saveMesa()}),e.TgZ(4,"mat-form-field",2),e._UZ(5,"input",3),e.YNc(6,A,2,0,"mat-error",4),e.qZA(),e.TgZ(7,"mat-form-field",2),e._UZ(8,"input",5),e.YNc(9,P,2,0,"mat-error",4),e.qZA(),e.TgZ(10,"mat-form-field",2)(11,"mat-label"),e._uU(12,"Escuela"),e.qZA(),e.TgZ(13,"mat-select",6),e.NdJ("ngModelChange",function(c){return n.form.value.escuela_id=c}),e.YNc(14,U,2,2,"mat-option",7),e.qZA(),e.YNc(15,D,2,0,"mat-error",4),e.qZA(),e.TgZ(16,"mat-form-field",2)(17,"mat-label"),e._uU(18,"Eleccion"),e.qZA(),e.TgZ(19,"mat-select",8),e.NdJ("ngModelChange",function(c){return n.form.value.eleccion_id=c}),e.YNc(20,y,2,2,"mat-option",7),e.qZA(),e.YNc(21,N,2,0,"mat-error",4),e.qZA(),e.TgZ(22,"div",9)(23,"button",10),e._uU(24,"Guardar"),e.qZA(),e.TgZ(25,"button",11),e.NdJ("click",function(c){return n.closeModal(c)}),e._uU(26,"Cerrar"),e.qZA()()()()),2&o&&(e.xp6(2),e.Oqu(n.isUpdate?"Actualizar Mesa":"Agregar Mesa"),e.xp6(1),e.Q6J("formGroup",n.form),e.xp6(3),e.Q6J("ngIf",n.form.controls.numeroMesa.hasError("required")),e.xp6(3),e.Q6J("ngIf",n.form.controls.cantidad_votantes.hasError("required")),e.xp6(4),e.Q6J("ngModel",n.form.value.escuela_id),e.xp6(1),e.Q6J("ngForOf",n.escuelas),e.xp6(1),e.Q6J("ngIf",n.form.controls.escuela_id.hasError("required")),e.xp6(4),e.Q6J("ngModel",n.form.value.eleccion_id),e.xp6(1),e.Q6J("ngForOf",n.elecciones),e.xp6(1),e.Q6J("ngIf",n.form.controls.eleccion_id.hasError("required")),e.xp6(2),e.Q6J("disabled",n.form.invalid))},dependencies:[T.sg,T.O5,g.lW,m.xY,_.KE,_.hX,_.TO,v.Nt,E.gD,O.ey,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:#c9cacf;color:#fff;padding:20px}.input-field[_ngcontent-%COMP%]{width:100%;margin-bottom:15px}.input-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .input-field[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%]{height:40px;padding:10px;border:none;border-radius:4px;background-color:#f2f2f2;font-size:16px;transition:background-color .3s ease}.input-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .input-field[_ngcontent-%COMP%]   mat-select[_ngcontent-%COMP%]:focus{outline:none}.mat-form-field-appearance-fill.mat-form-field-can-float[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%]{color:#c43f3f}.mat-error[_ngcontent-%COMP%]{color:red;font-size:14px;margin-top:4px}.button-container[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;margin-top:20px}.button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:30px;width:150px}.btn-cerrar[_ngcontent-%COMP%]{background-color:#e91e63;color:#fff}.button-container[_ngcontent-%COMP%]   button.btn-guardar[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff}"]}),t})();var q=a(617),u=a(5313);function Y(t,s){1&t&&(e.TgZ(0,"th",11),e._uU(1," Numero de Mesa "),e.qZA())}function B(t,s){if(1&t&&(e.TgZ(0,"td",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.xp6(1),e.hij(" ",o.numeroMesa," ")}}function J(t,s){1&t&&(e.TgZ(0,"th",11),e._uU(1," Escuela "),e.qZA())}function k(t,s){if(1&t&&(e.TgZ(0,"td",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.xp6(1),e.hij(" ",o.Escuela.nombre," ")}}function I(t,s){1&t&&(e.TgZ(0,"th",11),e._uU(1," Eleccion "),e.qZA())}function Q(t,s){if(1&t&&(e.TgZ(0,"td",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.xp6(1),e.hij(" ",o.Eleccion.nombre," ")}}function R(t,s){1&t&&(e.TgZ(0,"th",11),e._uU(1," Cant. Votantes "),e.qZA())}function w(t,s){if(1&t&&(e.TgZ(0,"td",12),e._uU(1),e.qZA()),2&t){const o=s.$implicit;e.xp6(1),e.hij(" ",o.cantidad_votantes," ")}}function $(t,s){1&t&&(e.TgZ(0,"th",11),e._uU(1," Acciones "),e.qZA())}function F(t,s){if(1&t){const o=e.EpF();e.TgZ(0,"td",12)(1,"button",13),e.NdJ("click",function(){const c=e.CHM(o).$implicit,M=e.oxw();return e.KtG(M.abrirModalActualizar(c))}),e.TgZ(2,"mat-icon"),e._uU(3,"edit"),e.qZA()(),e.TgZ(4,"button",14),e.NdJ("click",function(){const c=e.CHM(o).$implicit,M=e.oxw();return e.KtG(M.borrarEleccion(c))}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA()()()}}function S(t,s){1&t&&e._UZ(0,"tr",15)}function L(t,s){1&t&&e._UZ(0,"tr",16)}let j=(()=>{class t{constructor(o,n){this.ambServices=o,this.dialog=n,this.mesas=[],this.displayedColumns=["numeroMesa","escuela","eleccion","cantidad_votantes","acciones"]}ngOnInit(){this.loadData()}loadData(){const o=new l.q;this.ambServices.getAllEntity(o).subscribe(n=>{this.mesas=n.map(i=>Object.assign(new l.q,i))})}abrirModalAgregar(){this.dialog.open(x,{data:{mesa:void 0},width:"500px",panelClass:"custom-modal-background"}).afterClosed().subscribe(n=>{console.log("El modal se cerr\xf3"),this.loadData()})}abrirModalActualizar(o){this.dialog.open(x,{data:{mesa:o},width:"500px",panelClass:"custom-modal-background"}).afterClosed().subscribe(i=>{this.loadData(),console.log("Resultado del modal de actualizaci\xf3n:",i)})}borrarEleccion(o){p().fire({title:"\xbfEst\xe1s seguro?",text:"Esta acci\xf3n no se puede deshacer",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"S\xed, borrar",cancelButtonText:"Cancelar"}).then(n=>{n.isConfirmed&&this.ambServices.delete(o).subscribe(i=>{p().fire({icon:"success",title:"Escuela borrada",text:"La mesa  ha sido borrada exitosamente"}),this.loadData()},i=>{p().fire({icon:"error",title:"Error al borrar escuela",text:"Ha ocurrido un error al borrar la mesa"}),console.log(i)})})}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(b.I),e.Y36(m.uw))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-mesas"]],decls:21,vars:3,consts:[["mat-fab","","color","primary",1,"floating-button",3,"click"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","numeroMesa"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","escuela"],["matColumnDef","eleccion"],["matColumnDef","cantidad_votantes"],["matColumnDef","acciones"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],["mat-icon-button","","color","primary",3,"click"],["mat-icon-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,n){1&o&&(e.TgZ(0,"button",0),e.NdJ("click",function(){return n.abrirModalAgregar()}),e.TgZ(1,"mat-icon"),e._uU(2,"add"),e.qZA()(),e.TgZ(3,"table",1),e.ynx(4,2),e.YNc(5,Y,2,0,"th",3),e.YNc(6,B,2,1,"td",4),e.BQk(),e.ynx(7,5),e.YNc(8,J,2,0,"th",3),e.YNc(9,k,2,1,"td",4),e.BQk(),e.ynx(10,6),e.YNc(11,I,2,0,"th",3),e.YNc(12,Q,2,1,"td",4),e.BQk(),e.ynx(13,7),e.YNc(14,R,2,0,"th",3),e.YNc(15,w,2,1,"td",4),e.BQk(),e.ynx(16,8),e.YNc(17,$,2,0,"th",3),e.YNc(18,F,7,0,"td",4),e.BQk(),e.YNc(19,S,1,0,"tr",9),e.YNc(20,L,1,0,"tr",10),e.qZA()),2&o&&(e.xp6(3),e.Q6J("dataSource",n.mesas),e.xp6(16),e.Q6J("matHeaderRowDef",n.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",n.displayedColumns))},dependencies:[q.Hw,g.RK,g.cs,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk],styles:[".custom-modal-background[_ngcontent-%COMP%]{background-color:#1a237e;background-image:linear-gradient(to bottom,#1a237e,#3949ab)}.floating-button[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px;border-radius:50%;background-color:#4caf50;color:#fff}.floating-button[_ngcontent-%COMP%]:hover{background-color:#52e85a}"]}),t})()},9765:(f,d,a)=>{a.d(d,{h:()=>r});var l=a(2061);class r extends l.e{getFilterText(){return`${this.nombre} ${this.apellido}`}constructor(){super()}get endPoint(){return"candidatos"}}},2962:(f,d,a)=>{a.d(d,{r:()=>r});var l=a(2061);class r extends l.e{constructor(){super()}get endPoint(){return"cargos"}getFilterText(){return this.nombre}}},4763:(f,d,a)=>{a.d(d,{Q:()=>r});var l=a(2061);class r extends l.e{getFilterText(){return`${this.nombre} ${this.apellido} ${this.dni}`}constructor(){super()}get endPoint(){return"companeros"}}},9460:(f,d,a)=>{a.d(d,{y:()=>r});var l=a(2061);class r extends l.e{static endURL(){return"elecciones"}constructor(){super()}get endPoint(){return"elecciones"}getFilterText(){return`${this.nombre} `}}},5136:(f,d,a)=>{a.d(d,{T:()=>r});var l=a(2061);class r extends l.e{constructor(){super(),this.MesaElectorals=[]}get endPoint(){return"escuelas"}getFilterText(){return`${this.nombre}`}}},229:(f,d,a)=>{a.d(d,{D:()=>r});var l=a(2061);class r extends l.e{getFilterText(){return`${this.nombre} `}constructor(){super()}get endPoint(){return"partidos"}}}}]);