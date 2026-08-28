-- Reconstructed from /mnt/user-data/uploads/doitung_backup.dump
-- database: doitung_seed_test  server: PostgreSQL 16.14
-- dumped:   2026-08-26 10:55:57  by pg_dump 16.14

--
-- ENCODING: ENCODING
--
SET client_encoding = 'UTF8';

--
-- STDSTRINGS: STDSTRINGS
--
SET standard_conforming_strings = 'on';

--
-- SEARCHPATH: SEARCHPATH
--
SELECT pg_catalog.set_config('search_path', '', false);

--
-- DATABASE: doitung_seed_test
--
CREATE DATABASE doitung_seed_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';

--
-- TABLE: accounts  (schema public)
--
CREATE TABLE public.accounts (
    account_id bigint NOT NULL,
    name text,
    email text NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    phone_no character varying(20),
    active_status boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: accounts_account_id_seq  (schema public)
--
CREATE SEQUENCE public.accounts_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: accounts_account_id_seq  (schema public)
--
ALTER SEQUENCE public.accounts_account_id_seq OWNED BY public.accounts.account_id;

--
-- TABLE: cluster_forms  (schema public)
--
CREATE TABLE public.cluster_forms (
    cluster_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    condition character varying(20) NOT NULL,
    recorded_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: cluster_forms_cluster_form_id_seq  (schema public)
--
CREATE SEQUENCE public.cluster_forms_cluster_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: cluster_forms_cluster_form_id_seq  (schema public)
--
ALTER SEQUENCE public.cluster_forms_cluster_form_id_seq OWNED BY public.cluster_forms.cluster_form_id;

--
-- TABLE: clusters  (schema public)
--
CREATE TABLE public.clusters (
    cluster_id bigint NOT NULL,
    pole_id bigint NOT NULL,
    cluster_no bigint NOT NULL,
    cluster_form_done boolean DEFAULT false,
    flower_form_done boolean DEFAULT false,
    pod_form_done boolean DEFAULT false,
    pollination_form_done boolean DEFAULT false,
    pre_harvest_form_done boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: clusters_cluster_id_seq  (schema public)
--
CREATE SEQUENCE public.clusters_cluster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: clusters_cluster_id_seq  (schema public)
--
ALTER SEQUENCE public.clusters_cluster_id_seq OWNED BY public.clusters.cluster_id;

--
-- TABLE: customers  (schema public)
--
CREATE TABLE public.customers (
    customer_id bigint NOT NULL,
    customer_name character varying(100) NOT NULL,
    note text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: customers_customer_id_seq  (schema public)
--
CREATE SEQUENCE public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: customers_customer_id_seq  (schema public)
--
ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;

--
-- TABLE: flower_forms  (schema public)
--
CREATE TABLE public.flower_forms (
    flower_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    total_flowers bigint,
    condition character varying(20),
    done boolean DEFAULT false,
    recorded_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: flower_forms_flower_form_id_seq  (schema public)
--
CREATE SEQUENCE public.flower_forms_flower_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: flower_forms_flower_form_id_seq  (schema public)
--
ALTER SEQUENCE public.flower_forms_flower_form_id_seq OWNED BY public.flower_forms.flower_form_id;

--
-- TABLE: harvest_grading_forms  (schema public)
--
CREATE TABLE public.harvest_grading_forms (
    harvest_grading_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    pole_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    grade_a_plus_count bigint,
    grade_a_plus_weight numeric,
    grade_a_count bigint,
    grade_a_weight numeric,
    grade_b_count bigint,
    grade_b_weight numeric,
    grade_c_count bigint,
    grade_c_weight numeric,
    grade_d_plus_count bigint,
    grade_d_plus_weight numeric,
    undersized_count bigint,
    undersized_weight numeric,
    rotten_count bigint,
    rotten_weight numeric,
    recorded_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: harvest_grading_forms_harvest_grading_form_id_seq  (schema public)
--
CREATE SEQUENCE public.harvest_grading_forms_harvest_grading_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: harvest_grading_forms_harvest_grading_form_id_seq  (schema public)
--
ALTER SEQUENCE public.harvest_grading_forms_harvest_grading_form_id_seq OWNED BY public.harvest_grading_forms.harvest_grading_form_id;

--
-- TABLE: pod_forms  (schema public)
--
CREATE TABLE public.pod_forms (
    pod_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    number_pods bigint,
    lost_pods bigint,
    remaining_pods bigint,
    condition character varying(20),
    recorded_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: pod_forms_pod_form_id_seq  (schema public)
--
CREATE SEQUENCE public.pod_forms_pod_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: pod_forms_pod_form_id_seq  (schema public)
--
ALTER SEQUENCE public.pod_forms_pod_form_id_seq OWNED BY public.pod_forms.pod_form_id;

--
-- TABLE: poles  (schema public)
--
CREATE TABLE public.poles (
    pole_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    pole_no bigint NOT NULL,
    harvest_grading_form_done boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: poles_pole_id_seq  (schema public)
--
CREATE SEQUENCE public.poles_pole_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: poles_pole_id_seq  (schema public)
--
ALTER SEQUENCE public.poles_pole_id_seq OWNED BY public.poles.pole_id;

--
-- TABLE: pollination_forms  (schema public)
--
CREATE TABLE public.pollination_forms (
    pollination_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    number_pods bigint,
    unsuccessful_pollination bigint,
    good_flowers bigint,
    bad_flowers bigint,
    condition character varying(20),
    recorded_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: pollination_forms_pollination_form_id_seq  (schema public)
--
CREATE SEQUENCE public.pollination_forms_pollination_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: pollination_forms_pollination_form_id_seq  (schema public)
--
ALTER SEQUENCE public.pollination_forms_pollination_form_id_seq OWNED BY public.pollination_forms.pollination_form_id;

--
-- TABLE: pre_harvest_forms  (schema public)
--
CREATE TABLE public.pre_harvest_forms (
    pre_harvest_form_id bigint NOT NULL,
    year_id bigint NOT NULL,
    cluster_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    number_pods_second_round bigint,
    lost_pods_before_harvest bigint,
    removed_pods bigint,
    plants_removed bigint,
    condition character varying(20),
    recorded_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: pre_harvest_forms_pre_harvest_form_id_seq  (schema public)
--
CREATE SEQUENCE public.pre_harvest_forms_pre_harvest_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: pre_harvest_forms_pre_harvest_form_id_seq  (schema public)
--
ALTER SEQUENCE public.pre_harvest_forms_pre_harvest_form_id_seq OWNED BY public.pre_harvest_forms.pre_harvest_form_id;

--
-- TABLE: stock_balances  (schema public)
--
CREATE TABLE public.stock_balances (
    stock_balance_id bigint NOT NULL,
    year_id bigint NOT NULL,
    warehouse_id bigint NOT NULL,
    grade character varying(20) NOT NULL,
    total_grams numeric DEFAULT 0 NOT NULL,
    total_pods bigint DEFAULT 0 NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: stock_balances_stock_balance_id_seq  (schema public)
--
CREATE SEQUENCE public.stock_balances_stock_balance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: stock_balances_stock_balance_id_seq  (schema public)
--
ALTER SEQUENCE public.stock_balances_stock_balance_id_seq OWNED BY public.stock_balances.stock_balance_id;

--
-- TABLE: stock_movements  (schema public)
--
CREATE TABLE public.stock_movements (
    stock_movement_id bigint NOT NULL,
    year_id bigint NOT NULL,
    recorded_by_id bigint NOT NULL,
    production_year_id bigint,
    grade character varying(20),
    movement_type character varying(20) NOT NULL,
    price_per_gram bigint,
    total_grams numeric,
    total_pods bigint,
    details text,
    from_warehouse_id bigint,
    to_warehouse_id bigint,
    issued_to_customer_id bigint,
    recorded_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: stock_movements_stock_movement_id_seq  (schema public)
--
CREATE SEQUENCE public.stock_movements_stock_movement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: stock_movements_stock_movement_id_seq  (schema public)
--
ALTER SEQUENCE public.stock_movements_stock_movement_id_seq OWNED BY public.stock_movements.stock_movement_id;

--
-- TABLE: warehouses  (schema public)
--
CREATE TABLE public.warehouses (
    warehouse_id bigint NOT NULL,
    warehouse_name text NOT NULL,
    active_status boolean DEFAULT true,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: warehouses_warehouse_id_seq  (schema public)
--
CREATE SEQUENCE public.warehouses_warehouse_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: warehouses_warehouse_id_seq  (schema public)
--
ALTER SEQUENCE public.warehouses_warehouse_id_seq OWNED BY public.warehouses.warehouse_id;

--
-- TABLE: year_form_settings  (schema public)
--
CREATE TABLE public.year_form_settings (
    year_id bigint NOT NULL,
    cluster_active boolean,
    flower_active boolean,
    pollination_active boolean,
    pod_active boolean,
    pre_harvest_active boolean,
    harvest_grading_active boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: year_form_settings_year_id_seq  (schema public)
--
CREATE SEQUENCE public.year_form_settings_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: year_form_settings_year_id_seq  (schema public)
--
ALTER SEQUENCE public.year_form_settings_year_id_seq OWNED BY public.year_form_settings.year_id;

--
-- TABLE: years  (schema public)
--
CREATE TABLE public.years (
    year_id bigint NOT NULL,
    year bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: years_year_id_seq  (schema public)
--
CREATE SEQUENCE public.years_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: years_year_id_seq  (schema public)
--
ALTER SEQUENCE public.years_year_id_seq OWNED BY public.years.year_id;

--
-- TABLE: zones  (schema public)
--
CREATE TABLE public.zones (
    zone_id bigint NOT NULL,
    year_id bigint NOT NULL,
    zone_no bigint NOT NULL,
    zone_name text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

--
-- SEQUENCE: zones_zone_id_seq  (schema public)
--
CREATE SEQUENCE public.zones_zone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- SEQUENCE OWNED BY: zones_zone_id_seq  (schema public)
--
ALTER SEQUENCE public.zones_zone_id_seq OWNED BY public.zones.zone_id;

--
-- DEFAULT: accounts account_id  (schema public)
--
ALTER TABLE ONLY public.accounts ALTER COLUMN account_id SET DEFAULT nextval('public.accounts_account_id_seq'::regclass);

--
-- DEFAULT: cluster_forms cluster_form_id  (schema public)
--
ALTER TABLE ONLY public.cluster_forms ALTER COLUMN cluster_form_id SET DEFAULT nextval('public.cluster_forms_cluster_form_id_seq'::regclass);

--
-- DEFAULT: clusters cluster_id  (schema public)
--
ALTER TABLE ONLY public.clusters ALTER COLUMN cluster_id SET DEFAULT nextval('public.clusters_cluster_id_seq'::regclass);

--
-- DEFAULT: customers customer_id  (schema public)
--
ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);

--
-- DEFAULT: flower_forms flower_form_id  (schema public)
--
ALTER TABLE ONLY public.flower_forms ALTER COLUMN flower_form_id SET DEFAULT nextval('public.flower_forms_flower_form_id_seq'::regclass);

--
-- DEFAULT: harvest_grading_forms harvest_grading_form_id  (schema public)
--
ALTER TABLE ONLY public.harvest_grading_forms ALTER COLUMN harvest_grading_form_id SET DEFAULT nextval('public.harvest_grading_forms_harvest_grading_form_id_seq'::regclass);

--
-- DEFAULT: pod_forms pod_form_id  (schema public)
--
ALTER TABLE ONLY public.pod_forms ALTER COLUMN pod_form_id SET DEFAULT nextval('public.pod_forms_pod_form_id_seq'::regclass);

--
-- DEFAULT: poles pole_id  (schema public)
--
ALTER TABLE ONLY public.poles ALTER COLUMN pole_id SET DEFAULT nextval('public.poles_pole_id_seq'::regclass);

--
-- DEFAULT: pollination_forms pollination_form_id  (schema public)
--
ALTER TABLE ONLY public.pollination_forms ALTER COLUMN pollination_form_id SET DEFAULT nextval('public.pollination_forms_pollination_form_id_seq'::regclass);

--
-- DEFAULT: pre_harvest_forms pre_harvest_form_id  (schema public)
--
ALTER TABLE ONLY public.pre_harvest_forms ALTER COLUMN pre_harvest_form_id SET DEFAULT nextval('public.pre_harvest_forms_pre_harvest_form_id_seq'::regclass);

--
-- DEFAULT: stock_balances stock_balance_id  (schema public)
--
ALTER TABLE ONLY public.stock_balances ALTER COLUMN stock_balance_id SET DEFAULT nextval('public.stock_balances_stock_balance_id_seq'::regclass);

--
-- DEFAULT: stock_movements stock_movement_id  (schema public)
--
ALTER TABLE ONLY public.stock_movements ALTER COLUMN stock_movement_id SET DEFAULT nextval('public.stock_movements_stock_movement_id_seq'::regclass);

--
-- DEFAULT: warehouses warehouse_id  (schema public)
--
ALTER TABLE ONLY public.warehouses ALTER COLUMN warehouse_id SET DEFAULT nextval('public.warehouses_warehouse_id_seq'::regclass);

--
-- DEFAULT: year_form_settings year_id  (schema public)
--
ALTER TABLE ONLY public.year_form_settings ALTER COLUMN year_id SET DEFAULT nextval('public.year_form_settings_year_id_seq'::regclass);

--
-- DEFAULT: years year_id  (schema public)
--
ALTER TABLE ONLY public.years ALTER COLUMN year_id SET DEFAULT nextval('public.years_year_id_seq'::regclass);

--
-- DEFAULT: zones zone_id  (schema public)
--
ALTER TABLE ONLY public.zones ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_zone_id_seq'::regclass);

--
-- Data for public.accounts (3 rows)
--
COPY public.accounts (account_id, name, email, password_hash, role, phone_no, active_status, created_at, updated_at) FROM stdin;
1	Admin	admin@doitung.com	$2a$10$iwN48.xltsP8BrGHj97Ut.ZmGlgZ8sF5Ksrl3yEKOKtQ4ZlvsTrGe	ADMIN		t	2026-08-26 10:53:51.359488+07	2026-08-26 10:53:51.359488+07
2	Kit	kit@gmail.com	$2a$10$R/.CaaVTyIkgdV5QXgaTAuwSX6hfOikUcIafhODfwtg/w01JeZX9e	STAFF		t	2026-08-26 10:53:51.434492+07	2026-08-26 10:53:51.434492+07
3	Nok	nok@gmail.com	$2a$10$YmhCwt0eCYLhWzNVCb/SF.aR8FIVbsdMSzbSDFciZwWq35doWquWC	STAFF		t	2026-08-26 10:53:51.507835+07	2026-08-26 10:53:51.507835+07
\.

--
-- Data for public.cluster_forms (12 rows)
--
COPY public.cluster_forms (cluster_form_id, year_id, cluster_id, recorded_by_id, condition, recorded_date, created_at, updated_at) FROM stdin;
1	1	1	2	GOOD	2026-08-25 10:53:51.518855+07	2026-08-26 10:53:51.525779+07	2026-08-26 10:53:51.525779+07
2	1	2	3	GOOD	2026-08-25 10:53:51.518855+07	2026-08-26 10:53:51.533067+07	2026-08-26 10:53:51.533067+07
3	1	3	2	ROTTEN	2026-08-24 10:53:51.518855+07	2026-08-26 10:53:51.538745+07	2026-08-26 10:53:51.538745+07
4	1	4	3	GOOD	2026-08-24 10:53:51.518855+07	2026-08-26 10:53:51.546869+07	2026-08-26 10:53:51.546869+07
5	1	5	2	GOOD	2026-08-23 10:53:51.518855+07	2026-08-26 10:53:51.554864+07	2026-08-26 10:53:51.554864+07
6	1	6	3	GOOD	2026-08-23 10:53:51.518855+07	2026-08-26 10:53:51.568605+07	2026-08-26 10:53:51.568605+07
7	1	7	3	GOOD	2026-08-22 10:53:51.518855+07	2026-08-26 10:53:51.586282+07	2026-08-26 10:53:51.586282+07
8	1	8	2	GOOD	2026-08-22 10:53:51.518855+07	2026-08-26 10:53:51.589173+07	2026-08-26 10:53:51.589173+07
9	1	9	3	GOOD	2026-08-21 10:53:51.518855+07	2026-08-26 10:53:51.592989+07	2026-08-26 10:53:51.592989+07
10	1	10	2	ROTTEN	2026-08-21 10:53:51.518855+07	2026-08-26 10:53:51.598161+07	2026-08-26 10:53:51.598161+07
11	1	11	3	GOOD	2026-08-20 10:53:51.518855+07	2026-08-26 10:53:51.60439+07	2026-08-26 10:53:51.60439+07
12	1	12	2	ROTTEN	2026-08-20 10:53:51.518855+07	2026-08-26 10:53:51.611295+07	2026-08-26 10:53:51.611295+07
\.

--
-- Data for public.clusters (12 rows)
--
COPY public.clusters (cluster_id, pole_id, cluster_no, cluster_form_done, flower_form_done, pod_form_done, pollination_form_done, pre_harvest_form_done, created_at, updated_at) FROM stdin;
1	1	1	t	t	f	f	f	2026-08-26 10:53:51.524042+07	2026-08-26 10:53:51.530891+07
2	1	2	t	t	f	f	f	2026-08-26 10:53:51.532096+07	2026-08-26 10:53:51.535944+07
3	2	1	t	t	f	t	f	2026-08-26 10:53:51.537788+07	2026-08-26 10:53:51.544708+07
4	2	2	t	t	f	t	f	2026-08-26 10:53:51.54596+07	2026-08-26 10:53:51.551854+07
5	3	1	t	t	t	t	t	2026-08-26 10:53:51.553868+07	2026-08-26 10:53:51.566094+07
6	3	2	t	t	t	t	t	2026-08-26 10:53:51.567472+07	2026-08-26 10:53:51.57852+07
7	4	1	t	f	f	f	f	2026-08-26 10:53:51.585267+07	2026-08-26 10:53:51.587262+07
8	4	2	t	f	f	f	f	2026-08-26 10:53:51.588213+07	2026-08-26 10:53:51.590109+07
9	5	1	t	t	f	f	f	2026-08-26 10:53:51.59206+07	2026-08-26 10:53:51.596128+07
10	5	2	t	t	f	f	f	2026-08-26 10:53:51.597072+07	2026-08-26 10:53:51.601613+07
11	6	1	t	t	f	t	f	2026-08-26 10:53:51.603491+07	2026-08-26 10:53:51.60934+07
12	6	2	t	t	f	t	f	2026-08-26 10:53:51.610264+07	2026-08-26 10:53:51.616754+07
\.

--
-- Data for public.customers (3 rows)
--
COPY public.customers (customer_id, customer_name, note, created_at, updated_at) FROM stdin;
1	Lotus Trading Co.	\N	2026-08-26 10:53:51.622104+07	2026-08-26 10:53:51.622104+07
2	Golden Leaf Exports	\N	2026-08-26 10:53:51.623708+07	2026-08-26 10:53:51.623708+07
3	Vanilla Direct Ltd.	\N	2026-08-26 10:53:51.625102+07	2026-08-26 10:53:51.625102+07
\.

--
-- Data for public.flower_forms (10 rows)
--
COPY public.flower_forms (flower_form_id, year_id, cluster_id, recorded_by_id, total_flowers, condition, done, recorded_date, created_at, updated_at) FROM stdin;
1	1	1	2	15	GOOD	t	2026-08-28 10:53:51.518855+07	2026-08-26 10:53:51.528721+07	2026-08-26 10:53:51.528721+07
2	1	2	3	18	INSECT	t	2026-08-28 10:53:51.518855+07	2026-08-26 10:53:51.534972+07	2026-08-26 10:53:51.534972+07
3	1	3	2	15	GOOD	t	2026-08-27 10:53:51.518855+07	2026-08-26 10:53:51.540719+07	2026-08-26 10:53:51.540719+07
4	1	4	3	18	INSECT	t	2026-08-27 10:53:51.518855+07	2026-08-26 10:53:51.548945+07	2026-08-26 10:53:51.548945+07
5	1	5	2	15	GOOD	t	2026-08-26 10:53:51.518855+07	2026-08-26 10:53:51.556825+07	2026-08-26 10:53:51.556825+07
6	1	6	3	18	GOOD	t	2026-08-26 10:53:51.518855+07	2026-08-26 10:53:51.570642+07	2026-08-26 10:53:51.570642+07
7	1	9	3	15	INSECT	t	2026-08-24 10:53:51.518855+07	2026-08-26 10:53:51.594974+07	2026-08-26 10:53:51.594974+07
8	1	10	2	18	GOOD	t	2026-08-24 10:53:51.518855+07	2026-08-26 10:53:51.600367+07	2026-08-26 10:53:51.600367+07
9	1	11	3	15	GOOD	t	2026-08-23 10:53:51.518855+07	2026-08-26 10:53:51.606225+07	2026-08-26 10:53:51.606225+07
10	1	12	2	18	GOOD	t	2026-08-23 10:53:51.518855+07	2026-08-26 10:53:51.613644+07	2026-08-26 10:53:51.613644+07
\.

--
-- Data for public.harvest_grading_forms (1 rows)
--
COPY public.harvest_grading_forms (harvest_grading_form_id, year_id, pole_id, recorded_by_id, grade_a_plus_count, grade_a_plus_weight, grade_a_count, grade_a_weight, grade_b_count, grade_b_weight, grade_c_count, grade_c_weight, grade_d_plus_count, grade_d_plus_weight, undersized_count, undersized_weight, rotten_count, rotten_weight, recorded_date, created_at, updated_at) FROM stdin;
1	1	3	2	10	55.5	8	38.2	6	24	3	9.6	2	5.1	1	1.8	1	1.2	2026-11-26 10:53:51.518855+07	2026-08-26 10:53:51.579548+07	2026-08-26 10:53:51.579548+07
\.

--
-- Data for public.pod_forms (2 rows)
--
COPY public.pod_forms (pod_form_id, year_id, cluster_id, recorded_by_id, number_pods, lost_pods, remaining_pods, condition, recorded_date, created_at, updated_at) FROM stdin;
1	1	5	2	12	2	10	INSECT	2026-09-23 10:53:51.518855+07	2026-08-26 10:53:51.560683+07	2026-08-26 10:53:51.560683+07
2	1	6	3	14	3	11	INSECT	2026-09-23 10:53:51.518855+07	2026-08-26 10:53:51.574955+07	2026-08-26 10:53:51.574955+07
\.

--
-- Data for public.poles (6 rows)
--
COPY public.poles (pole_id, zone_id, pole_no, harvest_grading_form_done, created_at, updated_at) FROM stdin;
1	1	1	f	2026-08-26 10:53:51.52184+07	2026-08-26 10:53:51.52184+07
2	1	2	f	2026-08-26 10:53:51.536868+07	2026-08-26 10:53:51.536868+07
3	1	3	t	2026-08-26 10:53:51.552746+07	2026-08-26 10:53:51.581838+07
4	2	1	f	2026-08-26 10:53:51.584234+07	2026-08-26 10:53:51.584234+07
5	2	2	f	2026-08-26 10:53:51.591052+07	2026-08-26 10:53:51.591052+07
6	2	3	f	2026-08-26 10:53:51.60253+07	2026-08-26 10:53:51.60253+07
\.

--
-- Data for public.pollination_forms (6 rows)
--
COPY public.pollination_forms (pollination_form_id, year_id, cluster_id, recorded_by_id, number_pods, unsuccessful_pollination, good_flowers, bad_flowers, condition, recorded_date, created_at, updated_at) FROM stdin;
1	1	3	2	12	3	12	3	GOOD	2026-09-03 10:53:51.518855+07	2026-08-26 10:53:51.542938+07	2026-08-26 10:53:51.542938+07
2	1	4	3	14	4	14	4	ROTTEN	2026-09-03 10:53:51.518855+07	2026-08-26 10:53:51.550881+07	2026-08-26 10:53:51.550881+07
3	1	5	2	12	3	12	3	GOOD	2026-09-02 10:53:51.518855+07	2026-08-26 10:53:51.558698+07	2026-08-26 10:53:51.558698+07
4	1	6	3	14	4	14	4	GOOD	2026-09-02 10:53:51.518855+07	2026-08-26 10:53:51.57264+07	2026-08-26 10:53:51.57264+07
5	1	11	3	12	3	12	3	INSECT	2026-08-30 10:53:51.518855+07	2026-08-26 10:53:51.608235+07	2026-08-26 10:53:51.608235+07
6	1	12	2	14	4	14	4	GOOD	2026-08-30 10:53:51.518855+07	2026-08-26 10:53:51.61568+07	2026-08-26 10:53:51.61568+07
\.

--
-- Data for public.pre_harvest_forms (2 rows)
--
COPY public.pre_harvest_forms (pre_harvest_form_id, year_id, cluster_id, recorded_by_id, number_pods_second_round, lost_pods_before_harvest, removed_pods, plants_removed, condition, recorded_date, created_at, updated_at) FROM stdin;
1	1	5	2	10	1	1	1	ROTTEN	2026-10-23 10:53:51.518855+07	2026-08-26 10:53:51.563847+07	2026-08-26 10:53:51.563847+07
2	1	6	3	11	1	1	1	ROTTEN	2026-10-23 10:53:51.518855+07	2026-08-26 10:53:51.577337+07	2026-08-26 10:53:51.577337+07
\.

--
-- Data for public.stock_balances (2 rows)
--
COPY public.stock_balances (stock_balance_id, year_id, warehouse_id, grade, total_grams, total_pods, created_at, updated_at) FROM stdin;
1	1	1	A_PLUS	380	70	2026-08-26 10:53:51.631798+07	2026-08-26 10:53:51.631798+07
2	1	2	A	200	35	2026-08-26 10:53:51.633716+07	2026-08-26 10:53:51.633716+07
\.

--
-- Data for public.stock_movements (3 rows)
--
COPY public.stock_movements (stock_movement_id, year_id, recorded_by_id, production_year_id, grade, movement_type, price_per_gram, total_grams, total_pods, details, from_warehouse_id, to_warehouse_id, issued_to_customer_id, recorded_date, created_at, updated_at) FROM stdin;
1	1	1	1	A_PLUS	INCOMING	\N	500	90	\N	\N	1	\N	2026-12-01 10:53:51.518855+07	2026-08-26 10:53:51.626008+07	2026-08-26 10:53:51.626008+07
2	1	1	1	A_PLUS	ISSUED	15	120	20	\N	1	\N	1	2026-12-06 10:53:51.518855+07	2026-08-26 10:53:51.6282+07	2026-08-26 10:53:51.6282+07
3	1	1	\N	A	CARRY_OVER	\N	200	35	\N	\N	2	\N	2026-11-27 10:53:51.518855+07	2026-08-26 10:53:51.629597+07	2026-08-26 10:53:51.629597+07
\.

--
-- Data for public.warehouses (2 rows)
--
COPY public.warehouses (warehouse_id, warehouse_name, active_status, created_at, updated_at) FROM stdin;
1	Main Warehouse	t	2026-08-26 10:53:51.618686+07	2026-08-26 10:53:51.618686+07
2	Cold Storage	t	2026-08-26 10:53:51.62044+07	2026-08-26 10:53:51.62044+07
\.

--
-- Data for public.year_form_settings (1 rows)
--
COPY public.year_form_settings (year_id, cluster_active, flower_active, pollination_active, pod_active, pre_harvest_active, harvest_grading_active, created_at, updated_at) FROM stdin;
1	t	t	t	t	t	t	2026-08-26 10:53:51.516687+07	2026-08-26 10:53:51.516687+07
\.

--
-- Data for public.years (1 rows)
--
COPY public.years (year_id, year, created_at, updated_at) FROM stdin;
1	2026	2026-08-26 10:53:51.512227+07	2026-08-26 10:53:51.512227+07
\.

--
-- Data for public.zones (2 rows)
--
COPY public.zones (zone_id, year_id, zone_no, zone_name, created_at, updated_at) FROM stdin;
1	1	1	Zone Alpha	2026-08-26 10:53:51.519165+07	2026-08-26 10:53:51.519165+07
2	1	2	Zone Beta	2026-08-26 10:53:51.58321+07	2026-08-26 10:53:51.58321+07
\.

--
-- SEQUENCE SET: accounts_account_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.accounts_account_id_seq', 3, true);

--
-- SEQUENCE SET: cluster_forms_cluster_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.cluster_forms_cluster_form_id_seq', 12, true);

--
-- SEQUENCE SET: clusters_cluster_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.clusters_cluster_id_seq', 12, true);

--
-- SEQUENCE SET: customers_customer_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.customers_customer_id_seq', 3, true);

--
-- SEQUENCE SET: flower_forms_flower_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.flower_forms_flower_form_id_seq', 10, true);

--
-- SEQUENCE SET: harvest_grading_forms_harvest_grading_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.harvest_grading_forms_harvest_grading_form_id_seq', 1, true);

--
-- SEQUENCE SET: pod_forms_pod_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.pod_forms_pod_form_id_seq', 2, true);

--
-- SEQUENCE SET: poles_pole_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.poles_pole_id_seq', 6, true);

--
-- SEQUENCE SET: pollination_forms_pollination_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.pollination_forms_pollination_form_id_seq', 6, true);

--
-- SEQUENCE SET: pre_harvest_forms_pre_harvest_form_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.pre_harvest_forms_pre_harvest_form_id_seq', 2, true);

--
-- SEQUENCE SET: stock_balances_stock_balance_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.stock_balances_stock_balance_id_seq', 2, true);

--
-- SEQUENCE SET: stock_movements_stock_movement_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.stock_movements_stock_movement_id_seq', 3, true);

--
-- SEQUENCE SET: warehouses_warehouse_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.warehouses_warehouse_id_seq', 2, true);

--
-- SEQUENCE SET: year_form_settings_year_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.year_form_settings_year_id_seq', 1, false);

--
-- SEQUENCE SET: years_year_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.years_year_id_seq', 1, true);

--
-- SEQUENCE SET: zones_zone_id_seq  (schema public)
--
SELECT pg_catalog.setval('public.zones_zone_id_seq', 2, true);

--
-- CONSTRAINT: accounts accounts_pkey  (schema public)
--
ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);

--
-- CONSTRAINT: cluster_forms cluster_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT cluster_forms_pkey PRIMARY KEY (cluster_form_id);

--
-- CONSTRAINT: clusters clusters_pkey  (schema public)
--
ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_pkey PRIMARY KEY (cluster_id);

--
-- CONSTRAINT: customers customers_pkey  (schema public)
--
ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);

--
-- CONSTRAINT: flower_forms flower_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT flower_forms_pkey PRIMARY KEY (flower_form_id);

--
-- CONSTRAINT: harvest_grading_forms harvest_grading_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT harvest_grading_forms_pkey PRIMARY KEY (harvest_grading_form_id);

--
-- CONSTRAINT: pod_forms pod_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT pod_forms_pkey PRIMARY KEY (pod_form_id);

--
-- CONSTRAINT: poles poles_pkey  (schema public)
--
ALTER TABLE ONLY public.poles
    ADD CONSTRAINT poles_pkey PRIMARY KEY (pole_id);

--
-- CONSTRAINT: pollination_forms pollination_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT pollination_forms_pkey PRIMARY KEY (pollination_form_id);

--
-- CONSTRAINT: pre_harvest_forms pre_harvest_forms_pkey  (schema public)
--
ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT pre_harvest_forms_pkey PRIMARY KEY (pre_harvest_form_id);

--
-- CONSTRAINT: stock_balances stock_balances_pkey  (schema public)
--
ALTER TABLE ONLY public.stock_balances
    ADD CONSTRAINT stock_balances_pkey PRIMARY KEY (stock_balance_id);

--
-- CONSTRAINT: stock_movements stock_movements_pkey  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (stock_movement_id);

--
-- CONSTRAINT: warehouses warehouses_pkey  (schema public)
--
ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (warehouse_id);

--
-- CONSTRAINT: year_form_settings year_form_settings_pkey  (schema public)
--
ALTER TABLE ONLY public.year_form_settings
    ADD CONSTRAINT year_form_settings_pkey PRIMARY KEY (year_id);

--
-- CONSTRAINT: years years_pkey  (schema public)
--
ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pkey PRIMARY KEY (year_id);

--
-- CONSTRAINT: zones zones_pkey  (schema public)
--
ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (zone_id);

--
-- INDEX: idx_accounts_email  (schema public)
--
CREATE UNIQUE INDEX idx_accounts_email ON public.accounts USING btree (email);

--
-- INDEX: idx_cluster_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_cluster_forms_recorded_by_id ON public.cluster_forms USING btree (recorded_by_id);

--
-- INDEX: idx_clusters_pole_id  (schema public)
--
CREATE INDEX idx_clusters_pole_id ON public.clusters USING btree (pole_id);

--
-- INDEX: idx_flower_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_flower_forms_recorded_by_id ON public.flower_forms USING btree (recorded_by_id);

--
-- INDEX: idx_harvest_grading_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_harvest_grading_forms_recorded_by_id ON public.harvest_grading_forms USING btree (recorded_by_id);

--
-- INDEX: idx_pod_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_pod_forms_recorded_by_id ON public.pod_forms USING btree (recorded_by_id);

--
-- INDEX: idx_poles_zone_id  (schema public)
--
CREATE INDEX idx_poles_zone_id ON public.poles USING btree (zone_id);

--
-- INDEX: idx_pollination_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_pollination_forms_recorded_by_id ON public.pollination_forms USING btree (recorded_by_id);

--
-- INDEX: idx_pre_harvest_forms_recorded_by_id  (schema public)
--
CREATE INDEX idx_pre_harvest_forms_recorded_by_id ON public.pre_harvest_forms USING btree (recorded_by_id);

--
-- INDEX: idx_stock_balances_grade  (schema public)
--
CREATE INDEX idx_stock_balances_grade ON public.stock_balances USING btree (grade);

--
-- INDEX: idx_stock_balances_warehouse_id  (schema public)
--
CREATE INDEX idx_stock_balances_warehouse_id ON public.stock_balances USING btree (warehouse_id);

--
-- INDEX: idx_stock_balances_year_id  (schema public)
--
CREATE INDEX idx_stock_balances_year_id ON public.stock_balances USING btree (year_id);

--
-- INDEX: idx_stock_movements_production_year_id  (schema public)
--
CREATE INDEX idx_stock_movements_production_year_id ON public.stock_movements USING btree (production_year_id);

--
-- INDEX: idx_stock_movements_recorded_by_id  (schema public)
--
CREATE INDEX idx_stock_movements_recorded_by_id ON public.stock_movements USING btree (recorded_by_id);

--
-- INDEX: idx_stock_movements_year_id  (schema public)
--
CREATE INDEX idx_stock_movements_year_id ON public.stock_movements USING btree (year_id);

--
-- INDEX: idx_years_year  (schema public)
--
CREATE UNIQUE INDEX idx_years_year ON public.years USING btree (year);

--
-- INDEX: idx_zones_year_id  (schema public)
--
CREATE INDEX idx_zones_year_id ON public.zones USING btree (year_id);

--
-- INDEX: ux_pole_cluster_no  (schema public)
--
CREATE UNIQUE INDEX ux_pole_cluster_no ON public.clusters USING btree (pole_id, cluster_no);

--
-- INDEX: ux_stock_balance  (schema public)
--
CREATE UNIQUE INDEX ux_stock_balance ON public.stock_balances USING btree (year_id, warehouse_id, grade);

--
-- INDEX: ux_year_cluster_flower  (schema public)
--
CREATE UNIQUE INDEX ux_year_cluster_flower ON public.flower_forms USING btree (year_id, cluster_id);

--
-- INDEX: ux_year_cluster_form  (schema public)
--
CREATE UNIQUE INDEX ux_year_cluster_form ON public.cluster_forms USING btree (year_id, cluster_id);

--
-- INDEX: ux_year_cluster_pod  (schema public)
--
CREATE UNIQUE INDEX ux_year_cluster_pod ON public.pod_forms USING btree (year_id, cluster_id);

--
-- INDEX: ux_year_cluster_pollination  (schema public)
--
CREATE UNIQUE INDEX ux_year_cluster_pollination ON public.pollination_forms USING btree (year_id, cluster_id);

--
-- INDEX: ux_year_cluster_preharvest  (schema public)
--
CREATE UNIQUE INDEX ux_year_cluster_preharvest ON public.pre_harvest_forms USING btree (year_id, cluster_id);

--
-- INDEX: ux_year_pole_harvest  (schema public)
--
CREATE UNIQUE INDEX ux_year_pole_harvest ON public.harvest_grading_forms USING btree (year_id, pole_id);

--
-- INDEX: ux_year_warehouse_name  (schema public)
--
CREATE UNIQUE INDEX ux_year_warehouse_name ON public.warehouses USING btree (warehouse_name);

--
-- INDEX: ux_year_zone_name  (schema public)
--
CREATE UNIQUE INDEX ux_year_zone_name ON public.zones USING btree (year_id, zone_name);

--
-- INDEX: ux_year_zone_no  (schema public)
--
CREATE UNIQUE INDEX ux_year_zone_no ON public.zones USING btree (year_id, zone_no);

--
-- INDEX: ux_zone_pole_no  (schema public)
--
CREATE UNIQUE INDEX ux_zone_pole_no ON public.poles USING btree (zone_id, pole_no);

--
-- FK CONSTRAINT: cluster_forms fk_cluster_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_cluster_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: cluster_forms fk_clusters_cluster_forms  (schema public)
--
ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_clusters_cluster_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: flower_forms fk_clusters_flower_forms  (schema public)
--
ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_clusters_flower_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pod_forms fk_clusters_pod_forms  (schema public)
--
ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_clusters_pod_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pollination_forms fk_clusters_pollination_forms  (schema public)
--
ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_clusters_pollination_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pre_harvest_forms fk_clusters_pre_harvest_forms  (schema public)
--
ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_clusters_pre_harvest_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: flower_forms fk_flower_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_flower_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: harvest_grading_forms fk_harvest_grading_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_harvest_grading_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pod_forms fk_pod_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_pod_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: clusters fk_poles_clusters  (schema public)
--
ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT fk_poles_clusters FOREIGN KEY (pole_id) REFERENCES public.poles(pole_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: harvest_grading_forms fk_poles_harvest_grading_forms  (schema public)
--
ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_poles_harvest_grading_forms FOREIGN KEY (pole_id) REFERENCES public.poles(pole_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pollination_forms fk_pollination_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_pollination_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: pre_harvest_forms fk_pre_harvest_forms_recorded_by  (schema public)
--
ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_pre_harvest_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: stock_movements fk_stock_movements_from_warehouse  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_from_warehouse FOREIGN KEY (from_warehouse_id) REFERENCES public.warehouses(warehouse_id);

--
-- FK CONSTRAINT: stock_movements fk_stock_movements_issued_to_customer  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_issued_to_customer FOREIGN KEY (issued_to_customer_id) REFERENCES public.customers(customer_id);

--
-- FK CONSTRAINT: stock_movements fk_stock_movements_production_year  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_production_year FOREIGN KEY (production_year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: stock_movements fk_stock_movements_recorded_by  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

--
-- FK CONSTRAINT: stock_movements fk_stock_movements_to_warehouse  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_to_warehouse FOREIGN KEY (to_warehouse_id) REFERENCES public.warehouses(warehouse_id);

--
-- FK CONSTRAINT: cluster_forms fk_years_cluster_forms  (schema public)
--
ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_years_cluster_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: flower_forms fk_years_flower_forms  (schema public)
--
ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_years_flower_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: harvest_grading_forms fk_years_harvest_forms  (schema public)
--
ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_years_harvest_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: pod_forms fk_years_pod_forms  (schema public)
--
ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_years_pod_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: pollination_forms fk_years_pollination_forms  (schema public)
--
ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_years_pollination_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: pre_harvest_forms fk_years_pre_harvest_forms  (schema public)
--
ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_years_pre_harvest_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: stock_movements fk_years_stock_movements  (schema public)
--
ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_years_stock_movements FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: year_form_settings fk_years_year_form_setting  (schema public)
--
ALTER TABLE ONLY public.year_form_settings
    ADD CONSTRAINT fk_years_year_form_setting FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: zones fk_years_zones  (schema public)
--
ALTER TABLE ONLY public.zones
    ADD CONSTRAINT fk_years_zones FOREIGN KEY (year_id) REFERENCES public.years(year_id);

--
-- FK CONSTRAINT: poles fk_zones_poles  (schema public)
--
ALTER TABLE ONLY public.poles
    ADD CONSTRAINT fk_zones_poles FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE RESTRICT;

