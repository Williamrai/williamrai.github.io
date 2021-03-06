PGDMP         ,                y           todo    13.3    13.3     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16603    todo    DATABASE     O   CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE todo;
                postgres    false                        3079    16615    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            ?           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            ?            1259    16753 
   categories    TABLE        CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category character varying(100),
    user_id integer
);
    DROP TABLE public.categories;
       public         heap    postgres    false            ?            1259    16751    categories_category_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    204            ?           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    203            ?            1259    16766    tasks    TABLE     ?   CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    task character varying(100),
    descp text,
    date date,
    category_id integer
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            ?            1259    16764    tasks_task_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tasks_task_id_seq;
       public          postgres    false    206            ?           0    0    tasks_task_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;
          public          postgres    false    205            ?            1259    16745    users    TABLE     ?   CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100),
    email character varying(100),
    password character varying(200)
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    16743    users_user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    202            ?           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    201            ^           2604    16756    categories category_id    DEFAULT     ?   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    203    204    204            _           2604    16769    tasks task_id    DEFAULT     n   ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);
 <   ALTER TABLE public.tasks ALTER COLUMN task_id DROP DEFAULT;
       public          postgres    false    205    206    206            ]           2604    16748    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    201    202    202            ?          0    16753 
   categories 
   TABLE DATA           D   COPY public.categories (category_id, category, user_id) FROM stdin;
    public          postgres    false    204   ,       ?          0    16766    tasks 
   TABLE DATA           H   COPY public.tasks (task_id, task, descp, date, category_id) FROM stdin;
    public          postgres    false    206   R       ?          0    16745    users 
   TABLE DATA           C   COPY public.users (user_id, username, email, password) FROM stdin;
    public          postgres    false    202   ?       ?           0    0    categories_category_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.categories_category_id_seq', 1, true);
          public          postgres    false    203            ?           0    0    tasks_task_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tasks_task_id_seq', 1, true);
          public          postgres    false    205            ?           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public          postgres    false    201            c           2606    16758    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    204            e           2606    16774    tasks tasks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    206            a           2606    16750    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    202            f           2606    16759    categories fk_categories    FK CONSTRAINT     |   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_categories FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 B   ALTER TABLE ONLY public.categories DROP CONSTRAINT fk_categories;
       public          postgres    false    204    3169    202            g           2606    16775    tasks fk_tasks    FK CONSTRAINT        ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_tasks FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
 8   ALTER TABLE ONLY public.tasks DROP CONSTRAINT fk_tasks;
       public          postgres    false    206    204    3171            ?      x?3????M?4?????? ??      ?   ;   x?3??M?NUHTH?)M-(??+?L*?TH?tJ??s?9??u,tM9?b???? ??      ?   $   x?3?????鹉?9z?????F?&\1z\\\ ???     