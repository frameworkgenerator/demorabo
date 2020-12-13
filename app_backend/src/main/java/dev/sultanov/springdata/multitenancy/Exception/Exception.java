package dev.sultanov.springdata.multitenancy.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class Exception extends ResponseEntityExceptionHandler {
 
	@ExceptionHandler(ScenarioException.class)
	public final ResponseEntity <Object> handleAllExceptionsHandler(ScenarioException ex){
		ScenarioException exceptionResponse =
				new ScenarioException(
						ex.getMessage(), ex.getDetails(), ex.getHint(),ex.getNextAction(), ex.getSupport());
		return new ResponseEntity(exceptionResponse,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
