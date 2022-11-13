<div>
  This is a challenge project, and the goal is a web application (CRUD) to manage patient registers (Patient's name, birth date, email and address) using a cloud database.

 </div>

 <br>
 -------------------------------
 
 - Tech:

 ------------------------------
	 - frontend: 
		  - Javascript;
		  - React;  
	 - backend:
		  - express;
		  - NodeJs;
          	  - AWS Lambda serveless computing;
          	  - AWS DynamoDB;
         	  - AWS API Gateway;
		  - AWS Amplify;
-------------------------------

- Require: 

-------------------------------
	- You need to develop both the front-end and the back-end. ✔️
	- In the front-end you MUST use React. ✔️
	- In the back-end you MUST use Node.js and AWS free-tier. ✔️
	- The patient data should not be static or local. ✔️
	- Field validation (date, required fields, etc). ✔️
	- AWS RDS MySQL, PostgreSQL or DynamoDB as database. ✔️
	- AWS Lambda for serveless computing. ✔️
	- AWS API Gateway for managing your REST API. ✔️
	Extra:
	 - Cache the data in-browser.
	 - Pagination.
	 - Use Material UI - https://material-ui.com.
	 - A cool design. ✔️
-------------------------------

- To run the project: 

-------------------------------
	- https://github.com/vbreksidler/development-challenge-two/tree/victor-reksidler-branch
	- download the project:
		https://github.com/vbreksidler/development-challenge-two/archive/refs/heads/victor-reksidler-branch.zip
	- cd development-challenge-two-victor-reksidler-branch/patient-register
	- npm install
	- aws configure
		Use the follow access to configure your AWS:
		- AWS Acesss Key ID: AKIAVYG2NKJE2P2ADPPU
		- AWS Secret Acees Key: TYbcqZmGGVonE6xE4OiBX1so3mdJaCm0bJxCCJlN
		- default region name: sa-east-1
		- default output format: json	
	- npm start
	- If you want to log in AWS Console: 
		- https://aws.amazon.com/
		- ID da conta: 395595043401
		- user: admin
		- password: 0l!+8k}G=(||3FA

-------------------------------

- Improvements:

-------------------------------
	- Front:
		- add a filter
		- change to state context.
		- cancel button is only functional.
		- when click edit button replace the add form
	- Back:
		- improve the validation through AWS API Gateway.
		- implement especific methods in AWS API Gateway.
		- need getting to know more of AWS authentication(IAM and Cognito).
-------------------------------
