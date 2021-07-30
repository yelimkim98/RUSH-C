create table article (
    id bigint generated by default as identity,
    content clob,
    create_date timestamp,
    latitude double,
    longitude double,
    private_map boolean not null,
    public_map boolean not null,
    title varchar(50) not null,
    user_id bigint not null,
    primary key (id)
);
create table article_group (
    id bigint generated by default as identity,
    create_date timestamp,
    article_id bigint not null,
    group_id bigint not null,
    primary key (id)
);
create table article_like (
    id bigint generated by default as identity,
    article_id bigint not null,
    user_id bigint not null,
    primary key (id)
);
create table comment (
    id bigint generated by default as identity,
    content clob,
    article_id bigint not null,
    user_id bigint not null,
    create_date timestamp,
    primary key (id)
);
create table group_table (
    id bigint generated by default as identity,
    invitation_code varchar(255),
    name varchar(255) not null,
    create_date timestamp,
    primary key (id)
);
create table user (
    id bigint generated by default as identity,
    email varchar(100) not null,
    image_url varchar(255),
    join_date timestamp,
    nick_name varchar(100) not null,
    password varchar(255),
    provider varchar(255),
    provider_id varchar(255),
    visit_date timestamp,
    primary key (id)
);
create table user_group (
    id bigint generated by default as identity,
    create_date timestamp,
    group_id bigint not null,
    user_id bigint not null,
    primary key (id)
);
-- 제약조건 네이밍 규칙 : 테이블명_컬럼명_제약조건 --
alter table group_table
    add constraint group_table_invitation_code_unique unique (invitation_code);

alter table user
    add constraint user_email_unique unique (email);

alter table user_group
    add constraint user_group_user_id_group_id_unique unique (user_id, group_id);

alter table article
    add constraint article_user_id_foreign_key
        foreign key (user_id)
            references user;

alter table article_group
    add constraint article_group_article_id_foreign_key
        foreign key (article_id)
            references article;

alter table article_group
    add constraint article_group_group_id_foreign_key
        foreign key (group_id)
            references group_table;

alter table article_like
    add constraint article_like_article_id_foreign_key
        foreign key (article_id)
            references article;

alter table article_like
    add constraint article_like_user_id_foreign_key
        foreign key (user_id)
            references user;

alter table comment
    add constraint comment_article_id_foreign_key
        foreign key (article_id)
            references article;

alter table comment
    add constraint comment_user_id_foreign_key
        foreign key (user_id)
            references user;

alter table user_group
    add constraint user_group_group_id_foreign_key
        foreign key (group_id)
            references group_table;

alter table user_group
    add constraint user_group_user_id_foreign_key
        foreign key (user_id)
            references user;
