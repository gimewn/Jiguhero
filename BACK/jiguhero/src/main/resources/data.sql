INSERT INTO user (USER_ID, PASSWORD, EMAIL, NICKNAME, NAME, GRADE, POINT, ACTIVATED) VALUES (1, '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'kian6365@naver.com', 'nickname1', 'name1', 1, 100, true);
INSERT INTO user (USER_ID, PASSWORD, EMAIL, NICKNAME, NAME, GRADE, POINT, ACTIVATED) VALUES (2, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'kian6365@gmail.com', 'nickname2', 'name2', 2, 200, true);

INSERT INTO authority (AUTHORITY_NAME) values ('ROLE_USER');
INSERT INTO authority (AUTHORITY_NAME) values ('ROLE_ADMIN');

INSERT INTO user_authority (USER_ID, AUTHORITY_NAME) values (1, 'ROLE_USER');
INSERT INTO user_authority (USER_ID, AUTHORITY_NAME) values (1, 'ROLE_ADMIN');
INSERT INTO user_authority (USER_ID, AUTHORITY_NAME) values (2, 'ROLE_USER');