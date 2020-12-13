CREATE TABLE project
(  id SERIAL   UNIQUE,
   customerId  INTEGER,
   projectname VARCHAR (255),
   description VARCHAR (255),
   lead        VARCHAR (255),
   PRIMARY KEY (id) );

CREATE TABLE project_context
(  projectId   SERIAL,
   position    INTEGER,
   owner       VARCHAR (255),
   selected    BOOLEAN DEFAULT FALSE,
   flag        BOOLEAN DEFAULT FALSE,
   blocked     BOOLEAN DEFAULT FALSE,
   createdate  timestamp DEFAULT CURRENT_TIMESTAMP,
   status      VARCHAR (255) DEFAULT 'ACTIVE',
   FOREIGN KEY (projectId) REFERENCES project (id),
   PRIMARY KEY (projectId) );
   
   
/* Insert trigger / Add context record (default) */
CREATE TRIGGER trigger_insert_default_context
   AFTER INSERT
   ON project
   FOR EACH ROW
       EXECUTE PROCEDURE function_insert_default_context();
