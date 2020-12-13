package dev.sultanov.springdata.multitenancy;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.DefaultDataTableCellTransformer;
import io.cucumber.java.DefaultDataTableEntryTransformer;
import io.cucumber.java.DefaultParameterTransformer;
import java.lang.reflect.Type;
import org.springframework.beans.factory.annotation.Autowired;

public class DataTransformer {

  @Autowired
  private ObjectMapper objectMapper;

//  // For data transformation in lambdas
//  public DataTransformer() {
//    // Methods defined in En interface above
//    DefaultParameterTransformer((String fromValue, Type toValueType) -> objectMapper.convertValue(fromValue,
//        objectMapper.constructType(toValueType)));
//
//    DefaultDataTableCellTransformer((fromValue, toValueType) ->
//        objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType)));
//
//    DefaultDataTableEntryTransformer((fromValue, toValueType) ->
//        objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType)));
//
//  }

  // For data transformation in methods
  @DefaultParameterTransformer
  @DefaultDataTableEntryTransformer
  @DefaultDataTableCellTransformer
  public Object transformer(Object fromValue, Type toValueType) {
    return objectMapper.convertValue(fromValue, objectMapper.constructType(toValueType));
  }
}
