package dev.sultanov.springdata.multitenancy.service;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.repository.ProjectRepository;

@Service
public class DeleteService {

	private EntityManagerFactory entityManagerFactory;
	private ProjectRepository projectrepository;

	public DeleteService(ProjectRepository projectrepository) {
		this.projectrepository = projectrepository;
	}
	
	@Transactional
	public void deleteByIdProjects(Long id) throws JsonProcessingException {
		projectrepository.deleteById(id);
	}
	
	@Transactional
	public void deleteAllProjects(Iterable<Projects> entities) throws JsonProcessingException {
		projectrepository.deleteAll(entities);
	}
	
	@Transactional
	public void deleteProjectById(Long id) throws JsonProcessingException {
		projectrepository.deleteById(id);
	}
}
