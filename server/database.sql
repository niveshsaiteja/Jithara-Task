---customer table 
create table customer(
    sno serial primary key,
    customer_name varchar(255) not null,
    age integer not null,
    phone varchar(255) not null,
    location varchar(255) not null,
    created_date date default current_date,
    created_time time default current_time
)