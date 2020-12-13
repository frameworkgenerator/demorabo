package dev.sultanov.springdata.multitenancy.repository;

import dev.sultanov.springdata.multitenancy.entity.Users;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    @Query(
            value = "SELECT * FROM \"default\".users",nativeQuery = true
    )
	public List<Users> loadUsers();
    
    @Modifying(clearAutomatically = true)
    @Query(
            value = "drop schema \"default\" cascade",nativeQuery = true
    )
	public void truncate(@Param("tenant") String tenant);
        
    @Query(
            value = "SHOW search_path",nativeQuery = true
    )
	public String findDatabaseName();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(
            value = "UPDATE \"default\".users SET tenant= :tenant WHERE username= :userName",nativeQuery = true
    )
	public void setDefaultTenant(@Param("tenant") String tenant, @Param("userName") String userName);
    
    @Query(
            value = "SELECT DISTINCT schema_name FROM information_schema.schemata WHERE NOT schema_name='pg_toast' AND NOT schema_name='pg_temp_1' AND NOT schema_name='pg_toast_temp_1' AND NOT schema_name='pg_catalog' AND NOT schema_name='public' AND NOT schema_name='default' AND NOT schema_name='information_schema'",nativeQuery = true
    )
	public List<String> showDatabaseList();
    
    Optional<Users> findByUsername(String username);
}
