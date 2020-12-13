package dev.sultanov.springdata.multitenancy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

@Entity
@Table(name = "users")
public class Users implements UserDetails {
	
	public Users() {
	    super();
	}
	
	public Users(String username,String password,String tenant, String role) {
		this.username = username;
		this.password = password;
		this.tenant = tenant;
		this.role = role;
	}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
	@Column(name = "role", nullable = false)
	private String role;
	
    public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Column(unique = true)
    private String username;
    private String tenant;
    private String token;

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }

	public String getTenant() {
		return tenant;
	}

	public void setTenant(String tenant) {
		this.tenant = tenant;
	}

	public String getToken() {
		token = "temptoken";
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}