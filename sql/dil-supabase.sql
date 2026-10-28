-- Dicotomías · xogo de dilemas diarios
-- Proxecto Supabase: xogos · prefixo de táboas: dil_
-- Pégao enteiro no SQL Editor e preme Run. Pódese executar máis dunha vez sen romper nada.

-- 1) Táboas
create table if not exists dil_dias (
  dia    date primary key,
  dilema text not null unique
);

create table if not exists dil_votos (
  id     bigint generated always as identity primary key,
  dilema text not null references dil_dias(dilema),
  device uuid not null,
  lado   text not null check (lado in ('a','b')),
  aposta text not null check (aposta in ('a','b')),
  creado timestamptz not null default now(),
  unique (dilema, device)
);
create index if not exists dil_votos_dilema on dil_votos(dilema);

-- 2) Seguridade: ninguén le nin escribe as táboas directamente.
--    Todo pasa polas funcións de abaixo, así os resultados do día non se ven ata a medianoite.
alter table dil_dias  enable row level security;
alter table dil_votos enable row level security;
revoke all on dil_dias, dil_votos from anon, authenticated;

-- 3) Funcións
create or replace function dil_hoxe() returns date
language sql stable set search_path = public as $$
  select (now() at time zone 'Europe/Madrid')::date
$$;

-- votos por tramos de 2 horas (uso interno, non accesible desde a web)
create or replace function dil_tramos(p_dilema text, p_lado text) returns json
language sql stable security definer set search_path = public as $$
  select json_agg(n order by g) from (
    select g, (select count(*) from dil_votos v
               where v.dilema = p_dilema and v.lado = p_lado
                 and floor(extract(hour from (v.creado at time zone 'Europe/Madrid')) / 2)::int = g) as n
    from generate_series(0, 11) as g
  ) s
$$;
revoke execute on function dil_tramos(text, text) from public, anon, authenticated;

-- votos de hoxe (só o número total, sen dicir quen vai gañando)
create or replace function dil_total() returns bigint
language sql stable security definer set search_path = public as $$
  select count(*) from dil_votos v join dil_dias d on d.dilema = v.dilema where d.dia = dil_hoxe()
$$;

-- todo o que necesita a web ao abrir: data de hoxe, días xa publicados e resultados dos pechados
create or replace function dil_cargar() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'hoxe',  dil_hoxe(),
    'total', dil_total(),
    'dias',  coalesce((
      select json_agg(json_build_object(
               'dilema', d.dilema,
               'dia',    d.dia,
               'a', case when d.dia < dil_hoxe() then dil_tramos(d.dilema, 'a') end,
               'b', case when d.dia < dil_hoxe() then dil_tramos(d.dilema, 'b') end)
             order by d.dia)
      from dil_dias d
      where d.dia <= dil_hoxe()), '[]'::json)
  )
$$;

-- votar: só o dilema de hoxe, un voto por dispositivo
create or replace function dil_votar(p_dilema text, p_device uuid, p_lado text, p_aposta text) returns json
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from dil_dias where dilema = p_dilema and dia = dil_hoxe()) then
    raise exception 'dilema pechado';
  end if;
  insert into dil_votos (dilema, device, lado, aposta)
  values (p_dilema, p_device, p_lado, p_aposta)
  on conflict (dilema, device) do nothing;
  return json_build_object('ok', true, 'total', dil_total());
end
$$;

grant execute on function dil_cargar(), dil_total(), dil_votar(text, uuid, text, text) to anon, authenticated;

-- 4) Calendario: un dilema ao día comezando HOXE (o día en que executes isto)
insert into dil_dias (dia, dilema)
select dil_hoxe() + (n - 1)::int, d
from unnest(array[
  'tortilla','mascota','bichos','cafe','vacacions','madrugar','dor',
  'xeado','cama','chocolate','temperatura','aviao','pan','vater',
  'ensalada','ovo','puntual','oido','auga','almorzo','froita',
  'ducha','palomitas','cereais','zume','papel','persiana','calcetins'
]) with ordinality as t(d, n)
on conflict do nothing;
