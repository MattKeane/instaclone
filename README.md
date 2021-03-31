# Instaclone: An Instagram Clone
A webapp that allows users to share photos with their friends.

## User Stories
* Users can sign up for an account
* Users can post pictures
* Users can update info on their pictures
* Users can delete their pictures
* Users can add friends
* Users can see their friends' pictures
* Users can like their friends'
* Users can comment on their friends' pictures

## Models

### User
| Field    | Datatype  |
| -------- | --------- |
| username | String    |
| email    | String    |
| password | String    |
| friends  | [User]    |

### Photo
| Field    | Datatype  |
| -------- | --------- |
| image    | Buffer    |
| caption  | String    |
| author   | User      |
| likes    | [User]    |
| comments | [Comment] |
| created  | Date      |

### Comment
| Field    | Datatype  |
| -------- | --------- |
| author   | User      |
| body     | String    |
| posted   | Date      |

## Routes

| Route                     | Method | Description           |
| ------------------------- | ------ | --------------------- |
| /auth/register            | GET    | new account page      |
| /auth/register            | POST   | creates account       |
| /auth/login               | POST   | logs in               |
| /auth/logout              | GET    | logs out              |
| /photos                 	| POST   | adds a picture        |
| /photos                 	| GET    | see friends' pictures |
| /photos/:id             	| GET    | show picture          |
| /photos                 	| POST   | create a new picture  |
| /photos/:id/edit        	| GET    | picture edit page     |
| /photos/:id             	| PUT    | update picture        |
| /photos/:id/like        	| POST   | like a picture        |
| /photos/:id/like        	| DELETE | unlike a picture      |
| /photos/:id/comment     	| POST   | add a comment         |
| /photos/:id/comment/:id 	| DELETE | delete a comment      |
