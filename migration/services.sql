CREATE TABLE
  public.services (
    id serial NOT NULL,
    service_code character varying(255) NULL,
    service_icon character varying(255) NULL,
    service_name character varying(255) NULL,
    service_tariff double precision NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp(6) without time zone NULL,
    "deletedAt" timestamp(6) without time zone NULL
  );

ALTER TABLE
  public.services
ADD
  CONSTRAINT services_pkey PRIMARY KEY (id)