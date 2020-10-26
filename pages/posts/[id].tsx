import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';


export default function Post({ postData }: { postData: {title: string, date: string, contentHtml: string}}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <br />
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        {/* {postData.date} を以下で置き換える */}
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

// export async function getStaticProps({ params }) {
//   const postData = await getPostData(params.id)
//   return {
//     props: {
//       postData
//     }
//   }
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  }
}