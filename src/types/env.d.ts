/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string            // backend Render
  readonly VITE_SUPABASE_URL: string      // Supabase
  readonly VITE_SUPABASE_ANON_KEY: string // Supabase
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
