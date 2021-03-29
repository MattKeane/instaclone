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

### Picture
| Field    | Datatype  |
| -------- | --------- |
| img      | Buffer    |
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