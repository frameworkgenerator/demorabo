package dev.sultanov.springdata.multitenancy.service;

import dev.sultanov.springdata.multitenancy.entity.Users;
import dev.sultanov.springdata.multitenancy.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.transaction.Transactional;

@Service
public class UserService implements UserDetailsService {

	private UserRepository repository;
	private PasswordEncoder encoder;
	private TenantService tenantService;

	public UserService(UserRepository repository, TenantService tenantService) {
		this.repository = repository;
		this.tenantService = tenantService;
		this.encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Transactional
	public Users createUser(Users user) {
		System.out.println(user.getTenant());
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user.setTenant(user.getTenant());
		Users saved = repository.save(user);
		tenantService.initDatabase(user.getTenant());
		return saved;
	}
	
	@Transactional
	public Users updateUser(Users user) {
		Users saved = repository.save(user);
		return saved;
	}

	@Transactional
	public Users addRandomUser(Users user) {
		String encodedPassword = encoder.encode(user.getPassword());

		user.setUsername(user.getUsername());
		user.setPassword(encodedPassword);

		Users saved = repository.save(user);
		return saved;
	}

	public Users resetUser(Users user) {
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		Users saved = repository.save(user);
		tenantService.initDatabase(user.getUsername());
		return saved;
	}

	public String updateTenant(String username, String tenant) {
		repository.setDefaultTenant(tenant, username);
		return "Yes! Changed default tenant.";
	}
	
	public List<String> showDetabaseList() {
		List<String> dbList = repository.showDatabaseList();
		return dbList;
	}

	@Override
	public Users loadUserByUsername(String username) throws UsernameNotFoundException {
		return repository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User with the specified username is not found"));
	}

	@Transactional
	public List<Users> loadUserByUsername() {
		return repository.loadUsers();
	}

	@Transactional
	public Optional<Users> findById(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public Optional<Users> findByName(String username) {
		return repository.findByUsername(username);
	}
	
	@Transactional
	public void truncateByName(String tenant) {
		repository.truncate(tenant);
	}

}