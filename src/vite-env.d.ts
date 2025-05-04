
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_ISSUER_KEY?: string;
    readonly VITE_STUDENT_KEY?: string;
    readonly VITE_EMPLOYER_KEY?: string;
    readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
    readonly [key: string]: string | undefined;
  };
}
