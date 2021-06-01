/* eslint-disable max-classes-per-file */
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
  getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;
  reloadAuthResponse(): Promise<AuthResponse>;
  getGrantedScopes(): string;
  getHostedDomain(): string;
  getId(): string;
  isSignedIn(): boolean;
  hasGrantedScopes(scopes: string): boolean;
  disconnect(): void;
  grantOfflineAccess(options: GrantOfflineAccessOptions): Promise<GoogleLoginResponseOffline>;
  signIn(options: SignInOptions): Promise<any>;
  grant(options: SignInOptions): Promise<any>;
  // google-login.js sez: offer renamed response keys to names that match use
  googleId: string;
  tokenObj: AuthResponse;
  tokenId: string;
  accessToken: string;
  readonly code?: string;//does not exist but here to satisfy typescript compatibility
  profileObj: {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
  }
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
  readonly onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
  readonly onAutoLoadFinished?: (successLogin: boolean) => void,
  readonly onFailure?: (error: any) => void,
  readonly onScriptLoadFailure?: (error: any) => void,
  readonly onRequest?: () => void,
  readonly clientId: string,
  readonly jsSrc?: string,
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
  readonly icon?: boolean,
  readonly theme?: "light" | "dark",
  readonly tag?: string,
  readonly disabled?: boolean;
  readonly autoLoad?: boolean;
  readonly uxMode?: string;
  readonly disabledStyle?: CSSProperties;
  readonly fetchBasicProfile?: boolean;
  readonly isSignedIn?: boolean;
  readonly type?: string;
  readonly accessType?: string;
  readonly render?: (props: { onClick: () => void, disabled?: boolean }) => JSX.Element;
}

export class GoogleLogin extends Component<GoogleLoginProps, unknown> {
  public signIn(e?: Event): void;
}

export interface GoogleLogoutProps {
  readonly clientId: string,
  readonly onLogoutSuccess?: () => void;
  readonly onFailure?: () => void;
  readonly buttonText?: string;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly jsSrc?: string;
  readonly style?: CSSProperties;
  readonly icon?: boolean,
  readonly disabled?: boolean;
  readonly disabledStyle?: CSSProperties;
  readonly tag?: string;
  readonly render?: (props: { onClick: () => void, disabled?: boolean }) => JSX.Element;
}

export class GoogleLogout extends Component<GoogleLogoutProps, unknown> {
  public signOut(): void;
}

export interface UseGoogleLogoutResponse {
  signOut: () => void;
  loaded: boolean;
}

export interface UseGoogleLogoutProps {
  readonly clientId: string,
  readonly onLogoutSuccess?: () => void;
  readonly onFailure?: () => void;
  readonly accessType?: string;
  readonly fetchBasicProfile?: boolean;
  readonly cookiePolicy?: string;
  readonly loginHint?: string;
  readonly hostedDomain?: string;
  readonly redirectUri?: string,
  readonly discoveryDocs?: any;
  readonly scope?: string,
  readonly uxMode?: string;
  readonly jsSrc?: string;
}

export function useGoogleLogout(input: UseGoogleLogoutProps): UseGoogleLogoutResponse;

export interface UseGoogleLoginResponse {
  signIn: () => void;
  addScopes: (scopes: string) => void;
  loaded: boolean;
}

export interface UseGoogleLoginProps {
  readonly onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
  readonly onFailure?: (error: any) => void,
  readonly onAddScopesSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
  readonly onAddScopesFailure?: (error: any) => void,
  readonly onScriptLoadFailure?: (error: any) => void,
  readonly onAutoLoadFinished?: (successLogin: boolean) => void,
  readonly clientId: string,
  readonly jsSrc?: string,
  readonly onRequest?: () => void,
  readonly scope?: string,
  readonly redirectUri?: string,
  readonly cookiePolicy?: string,
  readonly loginHint?: string,
  readonly hostedDomain?: string,
  readonly prompt?: string,
  readonly responseType?: string,
  readonly autoLoad?: boolean;
  readonly uxMode?: string;
  readonly fetchBasicProfile?: boolean;
  readonly isSignedIn?: boolean;
  readonly discoveryDocs?: any;
  readonly accessType?: string;
}

export function useGoogleLogin(input: UseGoogleLoginProps): UseGoogleLoginResponse;

export default GoogleLogin;
