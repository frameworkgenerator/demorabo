package dev.sultanov.springdata.multitenancy.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "project_context")
public class ProjectsContext {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
Long projectId;
private Integer position = 0;
private String owner;
private Boolean selected = false;
private Boolean flag = false;
private Boolean blocked = false;
@Column(name = "createdate", nullable = false)
private LocalDateTime createdate = LocalDateTime.now();
public LocalDateTime getCreatedata() {
	return createdate;
}

private String status;

public ProjectsContext() {
}

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "projectId", nullable = false)
    private Projects projects;

public Integer getPosition() {
return position;
}

public void setPosition(Integer position) {
this.position = position;
}

public Boolean getSelected() {
return selected;
}

public void setSelected(Boolean selected) {
this.selected = selected;
}

public Boolean getBlocked() {
return blocked;
}

public void setBlocked(Boolean blocked) {
this.blocked = blocked;
}

public Boolean getFlag() {
return flag;
}

public void setFlag(Boolean flag) {
this.flag = flag;
}

public Long getProjectId() {
return projectId;
}

public void setProjectId(Long projectId) {
this.projectId = projectId;
}

public String getOwner() {
return owner;
}

public void setOwner(String owner) {
this.owner = owner;
}

public String getStatus() {
return status;
}

public void setStatus(String status) {
this.status = status;
}
}