import { createClient } from '@supabase/supabase-js';

export default async function handler(request, response) {
  // 1. Configuramos el cliente de Supabase
  // Vercel leerá estas variables desde tu configuración de proyecto
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL; 
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({ error: 'Faltan las variables de entorno' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 2. Hacemos una consulta simple para despertar a la base de datos
  // IMPORTANTE: Cambia 'tu_tabla' por una tabla real que tengas (ej: 'ofrendas', 'usuarios', etc)
  const { data, error } = await supabase
    .from('categories') // <--- PON EL NOMBRE DE UNA TABLA REAL AQUI
    .select('*')
    .limit(1);

  if (error) {
    return response.status(500).json({ error: error.message });
  }

  // 3. Respondemos con éxito
  return response.status(200).json({ 
    message: 'Supabase despertado correctamente', 
    date: new Date().toISOString() 
  });
}