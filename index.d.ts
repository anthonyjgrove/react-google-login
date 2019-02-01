// Type definitions for react-google-login v2.5.4
// Project: https://github.com/anthonyjgrove/react-google-login
// Definitions by: Ruslan Ibragimov <https://github.com/IRus>
import {Component, ReactNode, CSSProperties} from 'react';

export as namespace ReactGoogleLogin;

interface AuthResponse {
  readonly access_token: string;
  readonly id_token: string;
  readonly login_hint: string;
  readonly scope: string;
  readonly expires_in: number;
  readonly first_issued_at: number;
  readonly expires_at: number;
}

interface BasicProfile {
  getId(): string;
  getEmail(): string;
  getName(): string;
  getGivenName(): string;
  getFamilyName(): string;
  getImageUrl(): string;
}

// Based on https://developers.google.com/identity/sign-in/web/reference
export interface GoogleLoginResponse {
  getBasicProfile(): BasicProfile;
  getAuthResponse(): AuthResponse;
  getGrantedScopes(): string;
  getHostedDomain(): string;
  getId(): string;
  isSignedIn(): boolean;
  hasGrantedScopes(scopes: string): boolean;
  disconnect(): void;
  grantOfflineAccess(options: GrantOfflineAccessOptions): Promise<GoogleLoginResponseOffline>;
  signIn(options: SignInOptions): Promise<any>;
  grant(options: SignInOptions): Promise<any>;
}

interface GrantOfflineAccessOptions {
  readonly scope?: string;
  readonly redirect_uri?: string;
}

interface SignInOptions {
  readonly scope?: string;
  readonly app_package_name?: string;
  readonly fetch_basic_profile?: boolean;
  readonly prompt?: string;
}

export interface GoogleLoginResponseOffline {
  readonly code: string;
}

export interface GoogleLoginProps {
  readonly onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
  readonly onAuthReloadSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
  readonly onAuthReloadFailure?: (response: object) => void,
  readonly authReloadInterval?: number,
  readonly onFailure: (error: any) => void,
  readonly clientId: string,
  readonly jsSrc?: string,
  readonly onRequest?: () => void,
  readonly buttonText?: string,
  readonly scope?: string,
  readonly className?: string,
  readonly redirectUri?: string,
  readonly cookiePolicy?: string,
  readonly loginHint?: string,
  readonly hostedDomain?: string,
  readonly prompt?: string,
  readonly responseType?: string,
  readonly children?: ReactNode,
  readonly style?: CSSProperties,
  readonly tag?: string,
  readonly disabled?: boolean;
  readonly autoLoad?: boolean;
  readonly uxMode?: string;
  readonly disabledStyle?: CSSProperties;
  readonly fetchBasicProfile?: boolean;
  readonly isSignedIn?: boolean;
  readonly type?: string;
  readonly accessType?: string;
  readonly render?: (props?: { onClick: () => void }) => JSX.Element;
}

export class GoogleLogin extends Component<GoogleLoginProps, {}> {
  public signIn(e?: Event): void;
  public reloadAuthToken(): void;
}

export interface GoogleLogoutProps {
  readonly onLogoutSuccess?: () => void;
  readonly buttonText?: string;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly jsSrc?: string;
  readonly style?: CSSProperties;
  readonly disabled?: boolean;
  readonly disabledStyle?: CSSProperties;
  readonly tag?: string;
  readonly render?: (props?: { onClick: () => void }) => JSX.Element;
}

export class GoogleLogout extends Component<GoogleLogoutProps, {}> {
  public signOut(): void;
}

export default GoogleLogin;
