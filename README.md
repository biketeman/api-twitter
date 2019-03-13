# 3A twitter-like node project

## Features

### User

- GET /user
	- Description: get all data from a given user
	- Query:
		- user_id

- POST /user
	- Description: insert a new user into databse

- DELETE /user
	- Description: update user "deleted_at" column

### Tweets

- GET /tweet
	- Description: get data from a single tweet via its Id
	- Query: 
		- tweet_id

- POST /tweet
	- Description: insert a tweet into database

- DELETE /tweet
	- Description: update tweet "deleted_at" column

### Follow / Unfollow

- POST /follow
	- Description: insert into "follows" table
	- Query:
		- follower_id
		- followed_id

- DELETE /follow 
	- Description: update "deleted_at" column of "follows" table
	- Query:
		- unfollower_id
		- unfollowed_id

- GET /follow
	- Description: return all follows from a user
	- Query:
		- user_id

### Likes

- POST /like
	- Description: insert into "like" table
	- Query:
		- user_id
		- tweet_id

- DELETE /like
	- Description: update "deleted_at" column of "likes" table
	- Query:
		- user_id
		- tweet_id

### Retweet

- POST /retweet
	- Description: insert into "tweet" a new tweet with the "retweet" field container the original tweet informations
	- Query:
		- user_id
		- original_id



