// Source - https://stackoverflow.com/a/45221680
// Posted by Edmundo Santos, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-19, License - CC BY-SA 4.0

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let userId = localStorage.getItem('id') ?? "";
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', userId) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
