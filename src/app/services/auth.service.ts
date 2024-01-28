import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private tokenReady : Subscription;

    private hasAuthorized : boolean = false;
    private authorized : boolean = false;
    private headers = {};

    constructor(private http : HttpClient) {
        this.tokenReady = new Subscription();

        if(window != undefined) {
            this.accessToken = window.localStorage.getItem("ACCESS_TOKEN_KEY");
            this.refreshToken = window.localStorage.getItem("REFRESH_TOKEN_KEY");

            if(this.refreshToken != null) {
                this.hasAuthorized = true;
                this.getTokenInfo(this.refreshToken).subscribe(res => {
                    var isActive = res['active'] as boolean;

                    if(isActive) {
                        this.refreshTokens();
                    }
                })
            }
        }
        
    }

    private refreshTokens() {
        let payload = new FormData();
        payload.append('grant_type', 'refresh_token');
        payload.append('refresh_token', this.refreshToken as string);

        this.http.post(environment.auth_token, payload, {
            headers: {
                'Authorization': environment.auth_base64
            }
        })
        .subscribe(next => {
            var data = next.valueOf() as any;
            this.accessToken = data['access_token'];
            this.refreshToken = data['refresh_token'];

            window.localStorage.setItem('ACCESS_TOKEN_KEY', this.accessToken as string);
            window.localStorage.setItem('REFRESH_TOKEN_KEY', this.refreshToken as string);

            this.setAuthorized();
        })
        .add(this.tokenReady);
    }

    private setAuthorized() {
        this.authorized = true;
        this.headers = {'Authorization' : 'Bearer ' + this.getAccessToken};
    }

    private getTokenInfo(token: string) : Observable<any> {
        var payload = new FormData();
        payload.append('token', token);

        return this.http.post(environment.auth_introspect, payload, {
            headers: {
                'Authorization': environment.auth_base64
            }
        });
    }

    public get istokenReady() {
        return this.tokenReady;
    }

    public get isHasBeenAuthorized() {
        return this.hasAuthorized;
    }

    getTokens(code: string) {
        let payload = new FormData();
        payload.append('grant_type', 'authorization_code');
        payload.append('code', code);
        payload.append('redirect_uri', environment.auth_redirect);
        payload.append('client_id', environment.auth_client_id);

        this.http.post(environment.auth_token, payload, {
            headers: {
                'Authorization': environment.auth_base64
            }
        })
        .subscribe(next => {
            var data = next.valueOf() as any;
            this.accessToken = data['access_token'];
            this.refreshToken = data['refresh_token'];

            window.localStorage.setItem('ACCESS_TOKEN_KEY', this.accessToken as string);
            window.localStorage.setItem('REFRESH_TOKEN_KEY', this.refreshToken as string);
            this.setAuthorized();
        })
        .add(this.tokenReady);
    }

    

    public login() : any {
        var requestParams = new URLSearchParams({
            response_type: "code",
            client_id: environment.auth_client_id,
            redirect_uri: environment.auth_redirect,
            scope: environment.auth_scopes
        });
        window.location.href = environment.auth_login + "?" + requestParams;
    }

    public logout(): Observable<any> {
        window.localStorage.removeItem("ACCESS_TOKEN_KEY");
        window.localStorage.removeItem("REFRESH_TOKEN_KEY");
        return this.http.get(environment.auth_logout, { withCredentials: true });
    }

    public get getAccessToken() {
        return this.accessToken;
    }

    public get isAuthorized() {
        return this.authorized;
    }

    public get getHeaders() {
        return this.headers;
    }

}