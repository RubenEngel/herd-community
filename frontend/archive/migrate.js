import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MIGRATE_POSTS } from '../lib/apolloQueries';
import { firestore } from '../lib/firebase.js';

function MigratePage() {
  // const { data } = useQuery(MIGRATE_POSTS, {
  //   variables: {
  //     first: 1,
  //     after: '', // 'YXJyYXljb25uZWN0aW9uOjE1NTU=',
  //   },
  // });

  // function uploadFirestore(postData) {
  //   firestore
  //     .collection('posts')
  //     .doc(postData.slug)
  //     .set(postData)
  //     .then(() => console.log(`${postData.title} uploaded succesfully`))
  //     .catch((error) => {
  //       console.error('Error writing document: ', error);
  //     });
  // }

  // function migrate() {
  //   const noSqlPostData = data.posts.edges.map((post) => ({
  //     title: post.node.title,
  //     slug: post.node.slug,
  //     author: {
  //       firstName: post.node.author.node.firstName,
  //       lastName: post.node.author.node.lastName,
  //     },
  //     date: post.node.date,
  //     categories: post.node.categories.edges.map(
  //       (catEdge) => catEdge.node.name
  //     ),
  //     tags: post.node.tags.edges.map((tagEdge) => tagEdge.node.name),
  //     featuredImage: post.node.featuredImage?.node.sourceUrl || null,
  //     content: post.node.content.split('<em>By ')[0],
  //     likes: 0,
  //   }));
  //   noSqlPostData.forEach((post) => uploadFirestore(post));
  // }

  // data && console.log(data);

  return (
    <div>
      {/* <button onClick={() => migrate()}>Migrate</button> */}
      <button onClick={() => console.log('Hey there')}>Migrate</button>
    </div>
  );
}

export default MigratePage;

// endCursor = YXJyYXljb25uZWN0aW9uOjE1NTU=
