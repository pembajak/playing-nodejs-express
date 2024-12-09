CREATE TABLE
  public.users (
    id serial NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(100) NULL,
    last_name character varying(100) NULL,
    password character varying(255) NOT NULL,
    profile_image character varying(255) NULL,
    balance double precision NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp(6) without time zone NULL,
    "deletedAt" timestamp(6) without time zone NULL
  );

ALTER TABLE
  public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id)