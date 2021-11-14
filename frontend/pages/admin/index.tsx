import React from 'react';
import PostList from '../../components/post-list';

function Admin() {
  return (
    <>
    <div className="bg-primary text-center text-secondary lg:mt-6 lg:px-56 rounded-xl p-1 lg:p-2 font-bold mb-6">
      <h3 className="uppercase">Unpublished Posts</h3>
    </div>
    
    <PostList published={false} startLoad category={'all'} limit={6}/>
  </>
  )

}

export default Admin;
