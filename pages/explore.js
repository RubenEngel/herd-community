import React from 'react'
import Layout from '../components/layout';
import PostList from '../components/post-list';
import { useReactiveVar } from '@apollo/client';
import { categoryVar } from '../lib/reactiveVars';

export default function Explore() {

const selectedCategory = useReactiveVar(categoryVar)

    return (
        <Layout category={selectedCategory}>
            <PostList first={6} after={""} category={selectedCategory}/>
        </Layout>
    )
}

