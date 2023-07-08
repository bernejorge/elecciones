import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "../Shared/services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private spinnerSrv: SpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor del spinnerSrv");
        this.spinnerSrv.mostrarSpinner();

        return next.handle(req).pipe(
            finalize(() => this.spinnerSrv.ocultarSpinner())
        );
    }


}
