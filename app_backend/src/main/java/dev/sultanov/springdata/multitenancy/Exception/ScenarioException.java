package dev.sultanov.springdata.multitenancy.Exception;

public class ScenarioException extends RuntimeException {

	private String message;
	private String details;
	private String hint;
	private String nextAction;
	private String support;
	
	public ScenarioException() {}
	
	public ScenarioException(String message,String details,String hint, String nextAction, String support) {
		this.message = message;
		this.details = details;
		this.hint = hint;
		this.nextAction = nextAction;
		this.support = support;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getNextAction() {
		return nextAction;
	}

	public void setNextAction(String nextAction) {
		this.nextAction = nextAction;
	}

	public String getSupport() {
		return support;
	}

	public void setSupport(String support) {
		this.support = support;
	}
}
