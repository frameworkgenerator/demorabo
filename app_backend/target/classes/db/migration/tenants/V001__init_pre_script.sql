CREATE OR REPLACE FUNCTION function_insert_default_context()
  RETURNS TRIGGER 
  AS
$$
BEGIN
	IF NEW.id >= 1 THEN
		-- INSERT INTO xxxxxxxx_context(teststepid) VALUES (NEW.id);
		EXECUTE format('INSERT INTO ' || TG_TABLE_NAME ||'_context (' || TG_TABLE_NAME || 'id) VALUES (' || NEW.id || ')');
	END IF;
	RETURN NEW;
END;
$$
LANGUAGE PLPGSQL;