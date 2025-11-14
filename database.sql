CREATE database taskify_db;
show databases;
use taskify_db;
select * from users;
select * from tasks;
describe tasks;
alter table users add column is_admin boolean default False;
alter table tasks modify column status ENUM ("pending","in_progress","completed","cancelled","overdue");
update users set is_admin=True where username="sri";