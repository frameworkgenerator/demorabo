CREATE TABLE users
  (
     id         			SERIAL,
     username   			VARCHAR(255) UNIQUE,
     password   			VARCHAR(255),
     tenant     			VARCHAR(255),
     AccountNonExpired 		BOOLEAN,
     AccountNonLocked 		BOOLEAN,
     CredentialsNonExpired 	BOOLEAN,
     Enabled 				BOOLEAN,
     role 					VARCHAR(255),
     token					VARCHAR(255),
     PRIMARY KEY (id)
  );