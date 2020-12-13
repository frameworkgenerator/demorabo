package dev.sultanov.springdata.multitenancy;

import io.cucumber.spring.ScenarioScope;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@ScenarioScope
@Data
public class TestContext {

	private RequestSpecification request;
	private Response response;

	public RequestSpecification getRequest() {
		return request;
	}

	public void setRequest(RequestSpecification request) {
		this.request = request;
	}

	public Response getResponse() {
		return response;
	}

	public void setResponse(Response response) {
		this.response = response;
	}
}
