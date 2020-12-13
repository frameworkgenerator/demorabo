package dev.sultanov.springdata.multitenancy.repository;

import org.springframework.data.repository.CrudRepository;

import dev.sultanov.springdata.multitenancy.entity.Projects;

public interface ProjectRepository extends CrudRepository<Projects, Long> {

}