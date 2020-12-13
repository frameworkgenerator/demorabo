Feature: Create Customer

  Scenario: Create customer with all required values
    Given user wants to create a customer with following attributes
      | username           | password | tenant       |
      | ventusTester       | ventus   | ventus      |
    When user saves customer
    Then the save is successful
    
