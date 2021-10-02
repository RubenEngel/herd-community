import React from "react";
import { firestore } from "../lib/firebase";
import { gql, useMutation } from "@apollo/client";
import makeObj from "../authorData";
import { postsObject } from "../Post Data/postsObject";

const ADD_USER = gql`
  mutation CreateUser($email: String, $firstName: String, $lastName: String) {
    createUser(email: $email, firstName: $firstName, lastName: $lastName) {
      id
      email
    }
  }
`;

const ADD_POST = gql`
  mutation CreateDraft(
    $authorEmail: String
    $slug: String
    $title: String
    $content: String
    $tags: [String]
    $categories: [String]
    $createdAt: DateTime
  ) {
    createDraft(
      slug: $slug
      title: $title
      content: $content
      tags: $tags
      authorEmail: $authorEmail
      categories: $categories
      createdAt: $createdAt
    ) {
      id
      slug
    }
  }
`;

const keys = Object.keys(postsObject);

// const authors = keys.map(k => (
//   {
//   email: postsObject[k].author.email,
//   firstName: postsObject[k].author.firstName,
//   lastName: postsObject[k].author.lastName
// }
// ))

// const CreateUser = ({email, firstName, lastName}) => {
//   const [makeUser, {data, loading}] = useMutation(ADD_USER, {variables: {
//     email: email,
//     firstName: firstName,
//     lastName: lastName
//   }})
//   makeUser()
//   return <h1>Author</h1>
// }

// const SendPost = ({slug, title, content, tags, authorEmail, categories, createdAt}) => {
//     const [sendPost, { data, loading, error }] = useMutation(ADD_POST, {
//     variables: {
//       slug: slug,
//       title: title,
//       content: content,
//       tags: tags,
//       authorEmail: authorEmail,
//       categories: categories,
//       createdAt: createdAt
//     },
//   });
//   sendPost()
//   console.log('Sent post')
//   return (
//   data ?
//   <p>Sent Data</p>
//   :
//   <>
//   <button onClick={() => sendPost()}>No data...</button>
//   <br/>
//   </>
//   )
// };

const Migrate = () => {
  async function getPosts() {
    // const response = await firestore.collection("posts").get();
    // const posts = response.docs.map((p) => p.data());
    // makeObj(posts);
    console.dir(postsObject);
  }

  // function doSomething() {
  //   const keys = Object.keys(postsObject);
  //   keys.forEach((k) => (postsObject[k].slug = k));
  //   console.dir(keys);
  // }

  const keys = Object.keys(postsObject);

  const [go, setGo] = React.useState(false);

  return (
    <div>
      {/* <button onClick={() => getPosts()}>Get Posts</button> */}
      <br />
      {/* <button onClick={() => doSomething()}>Clean Data</button> */}
      <br />
      <button onClick={() => setGo(true)}>Send posts</button>
      {/* {go && authors.filter(a => a.lastName === null ).map((a, index) => {
        const { email, firstName, lastName } = a
        return (<CreateUser key={index} email={email} firstName={firstName} lastName={lastName} />)
      })} */}
      {/* {go && keys.map((k, index) => {
      const {slug, title, content, tags, author, categories, createdAt} = postsObject[k]
      return <SendPost key={index} slug={slug} title={title} content={content} tags={tags} 
        authorEmail={author.email} categories={categories} createdAt={createdAt}/>
    })} */}
    </div>
  );
};

export default Migrate;
