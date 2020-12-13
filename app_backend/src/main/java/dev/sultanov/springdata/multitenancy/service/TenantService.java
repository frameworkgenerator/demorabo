package dev.sultanov.springdata.multitenancy.service;

import org.flywaydb.core.Flyway;
import org.springframework.stereotype.Component;

import dev.sultanov.springdata.multitenancy.config.TenantIdentifierResolver;

import javax.sql.DataSource;

@Component
public class TenantService {

    private DataSource dataSource;

    public TenantService(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    static final String DEFAULT_TENANT = "default";

    public String initDatabase(String schema) {
    	System.out.println(schema);
        Flyway flyway = Flyway.configure()
                .locations("db/migration/tenants")
                .dataSource(dataSource)
                .schemas(schema)
                .load();
        flyway.migrate();
        return flyway.toString();
    }
    
        public void initDefaultDatabase() {
            Flyway flyway = Flyway.configure()
                    .locations("db/migration/default")
                    .dataSource(dataSource)
                    .schemas("default")
                    .load();
            flyway.migrate();
    }
}
