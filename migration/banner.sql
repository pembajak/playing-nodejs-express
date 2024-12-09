CREATE TABLE
  public.banner (
    id serial NOT NULL,
    banner_name character varying(100) NULL,
    banner_image character varying(100) NULL,
    description character varying(255) NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp(6) without time zone NULL,
    "deletedAt" timestamp(6) without time zone NULL
  );

ALTER TABLE
  public.banner
ADD
  CONSTRAINT banners_pkey PRIMARY KEY (id)