import React from 'react'
import {useState} from 'react'
import Layout from '../components/layout';
import PostList from '../components/post-list';
import Header from '../components/header';
import Container from '../components/container';

export default function Explore() {

    const [category, setCategory] = useState('All')

    return (
        <Layout category={category}>
            <PostList first={6} after={""} category={'All' ? "" : category}/>
        </Layout>
    )
}

