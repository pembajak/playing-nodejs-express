CREATE TABLE
  public.transactions (
    id serial NOT NULL,
    user_id integer NOT NULL,
    invoice_number character varying(50) NOT NULL,
    transaction_type character varying(50) NOT NULL,
\    reff_code character varying(100) NULL,
    description character varying(255) NULL,
    total_amount double precision NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NULL,
    "deletedAt" timestamp without time zone NULL
  );

ALTER TABLE
  public.transactions
ADD
  CONSTRAINT transactions_pkey PRIMARY KEY (id)