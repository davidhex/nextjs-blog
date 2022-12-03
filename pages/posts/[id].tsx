import Head from 'next/head';
import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

export default function Post({postData}: { postData: any }) {
    return (<Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>

        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
        </article>
    </Layout>);
}


// {
//     "paths": [
//     {
//         "params": {
//             "id": "ssg-ssr"
//         }
//     },
//     {
//         "params": {
//             "id": "pre-rendering"
//         }
//     }
// ],
//
//
//     "fallback": "false"
// }
export async function getStaticPaths() {
    // Return a list of possible value for id
    let paths = getAllPostIds();
    return {
        paths, fallback: false
    }
}

export async function getStaticProps({params}: { params: any }) {
    // Fetch necessary data for the blog post using params.id
    let postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}
