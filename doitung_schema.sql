SET client_encoding = 'UTF8';

SET standard_conforming_strings = 'on';

SELECT pg_catalog.set_config('search_path', '', false);

CREATE DATABASE doitung_seed_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';

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

CREATE SEQUENCE public.accounts_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.accounts_account_id_seq OWNED BY public.accounts.account_id;

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

CREATE SEQUENCE public.cluster_forms_cluster_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cluster_forms_cluster_form_id_seq OWNED BY public.cluster_forms.cluster_form_id;

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

CREATE SEQUENCE public.clusters_cluster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.clusters_cluster_id_seq OWNED BY public.clusters.cluster_id;

CREATE TABLE public.customers (
    customer_id bigint NOT NULL,
    customer_name character varying(100) NOT NULL,
    note text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;

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

CREATE SEQUENCE public.flower_forms_flower_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.flower_forms_flower_form_id_seq OWNED BY public.flower_forms.flower_form_id;

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

CREATE SEQUENCE public.harvest_grading_forms_harvest_grading_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.harvest_grading_forms_harvest_grading_form_id_seq OWNED BY public.harvest_grading_forms.harvest_grading_form_id;

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

CREATE SEQUENCE public.pod_forms_pod_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pod_forms_pod_form_id_seq OWNED BY public.pod_forms.pod_form_id;

CREATE TABLE public.poles (
    pole_id bigint NOT NULL,
    zone_id bigint NOT NULL,
    pole_no bigint NOT NULL,
    harvest_grading_form_done boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.poles_pole_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.poles_pole_id_seq OWNED BY public.poles.pole_id;

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

CREATE SEQUENCE public.pollination_forms_pollination_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pollination_forms_pollination_form_id_seq OWNED BY public.pollination_forms.pollination_form_id;

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

CREATE SEQUENCE public.pre_harvest_forms_pre_harvest_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pre_harvest_forms_pre_harvest_form_id_seq OWNED BY public.pre_harvest_forms.pre_harvest_form_id;

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

CREATE SEQUENCE public.stock_balances_stock_balance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.stock_balances_stock_balance_id_seq OWNED BY public.stock_balances.stock_balance_id;

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

CREATE SEQUENCE public.stock_movements_stock_movement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.stock_movements_stock_movement_id_seq OWNED BY public.stock_movements.stock_movement_id;

CREATE TABLE public.warehouses (
    warehouse_id bigint NOT NULL,
    warehouse_name text NOT NULL,
    active_status boolean DEFAULT true,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.warehouses_warehouse_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.warehouses_warehouse_id_seq OWNED BY public.warehouses.warehouse_id;

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

CREATE SEQUENCE public.year_form_settings_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.year_form_settings_year_id_seq OWNED BY public.year_form_settings.year_id;

CREATE TABLE public.years (
    year_id bigint NOT NULL,
    year bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.years_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.years_year_id_seq OWNED BY public.years.year_id;

CREATE TABLE public.zones (
    zone_id bigint NOT NULL,
    year_id bigint NOT NULL,
    zone_no bigint NOT NULL,
    zone_name text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

CREATE SEQUENCE public.zones_zone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.zones_zone_id_seq OWNED BY public.zones.zone_id;

ALTER TABLE ONLY public.accounts ALTER COLUMN account_id SET DEFAULT nextval('public.accounts_account_id_seq'::regclass);

ALTER TABLE ONLY public.cluster_forms ALTER COLUMN cluster_form_id SET DEFAULT nextval('public.cluster_forms_cluster_form_id_seq'::regclass);

ALTER TABLE ONLY public.clusters ALTER COLUMN cluster_id SET DEFAULT nextval('public.clusters_cluster_id_seq'::regclass);

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);

ALTER TABLE ONLY public.flower_forms ALTER COLUMN flower_form_id SET DEFAULT nextval('public.flower_forms_flower_form_id_seq'::regclass);

ALTER TABLE ONLY public.harvest_grading_forms ALTER COLUMN harvest_grading_form_id SET DEFAULT nextval('public.harvest_grading_forms_harvest_grading_form_id_seq'::regclass);

ALTER TABLE ONLY public.pod_forms ALTER COLUMN pod_form_id SET DEFAULT nextval('public.pod_forms_pod_form_id_seq'::regclass);

ALTER TABLE ONLY public.poles ALTER COLUMN pole_id SET DEFAULT nextval('public.poles_pole_id_seq'::regclass);

ALTER TABLE ONLY public.pollination_forms ALTER COLUMN pollination_form_id SET DEFAULT nextval('public.pollination_forms_pollination_form_id_seq'::regclass);

ALTER TABLE ONLY public.pre_harvest_forms ALTER COLUMN pre_harvest_form_id SET DEFAULT nextval('public.pre_harvest_forms_pre_harvest_form_id_seq'::regclass);

ALTER TABLE ONLY public.stock_balances ALTER COLUMN stock_balance_id SET DEFAULT nextval('public.stock_balances_stock_balance_id_seq'::regclass);

ALTER TABLE ONLY public.stock_movements ALTER COLUMN stock_movement_id SET DEFAULT nextval('public.stock_movements_stock_movement_id_seq'::regclass);

ALTER TABLE ONLY public.warehouses ALTER COLUMN warehouse_id SET DEFAULT nextval('public.warehouses_warehouse_id_seq'::regclass);

ALTER TABLE ONLY public.year_form_settings ALTER COLUMN year_id SET DEFAULT nextval('public.year_form_settings_year_id_seq'::regclass);

ALTER TABLE ONLY public.years ALTER COLUMN year_id SET DEFAULT nextval('public.years_year_id_seq'::regclass);

ALTER TABLE ONLY public.zones ALTER COLUMN zone_id SET DEFAULT nextval('public.zones_zone_id_seq'::regclass);

SELECT pg_catalog.setval('public.accounts_account_id_seq', 3, true);

SELECT pg_catalog.setval('public.cluster_forms_cluster_form_id_seq', 12, true);

SELECT pg_catalog.setval('public.clusters_cluster_id_seq', 12, true);

SELECT pg_catalog.setval('public.customers_customer_id_seq', 3, true);

SELECT pg_catalog.setval('public.flower_forms_flower_form_id_seq', 10, true);

SELECT pg_catalog.setval('public.harvest_grading_forms_harvest_grading_form_id_seq', 1, true);

SELECT pg_catalog.setval('public.pod_forms_pod_form_id_seq', 2, true);

SELECT pg_catalog.setval('public.poles_pole_id_seq', 6, true);

SELECT pg_catalog.setval('public.pollination_forms_pollination_form_id_seq', 6, true);

SELECT pg_catalog.setval('public.pre_harvest_forms_pre_harvest_form_id_seq', 2, true);

SELECT pg_catalog.setval('public.stock_balances_stock_balance_id_seq', 2, true);

SELECT pg_catalog.setval('public.stock_movements_stock_movement_id_seq', 3, true);

SELECT pg_catalog.setval('public.warehouses_warehouse_id_seq', 2, true);

SELECT pg_catalog.setval('public.year_form_settings_year_id_seq', 1, false);

SELECT pg_catalog.setval('public.years_year_id_seq', 1, true);

SELECT pg_catalog.setval('public.zones_zone_id_seq', 2, true);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);

ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT cluster_forms_pkey PRIMARY KEY (cluster_form_id);

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_pkey PRIMARY KEY (cluster_id);

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);

ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT flower_forms_pkey PRIMARY KEY (flower_form_id);

ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT harvest_grading_forms_pkey PRIMARY KEY (harvest_grading_form_id);

ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT pod_forms_pkey PRIMARY KEY (pod_form_id);

ALTER TABLE ONLY public.poles
    ADD CONSTRAINT poles_pkey PRIMARY KEY (pole_id);

ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT pollination_forms_pkey PRIMARY KEY (pollination_form_id);

ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT pre_harvest_forms_pkey PRIMARY KEY (pre_harvest_form_id);

ALTER TABLE ONLY public.stock_balances
    ADD CONSTRAINT stock_balances_pkey PRIMARY KEY (stock_balance_id);

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (stock_movement_id);

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (warehouse_id);

ALTER TABLE ONLY public.year_form_settings
    ADD CONSTRAINT year_form_settings_pkey PRIMARY KEY (year_id);

ALTER TABLE ONLY public.years
    ADD CONSTRAINT years_pkey PRIMARY KEY (year_id);

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (zone_id);

CREATE UNIQUE INDEX idx_accounts_email ON public.accounts USING btree (email);

CREATE INDEX idx_cluster_forms_recorded_by_id ON public.cluster_forms USING btree (recorded_by_id);

CREATE INDEX idx_clusters_pole_id ON public.clusters USING btree (pole_id);

CREATE INDEX idx_flower_forms_recorded_by_id ON public.flower_forms USING btree (recorded_by_id);

CREATE INDEX idx_harvest_grading_forms_recorded_by_id ON public.harvest_grading_forms USING btree (recorded_by_id);

CREATE INDEX idx_pod_forms_recorded_by_id ON public.pod_forms USING btree (recorded_by_id);

CREATE INDEX idx_poles_zone_id ON public.poles USING btree (zone_id);

CREATE INDEX idx_pollination_forms_recorded_by_id ON public.pollination_forms USING btree (recorded_by_id);

CREATE INDEX idx_pre_harvest_forms_recorded_by_id ON public.pre_harvest_forms USING btree (recorded_by_id);

CREATE INDEX idx_stock_balances_grade ON public.stock_balances USING btree (grade);

CREATE INDEX idx_stock_balances_warehouse_id ON public.stock_balances USING btree (warehouse_id);

CREATE INDEX idx_stock_balances_year_id ON public.stock_balances USING btree (year_id);

CREATE INDEX idx_stock_movements_production_year_id ON public.stock_movements USING btree (production_year_id);

CREATE INDEX idx_stock_movements_recorded_by_id ON public.stock_movements USING btree (recorded_by_id);

CREATE INDEX idx_stock_movements_year_id ON public.stock_movements USING btree (year_id);

CREATE UNIQUE INDEX idx_years_year ON public.years USING btree (year);

CREATE INDEX idx_zones_year_id ON public.zones USING btree (year_id);

CREATE UNIQUE INDEX ux_pole_cluster_no ON public.clusters USING btree (pole_id, cluster_no);

CREATE UNIQUE INDEX ux_stock_balance ON public.stock_balances USING btree (year_id, warehouse_id, grade);

CREATE UNIQUE INDEX ux_year_cluster_flower ON public.flower_forms USING btree (year_id, cluster_id);

CREATE UNIQUE INDEX ux_year_cluster_form ON public.cluster_forms USING btree (year_id, cluster_id);

CREATE UNIQUE INDEX ux_year_cluster_pod ON public.pod_forms USING btree (year_id, cluster_id);

CREATE UNIQUE INDEX ux_year_cluster_pollination ON public.pollination_forms USING btree (year_id, cluster_id);

CREATE UNIQUE INDEX ux_year_cluster_preharvest ON public.pre_harvest_forms USING btree (year_id, cluster_id);

CREATE UNIQUE INDEX ux_year_pole_harvest ON public.harvest_grading_forms USING btree (year_id, pole_id);

CREATE UNIQUE INDEX ux_year_warehouse_name ON public.warehouses USING btree (warehouse_name);

CREATE UNIQUE INDEX ux_year_zone_name ON public.zones USING btree (year_id, zone_name);

CREATE UNIQUE INDEX ux_year_zone_no ON public.zones USING btree (year_id, zone_no);

CREATE UNIQUE INDEX ux_zone_pole_no ON public.poles USING btree (zone_id, pole_no);

ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_cluster_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_clusters_cluster_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_clusters_flower_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_clusters_pod_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_clusters_pollination_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_clusters_pre_harvest_forms FOREIGN KEY (cluster_id) REFERENCES public.clusters(cluster_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_flower_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_harvest_grading_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_pod_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT fk_poles_clusters FOREIGN KEY (pole_id) REFERENCES public.poles(pole_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_poles_harvest_grading_forms FOREIGN KEY (pole_id) REFERENCES public.poles(pole_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_pollination_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_pre_harvest_forms_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_from_warehouse FOREIGN KEY (from_warehouse_id) REFERENCES public.warehouses(warehouse_id);

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_issued_to_customer FOREIGN KEY (issued_to_customer_id) REFERENCES public.customers(customer_id);

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_production_year FOREIGN KEY (production_year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_recorded_by FOREIGN KEY (recorded_by_id) REFERENCES public.accounts(account_id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_to_warehouse FOREIGN KEY (to_warehouse_id) REFERENCES public.warehouses(warehouse_id);

ALTER TABLE ONLY public.cluster_forms
    ADD CONSTRAINT fk_years_cluster_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.flower_forms
    ADD CONSTRAINT fk_years_flower_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.harvest_grading_forms
    ADD CONSTRAINT fk_years_harvest_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.pod_forms
    ADD CONSTRAINT fk_years_pod_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.pollination_forms
    ADD CONSTRAINT fk_years_pollination_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.pre_harvest_forms
    ADD CONSTRAINT fk_years_pre_harvest_forms FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_years_stock_movements FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.year_form_settings
    ADD CONSTRAINT fk_years_year_form_setting FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT fk_years_zones FOREIGN KEY (year_id) REFERENCES public.years(year_id);

ALTER TABLE ONLY public.poles
    ADD CONSTRAINT fk_zones_poles FOREIGN KEY (zone_id) REFERENCES public.zones(zone_id) ON UPDATE CASCADE ON DELETE RESTRICT;

