package dev.sultanov.springdata.multitenancy.service;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.repository.ProjectRepository;

@Service
public class CreateService {

	private EntityManagerFactory entityManagerFactory;
	private ProjectRepository projectrepository;

	public CreateService(ProjectRepository projectrepository) {
		this.projectrepository = projectrepository;
	}
	
	@Transactional
	public Projects addProject(Projects project) throws JsonProcessingException {
		return projectrepository.save(project);
	}
	
	@Transactional
	public Iterable<Projects> addAllProjects(List<Projects> entities) throws JsonProcessingException {
		return projectrepository.saveAll(entities);
	}
}

