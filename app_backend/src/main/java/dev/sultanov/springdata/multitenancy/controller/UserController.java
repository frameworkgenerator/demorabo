package dev.sultanov.springdata.multitenancy.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.sultanov.springdata.multitenancy.entity.Users;
import dev.sultanov.springdata.multitenancy.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
@Component("usercontroller")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@CrossOrigin
	@PostMapping
	public Users register(@RequestBody Users user) {
		Users created = userService.createUser(user);
		return created;
	}
	
	@CrossOrigin
	@PutMapping
	@RequestMapping(method = RequestMethod.PUT, value = "/{username}/{tenant}")
	public ResponseEntity<String> tenantProvider(@PathVariable(value = "username") String username, @PathVariable(value = "tenant") String tenant) {
		String out = userService.updateTenant(username,tenant);
		return ResponseEntity.status(HttpStatus.CREATED).body(out);
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Users> get() {
		List<Users> userList = userService.loadUserByUsername();
		return userList;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/getDBList")
	public List<String> showDatabases() {
		List<String> db = userService.showDetabaseList();
		return db;
	}
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST, value = "/tenant")
	public ResponseEntity<Users> addRandom(@RequestBody Users user) {
		Users userList = userService.addRandomUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(userList);
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/confirm/{username}")
	public ResponseEntity<Users> filterFields(@PathVariable String username) throws JsonProcessingException {
		System.out.println(username);
		Users users = userService.loadUserByUsername(username);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(users);
	}	
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, value = "/truncateTable/{tenant}")
	public BodyBuilder truncate(@PathVariable String tenant) throws JsonProcessingException {
		userService.truncateByName(tenant);
		return ResponseEntity.status(HttpStatus.ACCEPTED);
	}	
	
	
	@RequestMapping("/")
	public String index() {
		return "User Service works!";
	}
}
