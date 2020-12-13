package dev.sultanov.springdata.multitenancy.service;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.repository.ProjectRepository;

@Service
public class UpdateService {
	private EntityManagerFactory entityManagerFactory;
	private ProjectRepository projectrepository;

	public UpdateService(ProjectRepository projectrepository) {
		this.projectrepository = projectrepository;
	}
	
	@Transactional
	public Iterable<Projects> updateProject(List<Projects> entities) throws JsonProcessingException {
		return projectrepository.saveAll(entities);
	}
}
