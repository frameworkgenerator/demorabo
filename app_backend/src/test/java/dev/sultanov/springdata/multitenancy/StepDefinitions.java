package dev.sultanov.springdata.multitenancy;

import static io.restassured.RestAssured.given;

import dev.sultanov.springdata.multitenancy.entity.Projects;
import dev.sultanov.springdata.multitenancy.entity.Users;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.LocalServerPort;

public class StepDefinitions {

  @LocalServerPort
  private int port;

  @Autowired
  private TestContext testContext;
  
  private LoginStub login = new LoginStub();

  @Given("user wants to create a customer with following attributes")
  public void user_wants_to_create_a_employee_with_following_attributes(List<Users> users) {
	List<Users> newUsers = new ArrayList<>();
	for(Users item : users) {
		newUsers.add(item);
	}
    login.setUserName(users.get(0).getUsername());
    login.setPassWord(users.get(0).getPassword());
	
    final RequestSpecification request = given().contentType(ContentType.JSON)
        .accept(ContentType.JSON)
        .body(newUsers.get(0))
        .log()
        .all();
    
    testContext.setRequest(request);
  }

  @When("user saves customer")
  public void user_saves_employee() {
    String url = "http://localhost:" + port + "/users";
    final Response response = testContext.getRequest()
        .post(url)
        .thenReturn();

    response.then()
        .log()
        .all();

    testContext.setResponse(response);
  }

  @Then("the save is successful")
  public void the_save_is_successful() {
    testContext.getResponse()
        .then()
        .statusCode(200);
  }
  
  @Given("the information was succesfull received")
  public void the_project_was_opened() {
	    testContext.getResponse()
        .then()
        .statusCode(200);
  }
  
  @When("user retrieves information with the following attributes")
  public void user_retrieves_project_information(List<LoginStub> prj) {
	    String url = "http://localhost:" + port + "/v1/" + login.getEntity() + "/getbyid/" + prj.get(0).getId();
		final Response response = given()
				.auth().preemptive().basic(prj.get(0).getUserName(), prj.get(0).getPassWord())
				  .when()
				  .get(url)
				  .thenReturn();

	    response.then()
	        .log()
	        .all();

	    testContext.setResponse(response);
  }
  
  @When("user wants to create a {string} with the following attributes")
  public void user_wants_to_create_an_entity_with_the_following_attributes(String entity, List<Projects> prj) {
	    login.setEntity(entity);
	    final RequestSpecification request = given().contentType(ContentType.JSON)
	        .accept(ContentType.JSON)
	        .body(prj.get(0))
	        .log()
	        .all();
	    
	    testContext.setRequest(request);
  }
  @When("user saves the entity")
  public void user_saves_the_entity() {
	    String url = "http://localhost:" + port + "/v1/" + login.getEntity() + "/add";

	    final Response response = testContext.getRequest()
			.auth().preemptive().basic(login.getUserName(), login.getPassWord())
	        .post(url)
	        .thenReturn();

	    response.then()
	        .log()
	        .all();

	    testContext.setResponse(response);
  }
}
