Feature: Create, Edit, Add and Read Projects
    
  Scenario: Create a project
    Given user wants to create a customer with following attributes
      | username           	   | password         | tenant            |
      | ventusTesterPRJCreate  | ventusPRJCreate  | ventusPRJCreate   |
    When user saves customer
    Then the save is successful
    When user wants to create a "project" with the following attributes
    	| projectname    | description	           | lead         | customerId |
    	| project        | project                 | Bas          | 1          |
    When user saves the entity
    Then the save is successful
    When user retrieves information with the following attributes
    	| type    | id | userName	           | passWord         |
    	| project | 1  | ventusTesterPRJCreate | ventusPRJCreate  |
    Then the information was succesfull received

    
#  Scenario: Retrieve a project
#    Given user wants to create a customer with following attributes
#      | username           	     | password    | tenant       |
#      | ventusTesterPRJ          | ventusPRJ   | ventusPRJ    |
#    When user saves customer
#    Then the save is successful
#    When user retrieves information with the following attributes
#    	| type    | id | userName	           | passWord         |
#    	| project | 1  | ventusTesterPRJCreate | ventusPRJCreate  |
#    Then the information was succesfull received
    
