# Dicotomías

Un dilema ao día. Vota o teu bando, aposta quen gañará e á medianoite os dous loitan segundo como foron chegando os votos.

## Estrutura

- `index.html`: a páxina.
- `css/estilos.css`: estilos.
- `js/config.js`: conexión con Supabase (proxecto `xogos`, táboas con prefixo `dil_`).
- `js/textos.js`: textos en galego, castelán, catalán, éuscaro e inglés.
- `js/dilemas.js`: os dilemas (un só reconto por dilema, sexa cal sexa a lingua).
- `js/estado.js`: votos e apostas do xogador.
- `js/personaxes.js`: debuxo vectorial dos personaxes.
- `js/loita.js`: motor da loita e escena.
- `js/app.js`: interface, calendario, galería e arranque.
- `sql/dil-supabase.sql`: táboas e funcións para Supabase.

## Instalación

1. Supabase: no proxecto `xogos`, abre **SQL Editor → New query**, pega `sql/dil-supabase.sql` e preme **Run**. O calendario empeza o día en que o executes.
2. GitHub: sube todos estes arquivos ao repositorio, mantendo os cartafoles `css`, `js` e `sql`.
3. Vercel: **Add New → Project**, importa o repositorio, deixa **Framework Preset: Other** e preme **Deploy**.

Se a páxina non consegue conectar con Supabase, funciona en modo demo cos votos simulados.

Feito by ancho.
