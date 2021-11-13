import React from 'react';
import PostList from '../../components/post-list';

function Admin() {
  return (
    <>
    <h1 className="text-center mb-10">Unpublished Posts</h1>
    <PostList published={false} startLoad category={'all'} limit={6}/>
  </>
  )

}

export default Admin;
