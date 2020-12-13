package dev.sultanov.springdata.multitenancy.service;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.repository.ProjectRepository;

@Service
public class ReadService {
	private ProjectRepository projectrepository;

	public ReadService(
			ProjectRepository projectrepository) 
	{
		this.projectrepository = projectrepository;
	}

	@Transactional
	public Projects findProjectById(Long ids) throws Exception {
		return projectrepository.findById(ids).orElse(new Projects());
	}

	public Iterable<Projects> findAllProjects() {
		return projectrepository.findAll();
	}
}
