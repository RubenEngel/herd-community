# A Next.js article social article web app using Apollo Client and WPGraphQL as a data source.

## This web application is still in development with buttons not yet active
A platform for young adults to write about the things that interest them and their peers. This web application will be a social media for articles that can be thought of as a having similarities with medium and instagram.
The founders are looking to do a relaunch with a slight rebranding in the coming months.

It was decided to use the wordpress GraphQL API plugin (WPGraphQL) as a data source due to amount of content already on the wordpress server and the clients familiarity with it. Apollo-Server will be used to pull user profile data and social media elements at the same time as article data from wordpress.

HERD instagram page: https://www.instagram.com/herd.uk/

Features to be implemented:
* WYSIWYG Article submission using CK Editor 5
* Profiles with follows, likes and comments
* Apollo-Server integration to pull from wordpress and firestore simultaneously via GraphQL queries
* Static pages for site information.
