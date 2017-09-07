import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../../models';

import * as RouterActions from 'app/state/actions/router.actions';
import * as SessionActions from 'app/state/actions/session.actions';
import * as fromRoot from 'app/state/reducers';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  private readonly DB_USERS_REF = '/users/';

  user: firebase.User;

  private userProfileSubscription: Subscription;
  private isFirstTime: boolean;

  constructor(private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private store: Store<fromRoot.State>) {
    this.isFirstTime = true;

    afAuth.authState.subscribe((user: firebase.User) => {
      this.setUserAndFetchProfile(user);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.internalIsAuthenticatedCheck(observer);
    });
  }

  registerWithEmail(displayName: string, email: string, password: string): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user: firebase.User) => {
        const profile = <User> {
          displayName: displayName,
          role: 'user'
        };
        user.sendEmailVerification().then(() => {
          this.afDatabase.object(this.DB_USERS_REF + user.uid).set(profile).then(() => {
            observer.next(true);
            observer.complete();
          }).catch((error: any) => {
            observer.error(error);
          });
        }).catch((error: any) => {
          observer.error(error);
        });
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  loginWithEmail(email: string, password: string): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user: firebase.User) => {
        this.setUserAndFetchProfile(user);
        observer.next(true);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  loginWithGoogle(): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: any) => {
        const profile = <User>{
          displayName: data.user.providerData[0].displayName || '',
          role: 'user'
        };
        this.updateUserProfile(data.user, profile).subscribe(
          () => {
            observer.next(true);
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
          }
        );
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  logout() {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
    this.user = null;
    localStorage.clear(); // this clears any remaining firebase localStorage stuff...

    setTimeout(() => {
      this.afAuth.auth.signOut();
      this.store.dispatch(new RouterActions.Go({ path: ['auth/login'] }));
    });
  }

  updateUserProfile(user: firebase.User, profile: User): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afDatabase.object(this.DB_USERS_REF + user.uid).update(profile).then(() => {
            observer.next(true);
            observer.complete();
          }).catch((error: any) => {
            observer.error(error);
          });
    });
  }

  getCurrentUser(): Observable<User> {
    return this.store.select((state) => {
      return state.session.user;
    })
    .map((profile: User) => {
      return profile;
    });
  }

  private internalIsAuthenticatedCheck(observer: Observer<boolean>, iteration = 0) {
    this.isFirstTime = this.isFirstTime && this.user === undefined;

    if (this.isFirstTime && iteration < 20) {
      setTimeout(() => {
        this.internalIsAuthenticatedCheck(observer, iteration + 1);
      }, 100);
    } else {
      if (this.user && this.user.emailVerified) {
        this.user.getIdToken().then((token: string) => {
          observer.next(true);
          observer.complete();
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    }
  }

  private setUserAndFetchProfile(user: firebase.User) {
    if (!this.user && user) {
      this.user = user;
      this.userProfileSubscription = this.afDatabase.object(this.DB_USERS_REF + this.user.uid).subscribe(
        (profile: any) => {
          profile.id = profile.$key;
          this.store.dispatch(new SessionActions.SetSession(profile));
        }
      );
    }
  }

}
