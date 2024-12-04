create table users
(
    id bigserial
        primary key,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    user_name varchar(100) not null,
    password text not null
);

alter table users owner to postgres;

create index idx_public_users_deleted_at
    on users (deleted_at);

create index idx_users_deleted_at
    on users (deleted_at);

create table transactions
(
    id bigserial
        primary key,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    user_id bigint not null
        constraint fk_public_users_transaction
            references users,
    category_id bigint not null,
    amount numeric not null,
    description text,
    type varchar(100) not null
);

alter table transactions owner to postgres;

create index idx_public_transactions_deleted_at
    on transactions (deleted_at);

create table icon_catalogs
(
    id bigserial
        primary key,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    icon_type varchar(100) not null,
    image_url text
);

alter table icon_catalogs owner to postgres;

create table categories
(
    id bigserial
        primary key,
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    updated_at timestamp with time zone default CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone,
    name varchar(100) not null,
    description text,
    user_id bigint not null
        constraint fk_public_users_category
            references users,
    icon_id bigint
        constraint fk_public_icon_catalogs_category
            references icon_catalogs,
    type varchar(100)
);

alter table categories owner to postgres;

create index idx_public_categories_deleted_at
    on categories (deleted_at);

create index idx_categories_deleted_at
    on categories (deleted_at);

create index idx_public_icon_catalogs_deleted_at
    on icon_catalogs (deleted_at);

