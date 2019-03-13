const express = require('express');
const _ = require('lodash');
const parser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)

const db = config.DB;

const app = express();
app.use(parser.json());

const services = {
	users: {
		getSingleUser: require('./components/users/getSingleUser'),
		getAllUsers: require('./components/users/getAllUsers'),
		postUser: require('./components/users/postUser'),
		deleteUser: require('./components/users/deleteUser'),
		myInformations: require('./components/users/myInformations'),
		updateInformations : require('./components/users/updateInformations')

	},
	tweets: {
		getTweetsByUserId: require('./components/users/getTweetsByUserId'),
		getTweetById: require('./components/tweets/getTweetById'),
		postTweet: require('./components/tweets/postTweet'),
		deleteTweet: require('./components/tweets/deleteTweet')
	},
	retweets: {
		postRetweet: require('./components/retweets/postRetweet'),
		getRetweetsByUserId: require('./components/retweets/getRetweetsByUserId')
	},
	follows: {
		getFollowsByUserId: require('./components/follows/getFollowsByUserId'),
		postNewFollower: require('./components/follows/postNewFollower'),
		getAllFollowersByUserId: require('./components/follows/getAllFollowersByUserId'),
		deleteAFollow: require('./components/follows/deleteAFollow')
	},
	likes: {
		getLikes: require('./components/likes/getLikes'),
		postLike: require('./components/likes/postLike'),
		deleteLike: require('./components/likes/deleteLike')
	},
	comments: {
		postComment : require('./components/comments/postComment'),
		getComment : require('./components/comments/getComment'),
		deleteComment : require('./components/comments/deleteComment')
	},
	middlewares: {
		auth: require('./components/middlewares/auth')
	},
	tokens: {
		updateTokens: require('./components/tokens/updateTokens'),
		disableTokens: require('./components/tokens/disableTokens'),
		getTokens: require('./components/tokens/getTokens')
	}
}


// get all tweets from a selected user
app.get('/user/:user_id/tweets', services.tweets.getTweetsByUserId);

// get all tweets from a selected user
app.get('/user/:user_id/retweets', services.retweets.getRetweetsByUserId);

// get user data via their id
app.get('/user/:user_id/infos',services.users.getSingleUser);

// get the users list 
app.get('/users/list', services.users.getAllUsers);

// post a new user
app.post('/user/add', services.users.postUser);

// update 'deleted_at' column of a user
app.post('/user/delete', services.middlewares.auth, services.users.deleteUser);

// gets all follows of a user
app.get('/user/:user_id/follows', services.follows.getFollowsByUserId);

// get all the users that are following a targeted user
app.get('/user/:user_id/followers', services.follows.getAllFollowersByUserId);

// update 'deleted_at' column of a tweet
app.post('/tweet/delete', services.middlewares.auth, services.tweets.deleteTweet);

// post a new tweet
app.post('/tweet/post', services.middlewares.auth, services.tweets.postTweet);

// get a tweet by its ID
app.get('/tweet/:tweet_id/infos', services.tweets.getTweetById);

// post a retweet out of an existing tweet
app.post('/retweet/post', services.middlewares.auth, services.retweets.postRetweet); 

// post a new follow
app.post('/follow/post', services.middlewares.auth, services.follows.postNewFollower);

// delete a follow 
app.post('/follow/delete', services.middlewares.auth, services.follows.deleteAFollow);

// add a like
app.post('/like', services.middlewares.auth, services.likes.postLike);

// // delete a like
app.post('/like/delete', services.middlewares.auth, services.likes.deleteLike);

// get like list of defined user
app.get('/likes/:user_id', services.likes.getLikes);

// post a comment in a tweet
app.post('/comment/post', services.middlewares.auth, services.comments.postComment);

// get the informations of a selected comment
app.get('/comment/:comment_id/infos', services.comments.getComment);

// // delete a like
app.post('/comment/delete', services.comments.deleteComment);

// get your personnal informations
app.get('/user/myInformations', services.middlewares.auth, services.users.myInformations);

// enable you to update your personnal informations
app.post('/user/updateInformations', services.middlewares.auth, services.users.updateInformations);

// disable, update and get USER's tokens
app.post('/tokens/disable', services.middlewares.auth, services.tokens.disableTokens);
app.post('/tokens/update', services.middlewares.auth, services.tokens.updateTokens);
app.get('/tokens', services.middlewares.auth, services.tokens.getTokens);

app.listen(config.PORT, function () {
  console.log(`Listening on port ${config.PORT}`);
});
