# Configuración de Supabase

## 1. Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) e inicia sesión.
2. Crea un nuevo proyecto.
3. Anota la **URL del proyecto** y la **anon key** (las encontrarás en Settings > API).

## 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (nunca lo subas a git):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
```

Puedes usar `.env.example` como referencia.

## 3. Verificar que .env.local esté en .gitignore

Asegúrate de que el archivo `.gitignore` incluya:

```
.env.local
```

## 4. Uso en el proyecto

### En Client Components (navegador)

```ts
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
```

### En Server Components o Route Handlers

```ts
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
```

## 5. Próximos pasos (cuando se necesiten)

- Crear tablas en el dashboard de Supabase (Table Editor).
- Configurar Row Level Security (RLS) según las reglas de negocio.
- Añadir middleware para refrescar sesiones si se implementa autenticación.
