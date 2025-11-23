import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // 1. Next.js yanıt nesnesini hazırlarız
  const res = NextResponse.next();
  
  // 2. Çerezleri okuyacak Supabase istemcisini oluştururuz
  const supabase = createMiddlewareClient({ req, res });
  
  // 3. EN ÖNEMLİ ADIM: Bu çağrı, oturum çerezini yeniler. 
  // Artık Next.js, kimin oturum açtığını bilecek.
  await supabase.auth.getSession();

  return res;
}

// Opsiyonel: Hangi yolların middleware'den geçeceğini belirler
// (Varsayılan olarak tüm yolları kontrol eder)
export const config = {
  matcher: [
    /*
     * Tüm gelen istekleri kontrol et
     * Ama Next.js'in kendi statik dosyalarını, API yollarını vb. hariç tut
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};