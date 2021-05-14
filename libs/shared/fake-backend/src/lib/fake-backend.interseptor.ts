import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Task } from '@mabna/task-management/model';

function idCreator() {
  return new Date().getTime() + Math.floor(Math.random() * 100);
}

const users = [
  {
    id: 1,
    username: 'admin',
    type: 1,
    password: '123?',
    token: 'fake-jwt-token1'
  },
  {
    id: 2,
    username: 'user1',
    type: 2,
    password: '456?'
    ,
    token: 'fake-jwt-token2'
  },
  {
    id: 3,
    username: 'user2',
    type: 2,
    password: '789?',
    token: 'fake-jwt-token3'
  }
];

let tasks: Task[] = [
  {
    id: idCreator(),
    userId: 2,
    title: 'First User Task 1',
    deadline: '5/18/2021'
  },
  {
    id: idCreator(),
    userId: 2,
    title: 'First User Task 2',
    deadline: '6/18/2021'
  },
  {
    id: idCreator(),
    userId: 3,
    title: 'Second User Task 1',
    deadline: '7/18/2021'
  },
  {
    id: idCreator(),
    userId: 3,
    title: 'Second User Task 2',
    deadline: '8/18/2021'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/tasks') && method === 'POST':
          return addTask();
        case url.endsWith('/tasks') && method === 'PUT':
          return updateTask();
        case url.endsWith('/tasks') && method === 'GET':
          return getTasks();
        case url.match(/\/tasks\/\d+$/) && method === 'DELETE':
          return deleteTask();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        type: user.type,
        token: user.token
      });
    }

    function addTask() {
      if (!isLoggedIn()) return unauthorized();
      const task = { ...body };
      const userId = getUserId(headers.get('Authentication'));
      task.id = idCreator();
      task.userId = userId;
      tasks.push(task);
      return ok(task);
    }

    function updateTask() {
      if (!isLoggedIn()) return unauthorized();
      const task: Task = { ...body };
      const index = tasks.findIndex((item: Task) => item.id === task.id);
      tasks[index] = task;
      return ok(task);
    }

    function getTasks() {
      if (!isLoggedIn()) return unauthorized();

      const userId = getUserId(headers.get('Authentication'));
      return ok(tasks.filter(task => task.userId === userId));
    }

    function deleteTask() {
      if (!isLoggedIn()) return unauthorized();
      tasks = tasks.filter(x => x.id !== idFromUrl());
      return ok(idFromUrl());
    }

    // helper functions

    function getUserId(token) {
      return users.filter(user => user.token === token.substr(token.indexOf(' ') + 1))[0].id;
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return users.some(user => 'Bearer ' + user.token === headers.get('Authentication'));
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
