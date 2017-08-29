import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LocalStorageService } from 'ngx-store';
import { UserProfile } from '../../models/index';

import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  private readonly DB_USERS_REF = '/users/';
  private readonly KEY_USER_PROFILE = 'user_profile';

  user: firebase.User;

  private _userProfile: UserProfile;
  get userProfile(): UserProfile {
    if (this._userProfile) {
      return this._userProfile;
    } else {
      return this.localStorageService.get(this.KEY_USER_PROFILE);
    }
  }
  set userProfile(profile: UserProfile) {
    this._userProfile = profile;
    this.localStorageService.set(this.KEY_USER_PROFILE, this.userProfile);
  }

  private userProfileSubscription: Subscription;
  private isFirstTime: boolean;

  constructor(private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase,
              private localStorageService: LocalStorageService,
              private router: Router) {
    this.isFirstTime = true;

    afAuth.authState.subscribe((user: firebase.User) => {
      this.setUserAndFetchProfile(user);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      setTimeout(() => {
        this.internalIsAuthenticatedCheck(observer);
      }, 100);
    });
  }

  registerWithEmail(displayName: string, email: string, password: string): Observable<any> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user: firebase.User) => {
        const userProfile = <UserProfile> {
          displayName: displayName,
          role: 'user'
        };
        user.sendEmailVerification().then(() => {
          this.afDatabase.object(this.DB_USERS_REF + user.uid).set(userProfile).then(() => {
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
        const userProfile = <UserProfile>{
          displayName: data.user.providerData[0].displayName || '',
          role: 'user'
        };
        this.updateUserProfile(data.user, userProfile).subscribe(
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
    this.localStorageService.clear();

    setTimeout(() => {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    });
  }

  updateUserProfile(user: firebase.User, metadata: UserProfile): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.afDatabase.object(this.DB_USERS_REF + user.uid).update(metadata).then(() => {
            observer.next(true);
            observer.complete();
          }).catch((error: any) => {
            observer.error(error);
          });
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
        this.user.getToken().then((token: string) => {
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
      this.userProfileSubscription = this.afDatabase.object(this.DB_USERS_REF + this.user.uid).subscribe((userProfile: any) => {
        this.userProfile = userProfile;
      });
    }
  }

}
