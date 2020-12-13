package dev.sultanov.springdata.multitenancy.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.service.CreateService;
import dev.sultanov.springdata.multitenancy.service.DeleteService;
import dev.sultanov.springdata.multitenancy.service.ReadService;
import dev.sultanov.springdata.multitenancy.service.UpdateService;

@RestController
@RequestMapping("/v1/project")
public class ProjectController {

	private CreateService createservice;
	private DeleteService deleteservice;
	private UpdateService updateservice;
	private ReadService readservice;


	public ProjectController(CreateService createservice,DeleteService deleteservice,UpdateService updateservice,ReadService readservice) {
		this.createservice = createservice;
		this.deleteservice = deleteservice;
		this.updateservice = updateservice;
		this.readservice = readservice;
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public Projects create(@RequestBody Projects project) throws JsonProcessingException {
		return createservice.addProject(project);
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/addall")
	public Iterable<Projects> createAll(@RequestBody List<Projects> entities) throws JsonProcessingException {
		return createservice.addAllProjects(entities);
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/getbyid/{id}")
	public Projects findByName(@PathVariable Long id) throws Exception {
		return readservice.findProjectById(id);
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/update")
	public Iterable<Projects> update(@RequestBody List<Projects> entities) throws JsonProcessingException {
		return updateservice.updateProject(entities);
	}
	
	@CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/getall")
	public Iterable<Projects> findByName() throws JsonProcessingException {
		return readservice.findAllProjects();
	}
	
    @CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/deleteall")
    public void deleteAll(@RequestBody List<Projects> entities) throws JsonProcessingException {
		deleteservice.deleteAllProjects(entities);
    }
    
    @CrossOrigin
	@ResponseBody
	@RequestMapping(method = RequestMethod.DELETE, value = "/deletebyid/{id}")
    public void deleteById(@PathVariable Long id) throws JsonProcessingException {
		deleteservice.deleteProjectById(id);
    }
}